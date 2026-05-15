import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoHelper,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildByojiHoiku,
} from './_builders';

const W = '江東区';

export const WKT1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WKT2: BenefitDetail = buildSangoHelper(W, {
  monthsLimit: 12,
  hoursMax: 80,
  hourlyFee: '400円',
});
export const WKT3: BenefitDetail = buildNinkagaiHoiku(W);
export const WKT4: BenefitDetail = buildKodomoIryo(W);
export const WKT5: BenefitDetail = buildByojiHoiku(W, { dailyFee: '1日2,000〜3,000円' });
