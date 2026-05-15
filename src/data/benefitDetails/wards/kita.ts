import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildShussanKyufu,
} from './_builders';

const W = '北区';

export const WKI1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WKI2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜3,000円',
  serviceTypes: '助産師による訪問型・デイサービス型',
});
export const WKI3: BenefitDetail = buildNinkagaiHoiku(W);
export const WKI4: BenefitDetail = buildKodomoIryo(W);
export const WKI5: BenefitDetail = buildShussanKyufu(W, {
  totalAmount: '計10万円',
  splitDesc: '出産時5万円＋4か月健診時5万円',
});
