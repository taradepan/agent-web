"use client";

import React, { useMemo } from "react";
import { useRunner } from "react-runner";

interface ComponentPreviewProps {
  code: string;
}

export function ComponentPreview({ code }: ComponentPreviewProps) {
  const scope = useMemo(
    () => ({
      React,
      useState: React.useState,
      useEffect: React.useEffect,
      useRef: React.useRef,
      useMemo: React.useMemo,
      useCallback: React.useCallback,
      console: console,
      setTimeout: setTimeout,
      setInterval: setInterval,
      clearTimeout: clearTimeout,
      clearInterval: clearInterval,
    }),
    [],
  );

  const { element, error } = useRunner({
    code,
    scope,
  });

  if (error) {
    return (
      <div className="p-5 bg-red-50 border-l-4 border-red-600">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-red-900 text-sm font-bold mb-1">
              Component Error
            </p>
            <p className="text-red-700 text-xs font-mono leading-relaxed">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 p-6 bg-white border-2 border-neutral-200 relative">
      <div className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase text-neutral-400">
        Preview
      </div>
      <div className="mt-6">{element}</div>
    </div>
  );
}
