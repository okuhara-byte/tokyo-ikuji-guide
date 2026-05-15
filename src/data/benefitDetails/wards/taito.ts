import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildKenshin,
} from './_builders';

const W = '台東区';

export const WTT1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WTT2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による施設型デイサービス・自宅訪問型',
});
export const WTT3: BenefitDetail = buildKodomoIryo(W);
export const WTT4: BenefitDetail = buildNinkagaiHoiku(W);
export const WTT5: BenefitDetail = buildKenshin(W);
