export default function PromptFullView({ content }: { content: string }) {
  const parts = content.split(/({{[^}]+}})/g);
  return (
    <div className="min-h-full p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="bg-[#FFFEF7] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#F7F6EE] border-b border-black/[0.07]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[12px] text-[#8E8E93] ml-2 font-medium tracking-wide select-none">
            Prompt Template
          </span>
        </div>
        <div className="p-6 sm:p-8 font-mono text-[14px] text-[#1C1C1E] leading-relaxed whitespace-pre-wrap">
          {parts.map((part, i) =>
            part.startsWith("{{") ? (
              <span
                key={i}
                className="inline-block bg-[#007AFF]/10 text-[#007AFF] rounded-[5px] px-1.5 py-0.5 font-semibold text-[13px]"
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
