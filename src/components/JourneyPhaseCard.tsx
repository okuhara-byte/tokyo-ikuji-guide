import { Benefit, TIER_LABELS } from '@/data/types';

const BAR_COLORS: Record<string, string> = {
  'bar-fertility': 'bg-pink',
  'bar-pregnancy': 'bg-purple',
  'bar-birth': 'bg-blue',
  'bar-national': 'bg-tag-orange-text',
};

interface JourneyPhaseCardProps {
  benefit: Benefit;
  index: number;
}

export default function JourneyPhaseCard({ benefit: b, index }: JourneyPhaseCardProps) {
  const delay = (Math.min(index, 8) * 0.03).toFixed(2);
  const barClass = BAR_COLORS[b.bar || 'bar-national'] || 'bg-tag-orange-text';

  return (
    <div
      className="bg-white border border-border rounded overflow-hidden transition-colors hover:bg-bg2 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`h-1 ${barClass}`} />
      <div className="p-[18px]">
        {/* Meta */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className={`text-[11px] font-bold px-[7px] py-0.5 rounded-sm tracking-wider whitespace-nowrap ${
              b.tier === 'national'
                ? 'bg-tag-orange-bg text-tag-orange-text'
                : b.tier === 'metro'
                  ? 'bg-tag-green-bg text-tag-green-text'
                  : 'bg-tag-blue-bg text-tag-blue-text'
            }`}
          >
            {TIER_LABELS[b.tier]}
          </span>
          {b.isNew && (
            <span className="text-[11px] font-bold px-[7px] py-0.5 rounded-sm bg-warn-bg text-warn-border tracking-wider">
              NEW
            </span>
          )}
        </div>
        <div className="text-sm font-bold text-text mb-1.5 leading-snug">{b.title}</div>
        <div className="text-lg font-bold text-blue mb-1">{b.amount}</div>
        <div className="text-xs text-mute mb-2">{b.as}</div>
        <div className="text-[13px] text-sub leading-relaxed mb-2.5">{b.desc}</div>
        <div className="flex flex-wrap gap-[5px] mb-2.5">
          {b.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] text-sub bg-bg2 border border-border px-[7px] py-0.5 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-border-light px-[18px] py-3 flex items-center justify-between">
        <div className="text-[11px] text-mute">申請：{b.period}</div>
        <a
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-bold text-blue no-underline border border-blue rounded px-3 py-[5px] transition-colors hover:bg-blue-light hover:no-underline"
        >
          詳細・申請 →
        </a>
      </div>
    </div>
  );
}
