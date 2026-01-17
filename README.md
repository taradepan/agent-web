# Generative UI Chat

An AI-powered chat interface that generates and renders live React components inline. Ask the AI to create UI elements, and watch them render in real-time within the conversation.

## Features

- 🎨 **Live Component Generation** - AI generates React components that render immediately
- ⚡ **Interactive Components** - Full support for state, effects, timers, and animations
- 🎭 **Creative Designs** - AI uses modern Tailwind CSS with gradients, shadows, and animations
- 🔒 **Sandboxed Execution** - Components run in isolated scope using react-runner
- 💬 **Chat Interface** - Clean, modern chat UI to interact with the AI

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **AI**: OpenAI 
- **Component Renderer**: react-runner
- **Runtime**: Bun

## Getting Started

### Prerequisites

- Bun installed
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file with your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Usage

Simply ask the AI to create UI components:

- "Create an animated button"
- "Make a counter with gradient styling"
- "Build a toast notification component"
- "Design a loading spinner"

The AI will generate React code wrapped in `<draw>` tags, which gets executed and rendered inline in the chat.

## Project Structure

```
app/
├── page.tsx              # Main chat page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── api/chat/route.ts     # OpenAI API endpoint

components/
├── Chat.tsx              # Chat container with state
├── ChatInput.tsx         # Message input form
├── MessageList.tsx       # Renders message list
├── Message.tsx           # Single message with parser
└── ComponentPreview.tsx  # react-runner wrapper

lib/
└── parser.ts             # Parses <draw> blocks from AI response
```

## How It Works

1. User sends a message requesting a UI component
2. OpenAI generates React code wrapped in `<draw>` tags
3. Parser extracts the code from the response
4. react-runner executes the code in a sandboxed environment
5. Component renders live in the chat interface

## Available Scope

Components have access to:

- React hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`
- Timers: `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`
- Console: `console.log` for debugging
- Tailwind CSS for styling

## Development

Build for production:

```bash
bun run build
```

Start production server:

```bash
bun start
```

## License

MIT
