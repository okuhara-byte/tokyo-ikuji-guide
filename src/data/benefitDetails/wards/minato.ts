import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildKodomoIryo,
  wardDisclaimer,
} from './_builders';

const W = '港区';

export const WM1: BenefitDetail = buildBabysitter(W, {
  monthlyHours: 100,
  monthlyMax: '5万円',
  purposes: '就労・求職・リフレッシュ・通院など幅広い目的が対象',
});

export const WM2: BenefitDetail = {
  overview: `${W}に住民登録がある方が出産した場合に10万円を支給する区独自の制度です。妊娠届出時の5万円（国の出産・子育て応援交付金）と合わせると最大15万円になります。`,
  amountDetail: [
    `支給額：10万円（${W}独自分）`,
    '国の妊娠届出時5万円と合算で計15万円',
    `${W}に住民登録がある方が対象`,
    '所得制限なし',
  ],
  whoDetail: `${W}に住民登録がある方で、対象期間中に出産した方。出産時点で${W}民であることが要件。`,
  deadlineDetail: '出産後1年以内に区へ申請。',
  eligibilityQuestions: [
    {
      id: 'residence',
      question: `出産時点で${W}に住民登録がありましたか／ありますか？`,
      options: [
        { value: 'yes', label: 'はい', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
    {
      id: 'birth',
      question: '出産後の経過は？',
      options: [
        { value: 'pregnant', label: 'まだ出産していない（妊娠中）', eligible: true },
        { value: 'within', label: '出産後1年以内', eligible: true },
        { value: 'over', label: '出産後1年以上経過', eligible: false },
      ],
    },
  ],
  steps: [
    {
      title: `${W}保健所での妊婦面談（妊娠届出時）`,
      desc: '妊娠届出時に区の保健師との面談があり、第1回給付金（国制度の5万円）の案内があります。',
      documents: ['妊娠届出書', '本人確認書類', 'マイナンバー確認書類'],
    },
    {
      title: '出生届の提出',
      desc: `${W}区役所に出生届を提出。`,
    },
    {
      title: '出産後の面談・申請',
      desc: '出生後の乳児面談時または区窓口で港区独自の10万円給付を申請します。',
      documents: ['給付金申請書', '母子健康手帳', '振込先口座が分かるもの'],
    },
    { title: '振込', desc: '審査後、1〜2か月で指定口座に振り込まれます。' },
  ],
  notes: [
    '国の「出産・子育て応援交付金」（B2、計10万円）と本制度は別建てとなっています。',
    `他区から${W}へ転入した場合の取り扱いは窓口で要確認。`,
    wardDisclaimer(W),
  ],
};

export const WM3: BenefitDetail = {
  overview: `${W}が独自に行うバイリンガル環境の認可外保育施設（英語保育園など）の利用支援です。国・都の認可外補助に加えて、月1万円を加算して支給します。`,
  amountDetail: [
    '加算額：月1万円（国・都の補助に上乗せ）',
    '対象：認可外英語保育施設の利用料',
    '対象年齢：3〜5歳児',
    `${W}在住が条件`,
  ],
  whoDetail: `${W}在住の3〜5歳児を、バイリンガル環境の認可外保育施設に通わせている家庭。`,
  deadlineDetail: '毎年5月末までに年度申請。',
  eligibilityQuestions: [
    {
      id: 'residence',
      question: `${W}に住民登録がありますか？`,
      options: [
        { value: 'yes', label: 'はい', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
    {
      id: 'age',
      question: 'お子さんは3〜5歳児クラスですか？',
      options: [
        { value: 'yes', label: 'はい（3〜5歳児）', eligible: true },
        { value: 'no', label: '0〜2歳または小学生以上', eligible: false },
      ],
    },
    {
      id: 'facility',
      question: '通う認可外保育施設はバイリンガル環境ですか？',
      note: '区が指定する英語保育施設のリストを確認してください',
      options: [
        { value: 'yes', label: 'はい', eligible: true },
        { value: 'unsure', label: '分からない（要確認）', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
  ],
  steps: [
    { title: '対象施設の確認', desc: `${W}が指定する英語保育施設一覧を区Webサイトで確認します。` },
    {
      title: '施設との利用契約',
      desc: '対象施設と利用契約を結びます。',
    },
    {
      title: `${W}窓口で年度申請（毎年5月末まで）`,
      desc: '所得・利用施設・利用状況を証明する書類を添えて申請します。',
      documents: [
        '申請書（区配布）',
        '施設との利用契約書',
        '利用料の領収書',
        '世帯全員分の住民票',
        '住民税課税証明書',
      ],
    },
    { title: '審査後、月単位または年単位で支給', desc: '国・都の認可外補助と合算で振り込まれることが多いです。' },
  ],
  notes: [
    '国の幼児教育・保育の無償化（N4、月3.7万円）と都の認可外補助に加えて、本制度の1万円が上乗せされます。',
    `他の${W}独自支援との併用条件は窓口で要確認。`,
    wardDisclaimer(W),
  ],
};

export const WM4: BenefitDetail = buildSangoCare(W, {
  monthsLimit: 4,
  feeLabel: '1日4,000円〜（宿泊型・日帰り型）',
  serviceTypes: '提携助産院での宿泊型・日帰り型（助産師ケア込み）',
});

export const WM5: BenefitDetail = buildKodomoIryo(W);
