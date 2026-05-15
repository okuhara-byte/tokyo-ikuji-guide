import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildIchijiHoiku,
} from './_builders';

const W = '豊島区';

export const WTS1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WTS2: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1日2,000〜5,000円（日帰り・宿泊型）',
  serviceTypes: '助産師による日帰り型・宿泊型',
});
export const WTS3: BenefitDetail = buildNinkagaiHoiku(W);
export const WTS4: BenefitDetail = buildKodomoIryo(W);
export const WTS5: BenefitDetail = buildIchijiHoiku(W, {
  feeLabel: '1時間700円',
  monthlyHoursMax: 30,
  serviceName: '一時保育（あいのて）',
});
