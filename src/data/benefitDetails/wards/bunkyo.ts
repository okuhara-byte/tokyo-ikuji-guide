import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoHelper,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '文京区';

export const WBK1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WBK2: BenefitDetail = buildSangoHelper(W, {
  monthsLimit: 6,
  hourlyFee: '300〜500円',
  serviceName: '産後支援ヘルパー（ゆりかごサービス）',
});
export const WBK3: BenefitDetail = buildNinkagaiHoiku(W);
export const WBK4: BenefitDetail = buildKodomoIryo(W);
export const WBK5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間700円',
  monthlyHoursMax: 12,
  serviceName: '一時保育（ふれあい保育）',
});
