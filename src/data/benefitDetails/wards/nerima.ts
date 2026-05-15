import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '練馬区';

export const WNE1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WNE2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による訪問型・デイサービス型',
});
export const WNE3: BenefitDetail = buildNinkagaiHoiku(W);
export const WNE4: BenefitDetail = buildKodomoIryo(W);
export const WNE5: BenefitDetail = buildShussanKyufu(W);
