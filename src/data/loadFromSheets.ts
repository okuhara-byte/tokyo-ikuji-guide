import type { Benefit, WardKey } from './types';
import { NATIONAL as STATIC_NATIONAL } from './national';
import { METRO as STATIC_METRO } from './metro';
import { FERTILITY as STATIC_FERTILITY } from './fertility';
import { PREGNANCY as STATIC_PREGNANCY } from './pregnancy';
import { BIRTH as STATIC_BIRTH } from './birth';
import { WARD as STATIC_WARD } from './wards';

interface RawBenefit extends Benefit {
  wardKey?: string;
}

let synced: RawBenefit[] | null = null;
try {
  synced = require('./generated/benefits.json');
} catch {
  synced = null;
}

function fromSheetsOrFallback<T>(filter: (b: RawBenefit) => boolean, fallback: T[]): T[] {
  if (!synced) return fallback;
  return synced.filter(filter) as unknown as T[];
}

export const NATIONAL: Benefit[] = fromSheetsOrFallback(
  (b) => b.tier === 'national' && !b.phase,
  STATIC_NATIONAL
);

export const METRO: Benefit[] = fromSheetsOrFallback(
  (b) => b.tier === 'metro' && !b.phase,
  STATIC_METRO
);

export const FERTILITY: Benefit[] = fromSheetsOrFallback(
  (b) => b.phase === 'fertility',
  STATIC_FERTILITY
);

export const PREGNANCY: Benefit[] = fromSheetsOrFallback(
  (b) => b.phase === 'pregnancy',
  STATIC_PREGNANCY
);

export const BIRTH: Benefit[] = fromSheetsOrFallback(
  (b) => b.phase === 'birth',
  STATIC_BIRTH
);

export const WARD: Record<WardKey, Benefit[]> = synced
  ? (Object.keys(STATIC_WARD) as WardKey[]).reduce(
      (acc, key) => {
        acc[key] = synced!.filter((b) => b.tier === 'ward' && b.wardKey === key) as Benefit[];
        // 同期データに該当区がなければ静的データへフォールバック
        if (acc[key].length === 0) acc[key] = STATIC_WARD[key];
        return acc;
      },
      {} as Record<WardKey, Benefit[]>
    )
  : STATIC_WARD;
