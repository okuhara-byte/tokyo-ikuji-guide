import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '世田谷区';

export const WST1: BenefitDetail = buildBabysitter(W, { monthlyHours: 120 });
export const WST2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1泊4,000〜6,000円（宿泊型・日帰り型）',
  serviceTypes: '提携施設での宿泊型・日帰り型',
});
export const WST3: BenefitDetail = buildNinkagaiHoiku(W);
export const WST4: BenefitDetail = buildKodomoIryo(W);
export const WST5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間600〜800円',
  serviceName: '子育てほっとステーション（一時預かり）',
});
