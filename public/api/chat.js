// API handler for chat functionality with Cerebras AI
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await request.json();
    
    const response = await fetch(
      `https://gffwlerzqpydiewtyytv.supabase.co/functions/v1/cerebras-chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZndsZXJ6cXB5ZGlld3R5eXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzAyMzgsImV4cCI6MjA3MDI0NjIzOH0.caku2gujd9KPNI7B1tPrgWLR9a_iEdyXnC7LUg8X_P0`,
        },
        body: JSON.stringify({ messages }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}