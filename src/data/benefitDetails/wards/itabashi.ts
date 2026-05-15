import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '板橋区';

export const WIB1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WIB2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1回2,000〜4,000円',
  serviceTypes: '助産師による施設型デイサービス・訪問型',
});
export const WIB3: BenefitDetail = buildNinkagaiHoiku(W);
export const WIB4: BenefitDetail = buildKodomoIryo(W);
export const WIB5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間700円',
  serviceName: '一時保育（みんなの子育てひろば）',
});
