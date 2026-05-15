import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoHelper,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  buildHiroba,
} from './_builders';

const W = '墨田区';

export const WSD1: BenefitDetail = buildBabysitter(W, { monthlyHours: 80 });
export const WSD2: BenefitDetail = buildSangoHelper(W, {
  monthsLimit: 6,
  hourlyFee: '200〜400円',
});
export const WSD3: BenefitDetail = buildKodomoIryo(W);
export const WSD4: BenefitDetail = buildNinkagaiHoiku(W);
export const WSD5: BenefitDetail = buildHiroba(W, 'すみだ子育てひろば');
