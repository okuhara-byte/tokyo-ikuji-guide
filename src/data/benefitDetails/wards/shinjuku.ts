import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildByojiHoiku,
} from './_builders';

const W = '新宿区';

export const WSJ1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WSJ2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜4,000円',
  serviceTypes: '助産師による訪問型・施設型（デイサービス）',
});
export const WSJ3: BenefitDetail = buildNinkagaiHoiku(W);
export const WSJ4: BenefitDetail = buildKodomoIryo(W);
export const WSJ5: BenefitDetail = buildByojiHoiku(W, { dailyFee: '1日2,000円', ageRangeLabel: '0〜8歳' });
