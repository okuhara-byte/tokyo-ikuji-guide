export type Tier = 'national' | 'metro' | 'ward';
export type Phase = 'fertility' | 'pregnancy' | 'birth';
export type DeadlineType = 'annual' | 'rolling' | 'onetime';

export type CategoryKey =
  | 'hoiku'
  | 'kazoku'
  | 'sango'
  | 'kyoiku'
  | 'iryo'
  | 'funin'
  | 'ninshin'
  | 'shussan';

export interface Deadline {
  month: number | null;
  day: number | null;
  note: string;
}

export interface Benefit {
  id: string;
  tier: Tier;
  phase?: Phase;
  isNew: boolean;
  title: string;
  amount: string;
  as: string;
  desc: string;
  tags: string[];
  cat: CategoryKey[];
  age?: [number, number];
  period: string;
  deadline: Deadline | null;
  deadlineType?: DeadlineType;
  url: string;
  bar?: string;
}

export type WardKey =
  | 'chiyoda' | 'chuo' | 'minato' | 'shinjuku'
  | 'bunkyo' | 'taito' | 'sumida' | 'koto'
  | 'shinagawa' | 'meguro' | 'ota' | 'setagaya'
  | 'shibuya' | 'nakano' | 'suginami' | 'toshima'
  | 'kita' | 'arakawa' | 'itabashi' | 'nerima'
  | 'adachi' | 'katsushika' | 'edogawa';

export const CAT_LABELS: Record<CategoryKey, string> = {
  hoiku: '保育・預かり',
  kazoku: '出産・家族',
  sango: '産後支援',
  kyoiku: '教育',
  iryo: '医療・保健',
  funin: '不妊治療',
  ninshin: '妊娠中',
  shussan: '出産・産後',
};

export const WARD_NAMES: Record<WardKey, string> = {
  chiyoda: '千代田区', chuo: '中央区', minato: '港区', shinjuku: '新宿区',
  bunkyo: '文京区', taito: '台東区', sumida: '墨田区', koto: '江東区',
  shinagawa: '品川区', meguro: '目黒区', ota: '大田区', setagaya: '世田谷区',
  shibuya: '渋谷区', nakano: '中野区', suginami: '杉並区', toshima: '豊島区',
  kita: '北区', arakawa: '荒川区', itabashi: '板橋区', nerima: '練馬区',
  adachi: '足立区', katsushika: '葛飾区', edogawa: '江戸川区',
};

export const AGE_TO_MONTHS: Record<string, number | null> = {
  '': null,
  '0': 0,
  '1': 12,
  '2': 24,
  '3': 36,
  '45': 48,
  '6': 84,
};

export const TIER_LABELS: Record<Tier, string> = {
  ward: '区の制度',
  metro: '東京都',
  national: '国の制度',
};

export const STAGE_OPTIONS = [
  { value: 'all', label: 'すべて（妊活〜育児）' },
  { value: 'funin', label: '不妊治療・妊活' },
  { value: 'ninshin', label: '妊娠中' },
  { value: 'shussan', label: '出産・産後' },
  { value: 'ikuji', label: '育児期' },
] as const;

export type StageValue = (typeof STAGE_OPTIONS)[number]['value'];
