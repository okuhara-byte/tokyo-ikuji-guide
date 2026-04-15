'use client';

import { useState, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import IntroSection from '@/components/IntroSection';
import SearchResults from '@/components/SearchResults';
import {
  NATIONAL,
  METRO,
  FERTILITY,
  PREGNANCY,
  BIRTH,
  WARD,
} from '@/data';
import {
  Benefit,
  StageValue,
  WardKey,
  WARD_NAMES,
  AGE_TO_MONTHS,
} from '@/data/types';

interface SearchState {
  title: string;
  subtitle: string;
  items: Benefit[];
  summary: { label: string; dotColor: string; count: number }[];
}

export default function HomePage() {
  const [stage, setStage] = useState<StageValue>('all');
  const [ward, setWard] = useState('');
  const [age, setAge] = useState('');
  const [results, setResults] = useState<SearchState | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const filterByAge = useCallback(
    (items: Benefit[], ageMonths: number | null) => {
      if (ageMonths === null) return items;
      return items.filter((b) => {
        if (!b.age) return true;
        const [mn, mx] = b.age;
        return ageMonths >= mn && ageMonths <= mx;
      });
    },
    []
  );

  const doSearch = useCallback(
    (s: StageValue, w: string, a: string) => {
      if (s === 'ikuji' && !w) {
        alert('育児期の検索にはお住まいの区を選択してください。');
        return;
      }

      const ageMonths =
        a === '' || s !== 'ikuji' ? null : AGE_TO_MONTHS[a] ?? null;

      let result: SearchState;

      if (s === 'funin') {
        const items = [...FERTILITY];
        result = {
          title: '不妊治療・妊活',
          subtitle: 'の支援制度',
          items,
          summary: [
            { label: '国の制度', dotColor: '#A85700', count: items.filter((b) => b.tier === 'national').length },
            { label: '東京都の制度', dotColor: '#007A34', count: items.filter((b) => b.tier === 'metro').length },
          ],
        };
      } else if (s === 'ninshin') {
        const items = [...PREGNANCY];
        result = {
          title: '妊娠中',
          subtitle: 'に受けられる支援制度',
          items,
          summary: [
            { label: '国の制度', dotColor: '#A85700', count: items.filter((b) => b.tier === 'national').length },
            { label: '東京都の制度', dotColor: '#007A34', count: items.filter((b) => b.tier === 'metro').length },
          ],
        };
      } else if (s === 'shussan') {
        const items = [...BIRTH];
        result = {
          title: '出産・産後',
          subtitle: 'に受けられる支援制度',
          items,
          summary: [
            { label: '国の制度', dotColor: '#A85700', count: items.filter((b) => b.tier === 'national').length },
            { label: '東京都の制度', dotColor: '#007A34', count: items.filter((b) => b.tier === 'metro').length },
          ],
        };
      } else if (s === 'ikuji') {
        const wd = filterByAge(WARD[w as WardKey] || [], ageMonths);
        const metroF = filterByAge(METRO, ageMonths);
        const natF = filterByAge(NATIONAL, ageMonths);
        const items = [...wd, ...metroF, ...natF];
        const wardName = WARD_NAMES[w as WardKey] || w;
        result = {
          title: wardName,
          subtitle: 'の育児支援制度',
          items,
          summary: [
            { label: '区の制度', dotColor: '#0017C1', count: wd.length },
            { label: '東京都の制度', dotColor: '#007A34', count: metroF.length },
            { label: '国の制度', dotColor: '#A85700', count: natF.length },
          ],
        };
      } else {
        // all
        const wd = w ? (WARD[w as WardKey] || []) : [];
        const items = [
          ...FERTILITY,
          ...PREGNANCY,
          ...BIRTH,
          ...wd,
          ...METRO,
          ...NATIONAL,
        ];
        const wardPart = w ? (WARD_NAMES[w as WardKey] || w) + 'の' : '';
        result = {
          title: '妊活〜育児',
          subtitle: wardPart + 'すべての支援制度',
          items,
          summary: [
            { label: '不妊治療・妊活', dotColor: '#B5006B', count: FERTILITY.length },
            { label: '妊娠〜出産', dotColor: '#4A1DB5', count: PREGNANCY.length + BIRTH.length },
            { label: '育児期（都・国）', dotColor: '#007A34', count: METRO.length + NATIONAL.length },
            ...(w
              ? [{ label: (WARD_NAMES[w as WardKey] || w) + 'の制度', dotColor: '#0017C1', count: wd.length }]
              : []),
          ],
        };
      }

      setResults(result);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    },
    [filterByAge]
  );

  const handleSearch = () => doSearch(stage, ward, age);

  const handleQuickSearch = (s: StageValue, w?: string) => {
    setStage(s);
    if (w) setWard(w);
    else setWard('');
    setAge('');
    doSearch(s, w || '', '');
  };

  return (
    <>
      <Header />

      {/* Notice bar */}
      <div className="bg-notice-bg border-b border-notice-border" role="alert">
        <div className="max-w-[1080px] mx-auto px-6 py-2.5 text-sm flex items-center gap-2.5">
          <span className="bg-notice-border text-white text-[11px] font-bold px-[7px] py-0.5 rounded-sm tracking-wider whitespace-nowrap">
            お知らせ
          </span>
          2025年4月より不妊治療助成・ベビーシッター補助の一部条件が改定されました。最新情報を更新済みです。
        </div>
      </div>

      {/* Page header */}
      <div className="border-b border-border py-10 px-6 bg-white">
        <div className="max-w-[1080px] mx-auto">
          <h1 className="text-[26px] font-bold leading-snug mb-2.5 tracking-tight">
            妊活・出産・育児の補助金・助成金を調べる
          </h1>
          <p className="text-[15px] text-sub max-w-[600px] leading-relaxed">
            ライフステージとお住まいの区を選ぶと、不妊治療から育児まで受けられる支援制度を一括で確認できます。区・東京都・国の制度を中立的な立場で掲載しています。
          </p>
        </div>
      </div>

      {/* Search form */}
      <SearchForm
        stage={stage}
        ward={ward}
        age={age}
        onStageChange={setStage}
        onWardChange={setWard}
        onAgeChange={setAge}
        onSearch={handleSearch}
        onQuickSearch={handleQuickSearch}
      />

      {/* Main content */}
      <main className="max-w-[1080px] mx-auto px-6 py-9 pb-20">
        {!results && <IntroSection />}
        {results && (
          <div ref={resultRef}>
            <SearchResults
              title={results.title}
              subtitle={results.subtitle}
              items={results.items}
              summary={results.summary}
            />
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="border-t border-border bg-bg2 py-6 px-6 text-center">
        <p className="text-xs text-mute max-w-[600px] mx-auto leading-relaxed">
          本サービスは行政機関ではありません。掲載情報は2025年4月時点の公開情報に基づいています。
          正確な条件・金額は各区・都・国の公式ウェブサイトでご確認ください。
        </p>
      </footer>
    </>
  );
}
