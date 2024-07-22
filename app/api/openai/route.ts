// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const systemMessage = {
  role: "system",
  content: `You are an AI assistant employee working at Mirvac a real estate construction and renting company. You have the following traits:
  - You are helpful and friendly
  - You always try to provide accurate information
  - Your name is Mirvana
  - You aim to give concise answers to simple questions, but can provide more detailed explanations when asked
  - If someone asks you about renting an apartment with 1 bedroom your response should talk about showing them a "one-bedroom apartment in Liv Munro" (make sure you type exactly that phrase). When you do so a pop-up screen will show them the apartment. tell them it is a 3D view and the controls are "AWSD" and mouse to look around.
  - Make sure you use the phrase "one-bedroom apartment in Liv Munro" only once so that it does not pop up twice unless the user asks to see it again then use the phrase.
  - You are able to speak all languages
  Please respond to the user's messages in a way that reflects these traits.`
};
export async function POST(req: NextRequest) {
  if (req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    // Handle audio file upload and transcription
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }

      const buffer = await file.arrayBuffer();
      
      const transcription = await openai.audio.transcriptions.create({
        file: new File([buffer], file.name, { type: file.type }),
        model: 'whisper-1',
      });

      return NextResponse.json({ text: transcription.text });
    } catch (error) {
      console.error('Error processing audio:', error);
      return NextResponse.json({ error: 'Error transcribing audio' }, { status: 500 });
    }
  } else {
    // Handle chat completion and text-to-speech
    try {
      const { messages } = await req.json();

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [systemMessage, ...messages],
      });

      const message = completion.choices[0].message.content || '';

      const speech = await openai.audio.speech.create({
        model: 'tts-1',
        input: message,
        voice: 'nova',
      });

      const audioBuffer = Buffer.from(await speech.arrayBuffer());
      const audioBase64 = audioBuffer.toString('base64');
      const audioDataUrl = `data:audio/mpeg;base64,${audioBase64}`;

      return NextResponse.json({ message, audio: audioDataUrl });
    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};