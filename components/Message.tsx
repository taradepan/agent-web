"use client";

import React from "react";
import { parseResponse, ContentBlock } from "@/lib/parser";
import { ComponentPreview } from "./ComponentPreview";

interface MessageProps {
  content: string;
  role: "user" | "assistant";
}

export function Message({ content, role }: MessageProps) {
  const blocks = parseResponse(content);

  return (
    <div
      className={`mb-8 animate-slideUp ${role === "user" ? "ml-12" : "mr-12"}`}
    >
      {/* Label */}
      <div className="mb-2">
        <span
          className={`text-[11px] font-bold tracking-wider uppercase ${
            role === "user" ? "text-neutral-500" : "text-neutral-900"
          }`}
        >
          {role === "user" ? "You" : "Assistant"}
        </span>
      </div>

      {/* Message content */}
      <div
        className={`${
          role === "user"
            ? "bg-neutral-100 border-l-2 border-neutral-300 px-5 py-4"
            : "px-0 py-1"
        }`}
      >
        {blocks.map((block, index) => (
          <div key={index}>
            {block.type === "text" ? (
              <p className="whitespace-pre-wrap leading-[1.6] text-[15px] text-neutral-900">
                {block.content}
              </p>
            ) : (
              <div className={role === "user" ? "mt-3" : "mt-4"}>
                <ComponentPreview code={block.code} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
