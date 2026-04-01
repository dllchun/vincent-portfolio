---
title: "Building Production Apps with the Claude API"
date: "2024-11-15"
excerpt: "A deep dive into integrating Anthropic's Claude API into production web applications — from prompt engineering to streaming responses and error handling."
tags: ["AI", "Claude", "API", "Next.js"]
readingTime: "7 min read"
---

## Why Claude?

After experimenting with most of the major large language models available today, I kept coming back to Claude for one simple reason: the outputs feel *thoughtful*. Where other models might generate technically correct but tonally flat responses, Claude tends to produce text that reads as if a careful human wrote it.

For production applications, this translates to less post-processing, fewer guardrails needed, and higher user trust.

## Setting Up the Client

Getting started is straightforward. Install the Anthropic SDK and initialize your client:

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})
```

For Next.js App Router, I typically create a route handler in `app/api/claude/route.ts`:

```typescript
import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const stream = client.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  return new Response(stream.toReadableStream())
}
```

## Streaming Responses

One of the biggest UX improvements you can make is streaming. Instead of waiting for the full response before displaying anything, stream tokens to the client as they're generated.

On the client side, I use a simple `ReadableStream` consumer:

```typescript
async function streamResponse(prompt: string) {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break
    const chunk = decoder.decode(value)
    // Update UI with chunk
    setOutput((prev) => prev + chunk)
  }
}
```

This creates a typewriter effect that users find much more engaging than a loading spinner.

## Prompt Engineering Patterns

### System Prompts

Always use system prompts to establish context and constraints. I structure mine like this:

```
You are a helpful assistant for [Product Name]. You:
- Answer only questions related to [domain]
- Always respond in [format]
- Never reveal information about [sensitive topics]
- Maintain a [tone] tone throughout
```

### Few-Shot Examples

For tasks that require a specific output format, include 2-3 examples in the system prompt. Claude learns the pattern quickly and produces consistent results.

### Chain of Thought

For complex reasoning tasks, asking Claude to "think step by step" before giving a final answer dramatically improves accuracy.

## Error Handling

Rate limits and API errors need graceful handling. I implement exponential backoff:

```typescript
async function claudeWithRetry(
  params: Anthropic.MessageCreateParams,
  maxRetries = 3
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await client.messages.create(params)
    } catch (error) {
      if (attempt === maxRetries - 1) throw error
      await new Promise((r) =>
        setTimeout(r, Math.pow(2, attempt) * 1000)
      )
    }
  }
}
```

## Cost Optimization

Claude's pricing is token-based, so optimizing token usage directly impacts your bottom line:

1. **Cache system prompts** — Anthropic offers prompt caching, which can reduce costs by up to 90% for repeated system prompts.
2. **Truncate conversation history** — Only include the last N turns of context rather than the full history.
3. **Use the right model** — Claude Haiku is dramatically cheaper for simple tasks that don't require Sonnet-level reasoning.

## Real-World Performance

In my AI Content Platform, I'm processing roughly 10,000 Claude API calls per day. Key metrics after optimizing:

- **Average latency**: 1.2s to first token (streaming)
- **Error rate**: < 0.1%
- **Cost per user**: ~$0.003 per interaction

These numbers are achievable with thoughtful architecture and prompt optimization.

## Conclusion

The Claude API is one of the most developer-friendly AI APIs available. With streaming, good prompt engineering, and proper error handling, you can build AI-powered features that feel magical to your users. The key is treating the AI as a collaborator in your architecture — not an afterthought.

If you have questions about any of these patterns, reach out — I'm always happy to talk shop.
