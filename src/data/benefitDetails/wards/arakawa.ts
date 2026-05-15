import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '荒川区';

export const WAR1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WAR2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による訪問型・施設型（日帰り）',
});
export const WAR3: BenefitDetail = buildNinkagaiHoiku(W);
export const WAR4: BenefitDetail = buildKodomoIryo(W);
export const WAR5: BenefitDetail = buildShussanKyufu(W, {
  totalAmount: '計10万円',
  splitDesc: '出産時5万円＋乳児健診時5万円',
});
