import type { BenefitDetail } from '../types';
import {
  buildBabysitter,
  buildSangoCare,
  buildByojiHoiku,
  wardDisclaimer,
} from './_builders';

const W = '渋谷区';

export const WSB1: BenefitDetail = buildBabysitter(W, {
  monthlyHours: 240,
  monthlyMax: '6万円',
  ageRangeLabel: '0〜3歳児（42か月未満）',
  purposes: '就労・求職・リフレッシュ・通院など幅広い目的が対象（23区最高水準）',
});

export const WSB2: BenefitDetail = {
  overview: `${W}立小中学校の給食費・教材費・修学旅行積立金を区が全額負担する制度です。在籍者は申請不要で自動的に無償化が適用されます。`,
  amountDetail: [
    '給食費：全額無償',
    '教材費：全額無償',
    '修学旅行積立金：全額無償',
    `対象：${W}立小中学校の在籍者`,
    '申請不要（自動適用）',
  ],
  whoDetail: `${W}立小中学校に在籍している児童・生徒。私立・国立・他区立校に通っている場合は対象外。`,
  deadlineDetail: '在籍中は自動適用。申請不要。',
  eligibilityQuestions: [
    {
      id: 'school',
      question: 'お子さんが通っているのは渋谷区立の小中学校ですか？',
      options: [
        { value: 'yes', label: 'はい（区立校）', eligible: true },
        { value: 'private', label: '私立・国立校', eligible: false },
        { value: 'other_ward', label: '他区の区立校', eligible: false },
      ],
    },
  ],
  steps: [
    { title: '区立校への入学・在籍', desc: `${W}立小中学校に入学・在籍することで自動的に対象になります。` },
    { title: '申請手続きは不要', desc: '保護者からの申請は必要ありません。学校・区が一括して処理します。' },
    {
      title: '転入・転校時の取り扱い',
      desc: `年度途中で${W}立校に転入した場合も対象。退学・転出時は対象外となります。`,
    },
  ],
  notes: [
    '私立・国立学校への通学者は本制度の対象外です。',
    '部活動費・PTA会費など、学校徴収金の一部は対象外となる場合があります。',
    '給食費の無償化は他区でも順次拡大されていますが、教材費・修学旅行積立金まで全額無償化しているのは限られています。',
    wardDisclaimer(W),
  ],
};

export const WSB3: BenefitDetail = buildSangoCare(W, {
  weeksLimit: 8,
  feeLabel: '1泊2,000円〜',
  serviceTypes: '助産院などでの宿泊型産後ケア（助産師常駐）',
});

export const WSB4: BenefitDetail = buildByojiHoiku(W, { dailyFee: '1日2,000円' });

export const WSB5: BenefitDetail = {
  overview: `${W}内在住の子育て世帯を対象に、民間賃貸住宅の家賃を月最大2万円・最長3年間助成する制度です。子育て世帯の定住促進が目的。収入制限があります。`,
  amountDetail: [
    '助成額：月最大2万円',
    '助成期間：最長3年間（年度更新）',
    `${W}内の民間賃貸住宅が対象`,
    '世帯収入による所得制限あり',
  ],
  whoDetail: `${W}内の民間賃貸住宅に居住する子育て世帯（中学生以下の子を扶養）。世帯収入の上限・住宅の家賃上限など、複数の条件があります。`,
  deadlineDetail: '毎年9月末までに継続申請（年度更新制）。',
  eligibilityQuestions: [
    {
      id: 'residence',
      question: `${W}内の民間賃貸住宅に居住していますか？`,
      note: '区営住宅・社宅・持ち家は対象外',
      options: [
        { value: 'yes', label: 'はい（民間賃貸）', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
    {
      id: 'children',
      question: '中学生以下のお子さんを扶養していますか？',
      options: [
        { value: 'yes', label: 'はい', eligible: true },
        { value: 'no', label: 'いいえ', eligible: false },
      ],
    },
    {
      id: 'income',
      question: '世帯年収の所得制限を超えていませんか？',
      note: '所得制限の具体額は年度により変動。区窓口で要確認。',
      options: [
        { value: 'within', label: '所得制限内', eligible: true },
        { value: 'unsure', label: '分からない（要確認）', eligible: true },
        { value: 'over', label: '所得制限を超えている', eligible: false },
      ],
    },
  ],
  steps: [
    {
      title: '所得制限・家賃上限の確認',
      desc: '区Webサイトで本年度の所得制限・家賃上限を確認します。',
    },
    {
      title: `${W}住宅課で申請`,
      desc: '初年度は窓口での申請が必要です。',
      documents: [
        '家賃助成申請書',
        '賃貸借契約書のコピー',
        '直近の住民税課税証明書（世帯全員分）',
        '世帯全員分の住民票',
        '健康保険証（お子さんの扶養関係確認用）',
        '振込先口座が分かるもの',
      ],
    },
    { title: '審査後、月単位または半年単位で振込', desc: '審査後、認定された金額が指定口座に振り込まれます。' },
    { title: '毎年9月末までに継続申請', desc: '次年度も継続するには年度更新が必要です。' },
  ],
  notes: [
    '所得制限・家賃上限は年度により変動します。申請前に必ず区Webサイトで確認してください。',
    '社宅・公的住宅・持ち家・親族からの賃貸は対象外です。',
    `${W}への転入後3年以内など、居住要件がある場合があります。`,
    wardDisclaimer(W),
  ],
};
