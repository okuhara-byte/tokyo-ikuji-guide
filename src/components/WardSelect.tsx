'use client';

import { WARD_NAMES, WardKey } from '@/data/types';

const wardEntries = Object.entries(WARD_NAMES) as [WardKey, string][];

const selectClass =
  "appearance-none border border-border rounded px-3.5 py-2.5 pr-10 text-[15px] bg-white text-text cursor-pointer min-w-[210px] transition-all focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 hover:border-[#aaa] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23595959%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center]";

interface WardSelectProps {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label?: string;
  placeholder?: string;
}

export default function WardSelect({
  id,
  value,
  onChange,
  label = '区を選択',
  placeholder = '── 区を選択してください ──',
}: WardSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-mute font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">{placeholder}</option>
        <optgroup label="東京23区">
          {wardEntries.map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
