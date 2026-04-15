import { Benefit, CAT_LABELS, TIER_LABELS } from '@/data/types';

function getDeadlineBadge(b: Benefit) {
  if (!b.deadline || !b.deadline.month) {
    return (
      <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-ok-bg text-ok-border border border-ok-border/30 whitespace-nowrap">
        随時申請可
      </span>
    );
  }

  const now = new Date();
  const dm = b.deadline.month;
  const dd = b.deadline.day || 28;
  let dlDate = new Date(now.getFullYear(), dm - 1, dd);
  if (dlDate < now) dlDate.setFullYear(dlDate.getFullYear() + 1);
  const diffDays = Math.ceil((dlDate.getTime() - now.getTime()) / 86400000);

  if (diffDays <= 30) {
    return (
      <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-warn-bg text-warn-border border border-warn-border/30 font-bold whitespace-nowrap">
        申請締切まで{diffDays}日
      </span>
    );
  }
  if (diffDays <= 90) {
    return (
      <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-notice-bg text-notice-border border border-notice-border/30 whitespace-nowrap">
        申請締切 {dm}月{dd}日
      </span>
    );
  }
  return (
    <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-bg2 text-sub border border-border whitespace-nowrap">
      申請締切 {dm}月{dd}日
    </span>
  );
}

function tierBadgeClass(tier: string) {
  switch (tier) {
    case 'ward':
      return 'bg-tag-blue-bg text-tag-blue-text';
    case 'metro':
      return 'bg-tag-green-bg text-tag-green-text';
    case 'national':
      return 'bg-tag-orange-bg text-tag-orange-text';
    default:
      return 'bg-bg2 text-sub';
  }
}

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

export default function BenefitCard({ benefit: b, index }: BenefitCardProps) {
  const delay = (Math.min(index, 10) * 0.025).toFixed(2);

  return (
    <article
      className="bg-white border-b border-border-light p-[22px] grid grid-cols-[1fr_auto] gap-y-3.5 gap-x-5 transition-colors hover:bg-bg2 last:border-b-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-[7px] mb-[7px] flex-wrap">
          <span
            className={`text-[11px] font-bold px-[7px] py-0.5 rounded-sm tracking-wider whitespace-nowrap ${tierBadgeClass(b.tier)}`}
          >
            {TIER_LABELS[b.tier]}
          </span>
          {b.isNew && (
            <span className="text-[11px] font-bold px-[7px] py-0.5 rounded-sm bg-warn-bg text-warn-border tracking-wider">
              NEW
            </span>
          )}
          {b.cat.map((c) => (
            <span
              key={c}
              className="text-[11px] text-mute bg-bg2 border border-border px-[7px] py-0.5 rounded-sm"
            >
              {CAT_LABELS[c] || c}
            </span>
          ))}
          {getDeadlineBadge(b)}
        </div>

        {/* Title */}
        <div className="text-[15px] font-bold mb-1.5">{b.title}</div>

        {/* Description */}
        <div className="text-[13px] text-sub leading-relaxed mb-2.5">{b.desc}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {b.tags.map((t) => (
            <span
              key={t}
              className="text-[12px] text-mute bg-bg3 px-2 py-0.5 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Period */}
        <div className="text-[12px] text-mute">申請期間：{b.period}</div>
      </div>

      <div className="text-right shrink-0 flex flex-col items-end gap-2.5">
        <div>
          <div className="text-[20px] font-bold text-blue leading-tight">
            {b.amount}
          </div>
          <div className="text-[12px] text-sub mt-0.5">{b.as}</div>
        </div>
        <a
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-blue font-bold border border-blue rounded px-4 py-1.5 no-underline transition-colors hover:bg-blue hover:text-white"
        >
          詳細・申請
        </a>
      </div>
    </article>
  );
}
