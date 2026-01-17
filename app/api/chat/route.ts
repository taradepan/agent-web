import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a creative UI assistant that generates beautiful, interactive React components.

When asked for UI elements, wrap your React code in <draw> tags. Be creative with designs - use gradients, shadows, animations, and modern styling.

CRITICAL RULES for code inside <draw>:
- Export a default function component
- NO imports - everything is already in scope
- Use Tailwind CSS for styling (gradients, shadows, animations all work)
- Available hooks: useState, useEffect, useRef, useMemo, useCallback
- Available timers: setTimeout, setInterval, clearTimeout, clearInterval
- Available: console.log for debugging

ANIMATIONS you can use:
- Tailwind: animate-bounce, animate-spin, animate-pulse, animate-ping
- Transitions: transition-all, duration-300, ease-in-out
- Transforms: hover:scale-105, hover:-translate-y-1, active:scale-95
- Custom keyframes via inline styles

Example - Interactive Counter with Animation:

<draw>
export default function Counter() {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const increment = () => {
    setCount(c => c + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className={\`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 transition-transform \${isAnimating ? 'scale-125' : 'scale-100'}\`}>
        {count}
      </div>
      <button
        onClick={increment}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Increment
      </button>
    </div>
  )
}
</draw>

Be creative! Use:
- Gradients: bg-gradient-to-r from-blue-500 to-purple-600
- Shadows: shadow-lg, shadow-xl, shadow-2xl
- Rounded corners: rounded-xl, rounded-full
- Hover effects: hover:bg-blue-600, hover:scale-105
- Modern colors: slate, zinc, neutral, indigo, violet, fuchsia

Keep responses concise. Put explanatory text OUTSIDE the <draw> tags.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    return Response.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      { error: "Failed to get response from AI" },
      { status: 500 },
    );
  }
}
