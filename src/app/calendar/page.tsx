'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import WardSelect from '@/components/WardSelect';
import { NATIONAL, METRO, WARD } from '@/data';
import { Benefit, WardKey, WARD_NAMES, TIER_LABELS } from '@/data/types';

const TIER_SHORT: Record<string, string> = { ward: '区', metro: '都', national: '国' };
const FISCAL_MONTHS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

export default function CalendarPage() {
  const [wardKey, setWardKey] = useState('');

  const now = new Date();
  const curMonth = now.getMonth() + 1;

  let allItems: Benefit[] = [];
  let wardName = '';
  if (wardKey) {
    const wd = WARD[wardKey as WardKey] || [];
    allItems = [...wd, ...METRO, ...NATIONAL];
    wardName = WARD_NAMES[wardKey as WardKey] || wardKey;
  }

  // Split by month / rolling
  const byMonth: Record<number, Benefit[]> = {};
  for (let m = 1; m <= 12; m++) byMonth[m] = [];
  const rolling: Benefit[] = [];

  for (const b of allItems) {
    if (!b.deadline || !b.deadline.month) {
      rolling.push(b);
    } else {
      byMonth[b.deadline.month].push(b);
    }
  }

  return (
    <>
      <Header />
      <div className="border-b border-border py-10 px-6 bg-white">
        <div className="max-w-[1080px] mx-auto">
          <h1 className="text-[26px] font-bold leading-snug mb-2.5 tracking-tight">
            申請締切カレンダー
          </h1>
          <p className="text-[15px] text-sub max-w-[600px] leading-relaxed">
            区を選択すると、その区で利用できる主な補助金・助成金の申請締切時期を月別に確認できます。申請の見落とし防止にご活用ください。
          </p>
        </div>
      </div>

      <section className="bg-bg2 border-b border-border py-7 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-sm font-bold mb-3 flex items-center gap-1.5">
            <span className="inline-block w-[3px] h-3.5 bg-blue rounded-sm" />
            区を選択してカレンダーを表示
          </div>
          <WardSelect
            id="cal-ward"
            value={wardKey}
            onChange={setWardKey}
            label="区を選択"
          />
        </div>
      </section>

      <main className="max-w-[1080px] mx-auto px-6 py-9 pb-20">
        {!wardKey ? (
          <div className="bg-bg2 border border-border rounded px-5 py-4 text-sm text-sub leading-relaxed">
            <strong className="text-text block mb-1">使い方</strong>
            上の選択ボックスで区を選ぶと、その区の補助金申請締切時期を月別に表示します。「毎年更新型」の制度は年度ごとに同じ時期に申請が必要です。締切のない「随時申請型」の制度も一覧で確認できます。
          </div>
        ) : (
          <>
            {/* Legend */}
            <div className="mb-5 flex gap-4 flex-wrap text-[13px] items-center">
              <span>
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-sm bg-warn-bg text-warn-border mr-1">今月〜1か月以内</span>
                要注意
              </span>
              <span>
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-sm bg-notice-bg text-[#8A5700] mr-1">2〜3か月以内</span>
                準備を
              </span>
              <span>
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-sm bg-bg2 text-mute border border-border mr-1">随時申請可</span>
                いつでも申請可
              </span>
            </div>

            <h3 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border">
              {wardName}の申請締切カレンダー（2025年度）
            </h3>

            {/* Month grid */}
            <div className="grid grid-cols-4 gap-3 mb-8 max-md:grid-cols-2">
              {FISCAL_MONTHS.map((m) => {
                const items = byMonth[m] || [];
                const isCurrent = m === curMonth;
                const isPast =
                  (m >= 4 && curMonth >= 4 && m < curMonth) ||
                  (m < 4 && curMonth < 4 && m < curMonth);

                return (
                  <div key={m} className="border border-border rounded overflow-hidden bg-white">
                    <div
                      className={`px-3.5 py-2.5 text-sm font-bold relative ${
                        isCurrent
                          ? 'bg-blue text-white'
                          : isPast
                            ? 'bg-bg3 text-mute'
                            : 'bg-blue text-white'
                      }`}
                    >
                      {m}月
                      {isCurrent && (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-white/25 px-1.5 py-px rounded-full">
                          今月
                        </span>
                      )}
                    </div>
                    <div className="py-2">
                      {items.length === 0 ? (
                        <div className="px-3.5 py-3 text-xs text-mute">
                          締切のある制度はありません
                        </div>
                      ) : (
                        items.map((b) => {
                          const dd = b.deadline?.day || '末日';
                          return (
                            <div
                              key={b.id}
                              className="px-3.5 py-[7px] border-b border-border-light last:border-b-0 text-xs flex gap-2 items-start"
                            >
                              <span
                                className={`font-bold whitespace-nowrap min-w-[36px] shrink-0 ${
                                  isCurrent ? 'text-warn-border' : 'text-blue'
                                }`}
                              >
                                {m}/{dd}
                              </span>
                              <div>
                                <div className="text-text leading-snug">{b.title}</div>
                                <div className="text-mute text-[11px] mt-0.5">
                                  {b.deadline?.note || ''}{' '}
                                  <span
                                    className={`text-[10px] font-bold px-[5px] py-px rounded-sm ${
                                      b.tier === 'ward'
                                        ? 'bg-tag-blue-bg text-tag-blue-text'
                                        : b.tier === 'metro'
                                          ? 'bg-tag-green-bg text-tag-green-text'
                                          : 'bg-tag-orange-bg text-tag-orange-text'
                                    }`}
                                  >
                                    {TIER_SHORT[b.tier]}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rolling items */}
            <h3 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border">
              随時申請できる制度（締切なし）
            </h3>
            <div className="border border-border rounded overflow-hidden">
              {rolling.map((b, i) => (
                <article
                  key={b.id}
                  className="bg-white border-b border-border-light p-[22px] grid grid-cols-[1fr_auto] gap-y-3.5 gap-x-5 transition-colors hover:bg-bg2 last:border-b-0 animate-fade-in-up"
                  style={{ animationDelay: `${(Math.min(i, 8) * 0.02).toFixed(2)}s` }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-[7px] mb-[7px] flex-wrap">
                      <span
                        className={`text-[11px] font-bold px-[7px] py-0.5 rounded-sm tracking-wider whitespace-nowrap ${
                          b.tier === 'ward'
                            ? 'bg-tag-blue-bg text-tag-blue-text'
                            : b.tier === 'metro'
                              ? 'bg-tag-green-bg text-tag-green-text'
                              : 'bg-tag-orange-bg text-tag-orange-text'
                        }`}
                      >
                        {TIER_LABELS[b.tier]}
                      </span>
                      <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-sm bg-bg2 text-mute border border-border">
                        随時申請可
                      </span>
                    </div>
                    <div className="text-[15px] font-bold mb-1">{b.title}</div>
                    <div className="text-xs text-mute">{b.period}</div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-2.5">
                    <div>
                      <div className="text-[20px] font-bold text-blue leading-tight">{b.amount}</div>
                      <div className="text-xs text-sub mt-0.5">{b.as}</div>
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
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border bg-bg2 py-6 px-6 text-center">
        <p className="text-xs text-mute max-w-[600px] mx-auto leading-relaxed">
          本サービスは行政機関ではありません。掲載情報は2025年4月時点の公開情報に基づいています。
        </p>
      </footer>
    </>
  );
}
