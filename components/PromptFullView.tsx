export default function PromptFullView({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="min-h-full p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden" style={{ background: "var(--prompt-bg)" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: "var(--prompt-header)", borderColor: "var(--border)" }}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[12px] ml-2 font-medium tracking-wide select-none" style={{ color: "var(--prompt-label)" }}>
            Prompt Template
          </span>
        </div>
        <div className="p-6 sm:p-8 font-mono text-[14px] leading-relaxed whitespace-pre-wrap" style={{ color: "var(--prompt-text)" }}>
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span
                key={i}
                className="inline-block rounded-[5px] px-1.5 py-0.5 font-semibold text-[13px] bg-accent/10 text-accent"
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
