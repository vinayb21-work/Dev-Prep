"use client";

import { useMemo } from "react";

interface DiagramViewProps {
  content: string;
}

interface ParsedBlock {
  type: "heading" | "code" | "list" | "paragraph";
  level?: number;
  language?: string;
  items?: string[];
  text: string;
}

function parseMarkdown(content: string): ParsedBlock[] {
  const lines = content.split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      i++;
      continue;
    }

    // Fenced code blocks
    const codeMatch = line.match(/^```(\w*)/);
    if (codeMatch) {
      const language = codeMatch[1] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "code",
        language,
        text: codeLines.join("\n"),
      });
      i++; // skip closing ```
      continue;
    }

    // Unordered list items (-, *, +)
    if (/^[\-\*\+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[\-\*\+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[\-\*\+]\s+/, ""));
        i++;
      }
      blocks.push({
        type: "list",
        items,
        text: "",
      });
      continue;
    }

    // Ordered list items
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({
        type: "list",
        items,
        text: "",
      });
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{1,6}\s+/) &&
      !lines[i].startsWith("```") &&
      !/^[\-\*\+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join("\n"),
      });
    }
  }

  return blocks;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match bold (**text**), inline code (`text`), and italic (*text* or _text_)
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|\*(.+?)\*|_(.+?)_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Inline code
      parts.push(
        <code
          key={match.index}
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] || match[5]) {
      // Italic
      parts.push(
        <em key={match.index}>{match[4] || match[5]}</em>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function DiagramView({ content }: DiagramViewProps) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}` as keyof Pick<
              JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
            >;
            const sizeClasses: Record<number, string> = {
              1: "text-3xl font-bold mt-6 mb-4",
              2: "text-2xl font-bold mt-6 mb-3",
              3: "text-xl font-semibold mt-5 mb-2",
              4: "text-lg font-semibold mt-4 mb-2",
              5: "text-base font-semibold mt-3 mb-1",
              6: "text-sm font-semibold mt-3 mb-1",
            };
            return (
              <Tag key={index} className={sizeClasses[block.level ?? 1]}>
                {renderInlineMarkdown(block.text)}
              </Tag>
            );
          }

          case "code":
            return (
              <div key={index} className="rounded-lg border bg-muted/50 overflow-x-auto">
                {block.language && block.language !== "text" && (
                  <div className="border-b bg-muted px-4 py-1.5 text-xs font-mono text-muted-foreground">
                    {block.language}
                  </div>
                )}
                <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
                  <code className="font-mono">{block.text}</code>
                </pre>
              </div>
            );

          case "list":
            return (
              <ul key={index} className="list-disc space-y-1 pl-6">
                {block.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                    {renderInlineMarkdown(item)}
                  </li>
                ))}
              </ul>
            );

          case "paragraph":
            return (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {renderInlineMarkdown(block.text)}
              </p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
