import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '足立区';

export const WAD1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WAD2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による訪問型・施設型',
});
export const WAD3: BenefitDetail = buildNinkagaiHoiku(W);
export const WAD4: BenefitDetail = buildKodomoIryo(W);
export const WAD5: BenefitDetail = buildShussanKyufu(W);
