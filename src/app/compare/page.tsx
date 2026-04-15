'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import WardSelect from '@/components/WardSelect';
import { NATIONAL, METRO, WARD } from '@/data';
import { Benefit, WardKey, WARD_NAMES } from '@/data/types';

interface ComparePoints {
  bs: string; bsMax: string;
  sango: string; sangoAs: string;
  iryo: string;
  ninshou: string;
  byoji: string;
  ichiji: string;
  kazoku: string; kazokuTitle: string;
  total: number;
}

function getComparePoints(wardKey: string): ComparePoints {
  const items = WARD[wardKey as WardKey] || [];
  const all = [...items, ...METRO, ...NATIONAL];

  const bsItem = items.find((b) => b.cat.includes('hoiku') && b.title.includes('ベビーシッター'));
  const sangoItem = items.find((b) => b.cat.includes('sango'));
  const iryoItem = all.find((b) => b.cat.includes('iryo'));
  const kazokuItem = items.find((b) => b.cat.includes('kazoku'));
  const byojiItem = items.find((b) => b.title.includes('病児'));
  const ninshouItem = items.find((b) => b.title.includes('認可外'));
  const ichijiItem = items.find((b) =>
    b.title.includes('一時保育') || b.title.includes('一時預かり') || b.title.includes('ひろば')
  );

  return {
    bs: bsItem?.amount || '—',
    bsMax: bsItem?.as || '',
    sango: sangoItem?.amount || '—',
    sangoAs: sangoItem?.as || '',
    iryo: iryoItem?.amount || '—',
    ninshou: ninshouItem?.amount || '—',
    byoji: byojiItem?.amount || '非対応',
    ichiji: ichijiItem?.amount || '—',
    kazoku: kazokuItem?.amount || '—',
    kazokuTitle: kazokuItem?.title || '—',
    total: items.length,
  };
}

export default function ComparePage() {
  const [ward1, setWard1] = useState('');
  const [ward2, setWard2] = useState('');
  const [result, setResult] = useState<{
    n1: string; n2: string;
    p1: ComparePoints; p2: ComparePoints;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function compare() {
    if (!ward1 || !ward2) { alert('2つの区を選択してください。'); return; }
    if (ward1 === ward2) { alert('異なる区を選択してください。'); return; }
    setResult({
      n1: WARD_NAMES[ward1 as WardKey],
      n2: WARD_NAMES[ward2 as WardKey],
      p1: getComparePoints(ward1),
      p2: getComparePoints(ward2),
    });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function reset() {
    setWard1(''); setWard2(''); setResult(null);
  }

  const rows = result
    ? [
        ['ベビーシッター補助', result.p1.bs, result.p1.bsMax, result.p2.bs, result.p2.bsMax],
        ['産後ケア・ヘルパー', result.p1.sango, result.p1.sangoAs, result.p2.sango, result.p2.sangoAs],
        ['子ども医療費助成', result.p1.iryo, '', result.p2.iryo, ''],
        ['認可外保育補助', result.p1.ninshou, '', result.p2.ninshou, ''],
        ['病児保育', result.p1.byoji, '', result.p2.byoji, ''],
        ['一時保育', result.p1.ichiji, '', result.p2.ichiji, ''],
        ['出産・給付金', result.p1.kazoku, result.p1.kazokuTitle, result.p2.kazoku, result.p2.kazokuTitle],
        ['区独自の制度数', `${result.p1.total}件`, '', `${result.p2.total}件`, ''],
      ]
    : [];

  return (
    <>
      <Header />
      <div className="border-b border-border py-10 px-6 bg-white">
        <div className="max-w-[1080px] mx-auto">
          <h1 className="text-[26px] font-bold leading-snug mb-2.5 tracking-tight">
            区を比較する
          </h1>
          <p className="text-[15px] text-sub max-w-[600px] leading-relaxed">
            2つの区を選んで育児支援制度を横並びで比較できます。引越しや区選びの参考にご活用ください。
          </p>
        </div>
      </div>

      <main className="max-w-[1080px] mx-auto px-6 py-9 pb-20">
        {/* Select area */}
        <div className="bg-bg2 border border-border rounded p-5 mb-6">
          <div className="flex gap-3 items-end flex-wrap">
            <WardSelect id="cmp-w1" value={ward1} onChange={setWard1} label="比較する区（1）" placeholder="── 区を選択 ──" />
            <span className="text-lg text-mute self-center pt-[18px]">vs</span>
            <WardSelect id="cmp-w2" value={ward2} onChange={setWard2} label="比較する区（2）" placeholder="── 区を選択 ──" />
            <button
              onClick={compare}
              className="bg-blue text-white border-none rounded px-6 py-2.5 text-sm font-bold cursor-pointer transition-colors hover:bg-blue-hover"
            >
              比較する
            </button>
            <button
              onClick={reset}
              className="bg-transparent border border-border rounded px-4 py-2.5 text-[13px] text-sub cursor-pointer transition-all hover:border-[#aaa] hover:text-text"
            >
              リセット
            </button>
          </div>
        </div>

        {result && (
          <div ref={resultRef}>
            <h3 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border">
              {result.n1} vs {result.n2} 比較
            </h3>

            {/* Compare table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="bg-bg2 px-4 py-3 text-left font-bold border border-border whitespace-nowrap">
                      比較項目
                    </th>
                    <th className="bg-blue text-white px-4 py-3 text-center font-bold border border-border whitespace-nowrap">
                      {result.n1}
                    </th>
                    <th className="bg-blue text-white px-4 py-3 text-center font-bold border border-border whitespace-nowrap">
                      {result.n2}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, v1, s1, v2, s2], i) => (
                    <tr key={label} className={i % 2 === 1 ? '[&>td]:bg-bg2' : ''}>
                      <td className="px-4 py-[11px] border border-border-light font-medium leading-relaxed">
                        {label}
                      </td>
                      <td className="px-4 py-[11px] border border-border-light text-center align-top">
                        <div className="text-[13px] text-text">{v1}</div>
                        {s1 && <div className="text-[11px] text-mute">{s1}</div>}
                      </td>
                      <td className="px-4 py-[11px] border border-border-light text-center align-top">
                        <div className="text-[13px] text-text">{v2}</div>
                        {s2 && <div className="text-[11px] text-mute">{s2}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ward detail lists */}
            <h3 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border">
              各区の制度一覧
            </h3>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {[
                { key: ward1, name: result.n1 },
                { key: ward2, name: result.n2 },
              ].map(({ key, name }) => {
                const items = WARD[key as WardKey] || [];
                return (
                  <div key={key} className="border border-border rounded overflow-hidden">
                    <div className="bg-blue text-white px-4 py-3 text-[15px] font-bold">
                      {name}
                    </div>
                    <div className="flex flex-col">
                      {items.map((b) => (
                        <div key={b.id} className="px-4 py-3.5 border-b border-border-light last:border-b-0">
                          <div className="text-[13px] font-bold text-text mb-1">{b.title}</div>
                          <div className="text-lg font-bold text-blue mb-0.5">{b.amount}</div>
                          <div className="text-xs text-mute">
                            {b.as} /{' '}
                            <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-blue no-underline hover:underline">
                              公式サイト →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
