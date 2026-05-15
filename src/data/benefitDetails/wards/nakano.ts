import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '中野区';

export const WNK1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WNK2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜4,000円',
  serviceTypes: '助産師による施設型・訪問型',
});
export const WNK3: BenefitDetail = buildNinkagaiHoiku(W);
export const WNK4: BenefitDetail = buildKodomoIryo(W);
export const WNK5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間600円〜',
  serviceName: '一時保育・子育てひろば',
});
