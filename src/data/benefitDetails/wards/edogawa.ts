import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '江戸川区';

export const WED1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WED2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜4,000円',
  serviceTypes: '助産師による訪問型・施設型',
});
export const WED3: BenefitDetail = buildNinkagaiHoiku(W);
export const WED4: BenefitDetail = buildKodomoIryo(W);
export const WED5: BenefitDetail = buildShussanKyufu(W);
