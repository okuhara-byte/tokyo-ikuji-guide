import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '葛飾区';

export const WKA1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WKA2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による施設型・訪問型',
});
export const WKA3: BenefitDetail = buildNinkagaiHoiku(W);
export const WKA4: BenefitDetail = buildKodomoIryo(W);
export const WKA5: BenefitDetail = buildShussanKyufu(W);
