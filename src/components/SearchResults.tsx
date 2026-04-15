'use client';

import { useState } from 'react';
import { Benefit, Tier, CategoryKey, CAT_LABELS } from '@/data/types';
import BenefitCard from './BenefitCard';

interface SummaryItem {
  label: string;
  dotColor: string;
  count: number;
}

interface SearchResultsProps {
  title: string;
  subtitle: string;
  items: Benefit[];
  summary: SummaryItem[];
}

const CATEGORY_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'funin', label: '不妊治療' },
  { value: 'ninshin', label: '妊娠中' },
  { value: 'shussan', label: '出産・産後' },
  { value: 'hoiku', label: '保育・預かり' },
  { value: 'kazoku', label: '家族・給付' },
  { value: 'sango', label: '産後支援' },
  { value: 'iryo', label: '医療・保健' },
  { value: 'kyoiku', label: '教育' },
];

export default function SearchResults({
  title,
  subtitle,
  items,
  summary,
}: SearchResultsProps) {
  const [tierFilter, setTierFilter] = useState<'all' | Tier>('all');
  const [catFilter, setCatFilter] = useState<'all' | CategoryKey>('all');

  let filtered = items;
  if (tierFilter !== 'all') {
    filtered = filtered.filter((b) => b.tier === tierFilter);
  }
  if (catFilter !== 'all') {
    filtered = filtered.filter((b) => b.cat.includes(catFilter));
  }

  const totalCount = filtered.length;

  return (
    <div>
      {/* Heading */}
      <div className="border-b-2 border-text pb-3.5 mb-5 flex items-baseline gap-3.5 flex-wrap">
        <h2 className="text-xl font-bold">
          <em className="not-italic text-blue">{title}</em>
          <span className="text-[15px] font-normal text-sub ml-2">{subtitle}</span>
        </h2>
        <span className="text-[13px] text-sub" aria-live="polite">
          {totalCount}件の制度が見つかりました
        </span>
        <span className="ml-auto text-xs text-mute">2025年4月現在</span>
      </div>

      {/* Summary boxes */}
      <div className="grid gap-px bg-border border border-border rounded overflow-hidden mb-[18px]"
        style={{ gridTemplateColumns: `repeat(${summary.length + 1}, 1fr)` }}
      >
        {summary.map((s) => (
          <div key={s.label} className="bg-white px-[18px] py-4">
            <div className="text-xs text-mute mb-1.5 flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: s.dotColor }}
              />
              {s.label}
            </div>
            <div className="text-[22px] font-bold">
              {s.count}
              <span className="text-xs font-normal text-sub ml-0.5">件</span>
            </div>
          </div>
        ))}
        <div className="bg-white px-[18px] py-4">
          <div className="text-xs text-mute mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-text" />
            合計
          </div>
          <div className="text-[22px] font-bold">
            {items.length}
            <span className="text-xs font-normal text-sub ml-0.5">件</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border border-warn-border border-l-4 rounded bg-warn-bg px-4 py-3 text-[13px] text-[#660000] mb-5 leading-relaxed">
        <strong className="block mb-0.5 text-sm">ご確認ください</strong>
        掲載情報は参考目的です。補助金の条件・金額は年度・世帯状況により異なります。申請前に必ず各区・都・国の公式ウェブサイトまたは窓口でご確認ください。本サービスは行政機関ではありません。
      </div>

      {/* Tier tabs */}
      <div className="flex border-b-2 border-border mb-[18px]" role="tablist">
        {(
          [
            { value: 'all', label: 'すべて' },
            { value: 'ward', label: '区の制度', dotClass: 'bg-blue' },
            { value: 'metro', label: '東京都', dotClass: 'bg-tag-green-text' },
            { value: 'national', label: '国の制度', dotClass: 'bg-tag-orange-text' },
          ] as const
        ).map((tab) => {
          const isActive = tierFilter === tab.value;
          const count = tab.value === 'all'
            ? items.length
            : items.filter((b) => b.tier === tab.value).length;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setTierFilter(tab.value)}
              className={`bg-transparent border-none border-b-[3px] mb-[-2px] px-4 py-2.5 text-sm font-medium cursor-pointer flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'text-text border-b-blue font-bold'
                  : 'text-sub border-b-transparent hover:text-text'
              }`}
            >
              {'dotClass' in tab && (
                <span className={`w-2 h-2 rounded-full ${tab.dotClass}`} />
              )}
              {tab.label}
              <span
                className={`text-[11px] px-1.5 py-px rounded-full border ${
                  isActive
                    ? 'bg-blue-light border-blue text-blue'
                    : 'bg-bg2 border-border text-sub'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category filter chips */}
      <div className="flex items-center gap-5 mb-5 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] text-sub font-medium whitespace-nowrap">
            カテゴリ：
          </span>
          {CATEGORY_FILTERS.map((cf) => {
            const isActive = catFilter === cf.value;
            return (
              <button
                key={cf.value}
                onClick={() => setCatFilter(cf.value as typeof catFilter)}
                className={`bg-transparent border rounded-full px-3 py-1 text-[13px] cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-light border-blue text-blue font-bold'
                    : 'border-border text-sub hover:border-[#aaa] hover:text-text'
                }`}
              >
                {cf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="border border-border rounded overflow-hidden" role="list">
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-6">
            <h3 className="text-base font-bold mb-2">該当する制度が見つかりません</h3>
            <p className="text-[13px] text-sub">
              絞り込み条件を変えてお試しください。
            </p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <BenefitCard key={b.id} benefit={b} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
