import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { StreamingTextResponse } from 'ai';

export async function action(args: ActionFunctionArgs) {
  return enhancerAction(args);
}

async function enhancerAction({ context, request }: ActionFunctionArgs) {
  const { message } = await request.json<{ message: string }>();

  try {
    const response = await fetch(
      `https://gffwlerzqpydiewtyytv.supabase.co/functions/v1/cerebras-chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZndsZXJ6cXB5ZGlld3R5eXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzAyMzgsImV4cCI6MjA3MDI0NjIzOH0.caku2gujd9KPNI7B1tPrgWLR9a_iEdyXnC7LUg8X_P0`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

IMPORTANT: Only respond with the improved prompt and nothing else!

<original_prompt>
  ${message}
</original_prompt>`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return new StreamingTextResponse(response.body!);
  } catch (error) {
    console.log(error);

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
