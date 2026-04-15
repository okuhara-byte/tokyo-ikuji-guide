'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import JourneyPhaseCard from '@/components/JourneyPhaseCard';
import { FERTILITY, PREGNANCY, BIRTH } from '@/data';
import { Benefit } from '@/data/types';

type Phase = 'fertility' | 'pregnancy' | 'birth';

const PHASES: { key: Phase; label: string }[] = [
  { key: 'fertility', label: '不妊治療・妊活' },
  { key: 'pregnancy', label: '妊娠中' },
  { key: 'birth', label: '出産・産後' },
];

const PHASE_DATA: Record<Phase, { data: Benefit[]; title: string; sub: string; dotColor: string }> = {
  fertility: {
    data: FERTILITY,
    title: '不妊治療・妊活',
    sub: '特定不妊治療（体外受精・顕微授精など）への助成',
    dotColor: '#B5006B',
  },
  pregnancy: {
    data: PREGNANCY,
    title: '妊娠中の支援',
    sub: '妊娠届出〜出産直前まで受けられる給付・サービス',
    dotColor: '#4A1DB5',
  },
  birth: {
    data: BIRTH,
    title: '出産・産後の支援',
    sub: '出産時の一時金から産後ケアまで時系列で確認',
    dotColor: '#0017C1',
  },
};

const TIMELINE = [
  { label: '出産前', title: '出産育児一時金の事前申請', sub: '直接支払制度を利用する場合は出産前に産院で手続き', dot: 'bg-pink' },
  { label: '出産当日', title: '出生届の提出（14日以内）', sub: '区役所に提出後、児童手当・医療証の申請が可能に', dot: 'bg-pink' },
  { label: '産後すぐ', title: '産後ケア・ヘルパー派遣の申請', sub: '区の子育て支援課に早めに相談。産後4〜8週以内が多い', dot: 'bg-purple' },
  { label: '産後1か月以内', title: '児童手当・こども医療費助成の申請', sub: '区役所の窓口。出生届と同日に手続きできる場合も', dot: 'bg-blue' },
  { label: '産後3〜4か月', title: '乳児健診・育児給付金の申請', sub: '一部の区では乳児健診時に給付金5万円を支給', dot: 'bg-blue' },
  { label: '産後6か月〜', title: '保育所入所申請（翌年4月入所の場合）', sub: '多くの区で10〜11月に翌年4月入所の申込受付', dot: 'bg-blue' },
];

export default function JourneyPage() {
  const [phase, setPhase] = useState<Phase>('fertility');
  const current = PHASE_DATA[phase];

  return (
    <>
      <Header />
      <div className="border-b border-border py-10 px-6 bg-white">
        <div className="max-w-[1080px] mx-auto">
          <h1 className="text-[26px] font-bold leading-snug mb-2.5 tracking-tight">
            妊活・出産 支援ガイド
          </h1>
          <p className="text-[15px] text-sub max-w-[600px] leading-relaxed">
            不妊治療から妊娠・出産・産後まで、ライフステージごとに受けられる補助金・助成金を時系列でまとめました。
          </p>
        </div>
      </div>

      {/* Phase nav */}
      <div className="bg-bg2 border-b border-border px-6">
        <div className="max-w-[1080px] mx-auto flex overflow-x-auto">
          {PHASES.map((p, i) => (
            <div key={p.key} className="flex items-center shrink-0">
              {i > 0 && <span className="text-mute text-xs px-1 select-none">›</span>}
              <button
                onClick={() => setPhase(p.key)}
                className={`py-3.5 px-5 text-[13px] font-medium bg-transparent border-none border-b-[3px] cursor-pointer whitespace-nowrap transition-colors ${
                  phase === p.key
                    ? 'text-blue border-b-blue font-bold'
                    : 'text-sub border-b-transparent hover:text-text'
                }`}
              >
                {p.label}
              </button>
            </div>
          ))}
          <div className="flex items-center shrink-0">
            <span className="text-mute text-xs px-1 select-none">›</span>
            <Link
              href="/"
              className="py-3.5 px-5 text-[13px] font-medium text-sub no-underline border-b-[3px] border-b-transparent hover:text-text transition-colors whitespace-nowrap"
            >
              育児期（区別補助）
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-[1080px] mx-auto px-6 py-9 pb-20">
        {/* Total summary */}
        <div className="bg-blue text-white rounded px-6 py-5 mb-7 flex items-center gap-6 flex-wrap">
          <div>
            <div className="text-[13px] opacity-80">出産までに受け取れる可能性がある給付総額（目安）</div>
            <div className="text-[28px] font-bold">最大 約150万円〜</div>
          </div>
          <div className="text-xs opacity-65 ml-auto">
            ※世帯収入・治療内容・在住区により異なります。参考値です。
          </div>
        </div>

        {/* Phase header */}
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b-2 border-border">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ background: current.dotColor }} />
          <h2 className="text-lg font-bold">{current.title}</h2>
          <p className="text-[13px] text-sub ml-auto">{current.sub}</p>
        </div>

        {/* Timeline (birth phase only) */}
        {phase === 'birth' && (
          <div className="bg-bg2 border border-border rounded px-6 py-5 mb-6">
            <div className="text-sm font-bold mb-4 pb-2.5 border-b border-border">
              出産前後の申請タイムライン
            </div>
            <div className="relative pl-6 my-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
              {TIMELINE.map((t) => (
                <div key={t.label} className="relative mb-5 last:mb-0">
                  <div
                    className={`absolute -left-5 top-1 w-3 h-3 rounded-full ${t.dot} border-2 border-white shadow-[0_0_0_2px_currentColor]`}
                    style={{ color: t.dot === 'bg-pink' ? '#B5006B' : t.dot === 'bg-purple' ? '#4A1DB5' : '#0017C1' }}
                  />
                  <div className="text-[11px] font-bold text-mute mb-0.5 tracking-wider">{t.label}</div>
                  <div className="text-sm font-bold text-text mb-0.5">{t.title}</div>
                  <div className="text-xs text-sub">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
          {current.data.map((b, i) => (
            <JourneyPhaseCard key={b.id} benefit={b} index={i} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border bg-bg2 py-6 px-6 text-center">
        <p className="text-xs text-mute max-w-[600px] mx-auto leading-relaxed">
          本サービスは行政機関ではありません。掲載情報は2025年4月時点の公開情報に基づいています。
          正確な条件・金額は各区・都・国の公式ウェブサイトでご確認ください。
        </p>
      </footer>
    </>
  );
}
