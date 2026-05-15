import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildByojiHoiku,
} from './_builders';

const W = '目黒区';

export const WMG1: BenefitDetail = buildBabysitter(W, {
  monthlyHours: 100,
  extra: '深夜（22〜翌6時）は1時間最大3,000円に加算されます。',
});
export const WMG2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による施設型デイサービス・訪問型',
});
export const WMG3: BenefitDetail = buildNinkagaiHoiku(W);
export const WMG4: BenefitDetail = buildKodomoIryo(W);
export const WMG5: BenefitDetail = buildByojiHoiku(W, { dailyFee: '1日2,500円' });
