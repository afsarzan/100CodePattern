interface CodeBlockProps {
  code: string;
  type: "bad" | "good";
}

export function CodeBlock({ code, type }: CodeBlockProps) {
  const borderColor = type === "bad" ? "border-warning/30" : "border-accent/30";
  const bgGradient = type === "bad" 
    ? "bg-gradient-to-br from-warning/5 to-transparent" 
    : "bg-gradient-to-br from-accent/5 to-transparent";

  return (
    <div className={`relative ${bgGradient} border ${borderColor} rounded-xl overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-8 bg-code-bg/50 backdrop-blur-sm flex items-center px-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
          <div className="w-3 h-3 rounded-full bg-warning/60"></div>
          <div className="w-3 h-3 rounded-full bg-success/60"></div>
        </div>
        <span className="ml-auto text-xs text-code-comment font-mono">
          {type === "bad" ? "❌ Avoid" : "✅ Prefer"}
        </span>
      </div>
      <pre className="bg-code-bg text-code-text p-4 pt-12 overflow-x-auto font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
