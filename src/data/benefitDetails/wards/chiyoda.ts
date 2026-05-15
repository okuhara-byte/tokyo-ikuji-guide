import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildHiroba,
} from './_builders';

const W = '千代田区';

export const WCD1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WCD2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000円程度（6回まで）',
  serviceTypes: '助産師による訪問型（自宅訪問）',
});
export const WCD3: BenefitDetail = buildKodomoIryo(W);
export const WCD4: BenefitDetail = buildNinkagaiHoiku(W, { monthlyMax: '35,000円' });
export const WCD5: BenefitDetail = buildHiroba(W, '子育て支援センター');
