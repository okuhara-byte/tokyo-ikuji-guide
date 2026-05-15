import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '大田区';

export const WOT1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WOT2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜4,000円',
  serviceTypes: '助産師による訪問型・デイサービス型',
});
export const WOT3: BenefitDetail = buildNinkagaiHoiku(W);
export const WOT4: BenefitDetail = buildKodomoIryo(W);
export const WOT5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間600〜700円',
  serviceName: '一時保育・保育ステーション',
});
