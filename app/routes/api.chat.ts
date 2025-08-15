import { type ActionFunctionArgs } from '@remix-run/cloudflare';

export async function action(args: ActionFunctionArgs) {
  return chatAction(args);
}

async function chatAction({ context, request }: ActionFunctionArgs) {
  const { messages } = await request.json() as { messages: any[] };

  try {
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
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.log(error);

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
