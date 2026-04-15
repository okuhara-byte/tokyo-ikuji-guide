'use client';

import { STAGE_OPTIONS, WARD_NAMES, WardKey, StageValue } from '@/data/types';

interface SearchFormProps {
  stage: StageValue;
  ward: string;
  age: string;
  onStageChange: (v: StageValue) => void;
  onWardChange: (v: string) => void;
  onAgeChange: (v: string) => void;
  onSearch: () => void;
  onQuickSearch: (stage: StageValue, ward?: string) => void;
}

const wardEntries = Object.entries(WARD_NAMES) as [WardKey, string][];

const AGE_OPTIONS = [
  { value: '', label: '全年齢' },
  { value: '0', label: '0歳（0〜11か月）' },
  { value: '1', label: '1歳' },
  { value: '2', label: '2歳' },
  { value: '3', label: '3歳' },
  { value: '45', label: '4〜5歳' },
  { value: '6', label: '小学生（6〜12歳）' },
];

export default function SearchForm({
  stage,
  ward,
  age,
  onStageChange,
  onWardChange,
  onAgeChange,
  onSearch,
  onQuickSearch,
}: SearchFormProps) {
  const showAge = stage === 'ikuji' || stage === 'all';

  return (
    <section className="bg-bg2 border-b border-border py-7 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-sm font-bold mb-3 flex items-center gap-1.5">
          <span className="inline-block w-[3px] h-3.5 bg-blue rounded-sm" />
          ライフステージと地域を選んで制度を調べる
        </div>

        <div className="flex gap-2.5 flex-wrap items-end mb-3.5">
          {/* ライフステージ */}
          <div className="flex flex-col gap-1">
            <label htmlFor="stage-sel" className="text-xs text-mute font-medium">
              ライフステージ
            </label>
            <select
              id="stage-sel"
              value={stage}
              onChange={(e) => onStageChange(e.target.value as StageValue)}
              className="appearance-none border border-border rounded px-3.5 py-2.5 pr-10 text-[15px] bg-white text-text cursor-pointer min-w-[210px] transition-all focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 hover:border-[#aaa] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23595959%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center]"
            >
              {STAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* お住まいの区 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ward" className="text-xs text-mute font-medium">
              お住まいの区
              <span className="text-[11px] text-mute ml-1">
                {stage === 'ikuji' ? '（必須）' : '（任意）'}
              </span>
            </label>
            <select
              id="ward"
              value={ward}
              onChange={(e) => onWardChange(e.target.value)}
              className="appearance-none border border-border rounded px-3.5 py-2.5 pr-10 text-[15px] bg-white text-text cursor-pointer min-w-[210px] transition-all focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 hover:border-[#aaa] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23595959%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center]"
            >
              <option value="">── 区を選択（任意）──</option>
              <optgroup label="東京23区">
                {wardEntries.map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* 年齢 */}
          {showAge && (
            <div className="flex flex-col gap-1">
              <label htmlFor="age-sel" className="text-xs text-mute font-medium">
                お子さんの年齢
              </label>
              <select
                id="age-sel"
                value={age}
                onChange={(e) => onAgeChange(e.target.value)}
                className="appearance-none border border-border rounded px-3.5 py-2.5 pr-10 text-[15px] bg-white text-text cursor-pointer min-w-[210px] transition-all focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 hover:border-[#aaa] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23595959%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center]"
              >
                {AGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={onSearch}
            className="bg-blue text-white border-none rounded px-7 py-[11px] text-[15px] font-bold cursor-pointer transition-colors hover:bg-blue-hover whitespace-nowrap self-end"
          >
            調べる
          </button>
        </div>

        {/* クイック検索 */}
        <div className="flex items-center gap-2 flex-wrap text-[13px]">
          <span className="text-mute">クイック検索：</span>
          {[
            { label: '不妊治療', stage: 'funin' as StageValue },
            { label: '妊娠中', stage: 'ninshin' as StageValue },
            { label: '出産・産後', stage: 'shussan' as StageValue },
          ].map((q) => (
            <button
              key={q.stage}
              onClick={() => onQuickSearch(q.stage)}
              className="text-blue bg-transparent border border-border rounded-full px-3 py-1 text-[13px] cursor-pointer transition-all hover:border-blue hover:bg-blue-light"
            >
              {q.label}
            </button>
          ))}
          {[
            { label: '中央区の育児', ward: 'chuo' },
            { label: '渋谷区の育児', ward: 'shibuya' },
            { label: '港区の育児', ward: 'minato' },
          ].map((q) => (
            <button
              key={q.ward}
              onClick={() => onQuickSearch('ikuji', q.ward)}
              className="text-blue bg-transparent border border-border rounded-full px-3 py-1 text-[13px] cursor-pointer transition-all hover:border-blue hover:bg-blue-light"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
