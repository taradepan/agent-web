export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "component"; code: string };

export function parseResponse(response: string): ContentBlock[] {

  const blocks: ContentBlock[] = [];
  const drawRegex = /<draw>([\s\S]*?)<\/draw>/g;
  let lastIndex = 0;
  let match;

  while ((match = drawRegex.exec(response)) !== null) {
    // Add text before the draw block
    if (match.index > lastIndex) {
      const textContent = response.slice(lastIndex, match.index).trim();
      if (textContent) {
        blocks.push({ type: "text", content: textContent });
      }
    }

    // Add the component code
    blocks.push({ type: "component", code: match[1].trim() });
    lastIndex = drawRegex.lastIndex;
  }

  // Add remaining text after the last draw block
  if (lastIndex < response.length) {
    const textContent = response.slice(lastIndex).trim();
    if (textContent) {
      blocks.push({ type: "text", content: textContent });
    }
  }

  return blocks;
}
