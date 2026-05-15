import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '品川区';

export const WSG1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WSG2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1泊5,000〜8,000円（宿泊型）',
  serviceTypes: '提携施設での宿泊型産後ケア（助産師常駐）',
});
export const WSG3: BenefitDetail = buildNinkagaiHoiku(W);
export const WSG4: BenefitDetail = buildKodomoIryo(W);
export const WSG5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間600円',
  monthlyHoursMax: 30,
  serviceName: 'すくすく子育て支援事業（一時預かり）',
});
