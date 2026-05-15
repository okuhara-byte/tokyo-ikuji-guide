import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  buildNinkagaiHoiku,
  wardDisclaimer,
} from './_builders';

const W = '杉並区';

export const WSA1: BenefitDetail = buildBabysitter(W, { monthlyHours: 100 });
export const WSA2: BenefitDetail = buildSangoCare(W, {
  weeksLimit: 8,
  feeLabel: '1日2,000〜5,000円（日帰り・宿泊型）',
  serviceTypes: '提携施設での日帰り・宿泊型産後ケア',
});
export const WSA3: BenefitDetail = buildNinkagaiHoiku(W);
export const WSA4: BenefitDetail = buildKodomoIryo(W);

export const WSA5: BenefitDetail = {
  overview: `${W}に住民登録がある方が出産した場合に10万円分の「子育て応援券」を交付する区独自の制度です。ベビーシッター・産後ヘルパー・一時保育などの育児サービス費用に使用できます。子が1歳になるまで使用可能です。`,
  amountDetail: [
    '交付額：10万円分（チケット形式）',
    '対象サービス：ベビーシッター・産後ヘルパー・一時保育・育児サポートなど育児サービス全般',
    `${W}に住民登録がある方が出産時に交付`,
    '子が1歳になるまで使用可',
  ],
  whoDetail: `${W}に住民登録がある方で、対象期間中に出産した方。出産時に区が指定する方法（窓口交付または郵送）で受け取ります。`,
  deadlineDetail: '出産後に区から自動的に案内・交付（子が1歳になるまで使用可）。',
  eligibilityQuestions: [
    {
      id: 'residence',
      question: `出産時に${W}に住民登録がありましたか／ありますか？`,
      options: [
        { value: 'yes', label: 'はい', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
    {
      id: 'age',
      question: 'お子さんの年齢は？',
      options: [
        { value: 'within', label: '1歳未満', eligible: true },
        { value: 'over', label: '1歳以上', eligible: false },
      ],
    },
  ],
  steps: [
    {
      title: '出生届の提出',
      desc: `${W}役所に出生届を提出。`,
    },
    {
      title: '区から子育て応援券の交付',
      desc: '出生届出後、区から応援券（10万円分）が交付されます。原則として申請不要。',
    },
    {
      title: '対応サービスでチケット使用',
      desc: '区が指定する協力事業者（ベビーシッター・産後ヘルパー・一時保育施設など）でチケットを利用します。',
    },
    {
      title: '事業者がチケットを区に請求',
      desc: '事業者側が区に請求するため、保護者は追加手続き不要です。',
    },
  ],
  notes: [
    'チケットは1歳の誕生日前日までに使い切る必要があります。',
    '使用できる事業者は区が指定するリストに限定されます。区Webサイトで確認してください。',
    '転出した場合、未使用分の取り扱いは区窓口で要確認。',
    wardDisclaimer(W),
  ],
};
