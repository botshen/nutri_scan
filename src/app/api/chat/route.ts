import { NextResponse } from 'next/server';
import axios from 'axios';

interface ChatMessage {
  role: string;
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

export async function POST(request: Request) {
  const body = await request.json() as RequestBody;

  try {
    const response = await axios.post('https://api.gpt.ge/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: body.messages,
      max_tokens: 100,
      temperature: 0.5,
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error calling GPT API:', error);
    return NextResponse.json({ error: 'Failed to call GPT API' }, { status: 500 });
  }
}