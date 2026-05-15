import type { BenefitDetail } from '../types';

export const wardDisclaimer = (wardName: string) =>
  `区独自制度のため、所得制限・対象期間・必要書類・利用料金は予告なく変更されることがあります。申請前に${wardName}の公式ページで最新情報を必ず確認してください。`;

const residenceQ = (wardName: string) => ({
  id: 'residence',
  question: `${wardName}に住民登録がありますか？`,
  options: [
    { value: 'yes', label: 'はい', eligible: true },
    { value: 'no', label: 'いいえ', eligible: false },
  ],
});

// ============================================================
// こども医療費助成（区上乗せ）— 23区ほぼ共通
// ============================================================
export function buildKodomoIryo(wardName: string): BenefitDetail {
  return {
    overview: `東京都の「子ども医療費助成（マル子医療証）」に加えて、${wardName}が独自に上乗せ助成することで、0〜18歳までの医療費の窓口負担を完全にゼロにしている制度です。所得制限はなく、入院時の食事療養費なども区が負担する場合があります。`,
    amountDetail: [
      '保険診療分の医療費：自己負担0円（都＋区で全額助成）',
      '0歳〜18歳到達後の最初の3月31日まで対象',
      '所得制限なし',
      '都のマル子医療証 + 区の上乗せ分が一体で適用',
    ],
    whoDetail: `${wardName}に住民登録がある0歳〜18歳到達後の最初の3月31日までの子。健康保険に加入していることが前提。マル子医療証を取得するだけで自動的に区の上乗せも適用されます。`,
    deadlineDetail: '出生・転入から速やかにマル子医療証を申請。',
    eligibilityQuestions: [
      {
        id: 'residence',
        question: `お子さんは${wardName}に住民登録されていますか？`,
        options: [
          { value: 'yes', label: 'はい', eligible: true },
          { value: 'no', label: 'いいえ（他区／都外）', eligible: false },
        ],
      },
      {
        id: 'age',
        question: 'お子さんの年齢は？',
        options: [
          { value: 'within', label: '0歳〜高校3年生相当', eligible: true },
          { value: 'over', label: '高校生年代を超えている', eligible: false },
        ],
      },
      {
        id: 'maruko',
        question: 'マル子医療証は申請済みですか？',
        note: '都のマル子医療証の申請がベースになります',
        options: [
          { value: 'yes', label: '申請済み（医療証あり）', eligible: true },
          { value: 'pending', label: 'これから申請', eligible: true },
        ],
      },
    ],
    steps: [
      {
        title: `出生届・転入届と同時に${wardName}窓口でマル子医療証を申請`,
        desc: `${wardName}役所の子育て支援窓口で申請。区独自の上乗せは別途申請不要で自動適用される運用です。`,
        documents: [
          'マル子医療証 交付申請書',
          'お子さんの健康保険証',
          '保護者の本人確認書類',
          'マイナンバー確認書類',
        ],
      },
      { title: '医療証を受領', desc: '即日交付または後日郵送で医療証が届きます。' },
      {
        title: '受診時に医療証＋健康保険証を提示',
        desc: '都内の医療機関で自己負担なしで受診できます。',
      },
      {
        title: '都外受診の場合は区窓口で償還払い申請',
        desc: '都外医療機関で受診した場合は領収書を持って区へ還付申請します。',
        documents: ['医療費助成費 還付申請書', '領収書（原本）', '診療明細書', 'マル子医療証'],
      },
    ],
    notes: [
      '本制度は東京都のマル子医療証（M1）の上乗せです。都の医療証申請が前提条件となります。',
      '入院時の食事療養費・差額ベッド代・健康診断・予防接種は対象外となる場合があります。区窓口で要確認。',
      '転出した場合は、転出先の自治体の制度に切り替わります。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// ベビーシッター利用支援
// ============================================================
interface BabysitterParams {
  hourlyMax?: string; // 例 "2,500円"
  monthlyHours?: number; // 例 100
  monthlyMax?: string; // 例 "5万円"
  ageRangeLabel?: string; // 例 "0〜2歳児（36か月未満）"
  purposes?: string; // 例 "就労・求職・リフレッシュ"
  extra?: string; // 追加メモ（深夜加算など）
}
export function buildBabysitter(wardName: string, p: BabysitterParams = {}): BenefitDetail {
  const hourlyMax = p.hourlyMax ?? '2,500円';
  const monthlyHours = p.monthlyHours ?? 100;
  const ageRange = p.ageRangeLabel ?? '0〜2歳児（36か月未満）';
  const purposes = p.purposes ?? '就労・求職など保育の必要性が認められる場合';
  return {
    overview: `認可保育所に入れない家庭などが認定ベビーシッター事業者を利用した際の費用を、${wardName}が補助する制度です。1時間あたり最大${hourlyMax}・月${monthlyHours}時間まで補助されます。${p.extra ?? ''}`,
    amountDetail: [
      `補助額：1時間あたり最大${hourlyMax}`,
      `上限：月${monthlyHours}時間まで` + (p.monthlyMax ? `（月最大${p.monthlyMax}）` : ''),
      `対象目的：${purposes}`,
      '所得制限・自己負担額の扱いは区窓口で要確認',
    ],
    whoDetail: `${wardName}在住の${ageRange}を養育する保護者で、保育の必要性が認められる方。認可保育所等の利用が確保できない場合に限られることが多いです。利用は東京都知事認定のベビーシッター事業者に限定されます。`,
    deadlineDetail: '年度ごとに認定申請が必要。毎年4月末までに更新申請を行うのが原則。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんの年齢は？',
        note: `${ageRange}が対象です`,
        options: [
          { value: 'within', label: ageRange, eligible: true },
          { value: 'over', label: '対象年齢を超えている', eligible: false },
        ],
      },
      {
        id: 'reason',
        question: '保育を必要とする理由は？',
        options: [
          { value: 'work', label: '就労中・就学中', eligible: true },
          { value: 'job_hunt', label: '求職中・これから就労', eligible: true },
          { value: 'other', label: 'リフレッシュ・通院など', eligible: true },
          { value: 'none', label: '特に理由はない', eligible: false },
        ],
      },
      {
        id: 'authorized',
        question: '利用予定の事業者は東京都知事認定のベビーシッター事業者ですか？',
        note: '認定外事業者の利用は対象外です',
        options: [
          { value: 'yes', label: 'はい（認定事業者）', eligible: true },
          { value: 'unsure', label: '分からない（要確認）', eligible: true },
          { value: 'no', label: 'いいえ（認定外）', eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: `${wardName}子育て支援窓口で利用認定を申請`,
        desc: '事前に区へ認定申請が必要です。就労状況等により認定区分が決まります。',
        documents: [
          '利用認定申請書（区配布）',
          '就労証明書または保育の必要性を証明する書類',
          '健康保険証',
          'マイナンバーが確認できる書類',
        ],
      },
      { title: '認定通知の受領', desc: '認定区分・補助上限などが記載された認定通知書が届きます。' },
      {
        title: '東京都認定のベビーシッター事業者を選び利用',
        desc: '都の認定事業者リストから選択して利用契約を結びます。',
      },
      {
        title: '利用後に補助金を申請',
        desc: '領収書を添えて月単位または四半期単位で区に申請します。',
        documents: [
          '補助金交付申請書',
          '事業者発行の領収書（原本）',
          '利用実績報告書',
          '振込先口座が分かるもの',
        ],
      },
      { title: '審査後、指定口座に振込', desc: '審査・支給までおおむね1〜2か月。' },
    ],
    notes: [
      'こども家庭庁ベビーシッター割引券（N5）と本制度は別事業ですが、対象が異なるため重複利用が可能な場合があります。区窓口で確認してください。',
      '認可保育所の利用が確保できる場合は対象外となることがあります。',
      '認定事業者リストは東京都の公式ページで公開されています。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 認可外保育施設 利用料補助
// ============================================================
interface NinkagaiParams {
  monthlyMax?: string; // 例 "37,000円"
}
export function buildNinkagaiHoiku(wardName: string, p: NinkagaiParams = {}): BenefitDetail {
  const monthlyMax = p.monthlyMax ?? '37,000円';
  return {
    overview: `認可保育所に入れず、認可外保育施設を利用している${wardName}在住の家庭に対して、利用料の一部を月最大${monthlyMax}補助する制度です。待機児童家庭の経済的負担を軽減し、就労継続を支援します。`,
    amountDetail: [
      `補助額：月最大${monthlyMax}`,
      '対象：認可外保育施設の利用料',
      '所得・年齢区分により補助額が変動する場合あり',
      '国の幼児教育・保育の無償化（N4）と重複しない範囲での補助',
    ],
    whoDetail: `${wardName}在住で、認可保育所等の利用申請をしたが入所できなかった（待機児童となった）家庭。0〜2歳児が中心ですが、3歳以上の場合は無償化制度との関係で対象が異なる場合があります。`,
    deadlineDetail: '年度ごとに認定・更新が必要。随時申請可。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんの年齢は？',
        options: [
          { value: '0-2', label: '0〜2歳児', eligible: true },
          { value: '3-5', label: '3〜5歳児（無償化制度と要調整）', eligible: true },
          { value: 'over', label: '小学生以上', eligible: false },
        ],
      },
      {
        id: 'waiting',
        question: '認可保育所の入所申請をして待機児童となっていますか？',
        note: '入所申請をしていない場合は対象外となることが多い',
        options: [
          { value: 'yes', label: 'はい（待機児童）', eligible: true },
          { value: 'no', label: 'いいえ（入所申請をしていない）', eligible: false },
        ],
      },
      {
        id: 'facility',
        question: '利用する認可外保育施設は東京都に届出済みの施設ですか？',
        note: '東京都に届出されていない施設は対象外となります',
        options: [
          { value: 'yes', label: 'はい（届出済み）', eligible: true },
          { value: 'unsure', label: '分からない（要確認）', eligible: true },
          { value: 'no', label: 'いいえ', eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: '認可保育所の入所申請（前提条件）',
        desc: '本制度は待機児童家庭が対象のため、まず認可保育所の入所申請が必要です。',
      },
      {
        title: '認可外保育施設を選定し利用契約',
        desc: '東京都に届出済みの認可外保育施設を選びます。施設のリストは東京都のWebサイトで公開されています。',
      },
      {
        title: `${wardName}へ補助金申請`,
        desc: '所得・利用施設・利用状況を証明する書類を添えて申請します。',
        documents: [
          '認可外保育施設利用料補助金申請書',
          '認可保育所入所不承諾通知書（または保留通知）',
          '認可外保育施設との利用契約書',
          '利用料の領収書',
          '世帯全員分の住民票',
          '保護者の就労証明書',
          '住民税課税証明書',
        ],
      },
      { title: '認定後、月単位または四半期単位で支給', desc: '審査後に補助金が指定口座に振り込まれます。' },
      { title: '年度ごとに更新申請', desc: '次年度も継続利用する場合は4月に更新申請が必要です。' },
    ],
    notes: [
      '3〜5歳児クラスの場合、国の幼児教育・保育の無償化（月37,000円まで）と本制度の関係を区窓口で確認してください。',
      '途中で認可保育所に入所が決まった場合、その時点で本制度の対象外となります。',
      '届出されていない認可外施設は対象外です。利用前に東京都の公開リストで確認してください。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 産後ケア（訪問型・施設型）
// ============================================================
interface SangoCareParams {
  monthsLimit?: number; // 例 4 (産後4か月以内)
  weeksLimit?: number; // 例 8 (産後8週以内)
  feeLabel?: string;
  serviceTypes?: string;
}
export function buildSangoCare(wardName: string, p: SangoCareParams = {}): BenefitDetail {
  const period = p.weeksLimit
    ? `産後${p.weeksLimit}週以内`
    : `産後${p.monthsLimit ?? 4}か月以内`;
  const feeLabel = p.feeLabel ?? '1回2,000〜4,000円程度';
  const serviceTypes = p.serviceTypes ?? '助産師による訪問型・デイサービス型';
  return {
    overview: `${period}の産婦を対象に、${serviceTypes}の産後ケアを低負担で利用できる${wardName}の制度です。授乳指導・育児相談・産後メンタルケア・休息サポートなどが受けられます。`,
    amountDetail: [
      `自己負担：${feeLabel}`,
      `対象期間：${period}`,
      `サービス種別：${serviceTypes}`,
      '住民税非課税世帯は減額または無料となる場合あり',
    ],
    whoDetail: `${wardName}在住で、${period}の産婦。ひとり親家庭や多胎児家庭は時間数や回数が優遇される場合があります。`,
    deadlineDetail: `${period}に区へ申請。妊娠中からの事前登録も可能。`,
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'period',
        question: '出産後の経過期間は？',
        options: [
          { value: 'pregnancy', label: '妊娠中（事前登録）', eligible: true },
          { value: 'within', label: period + '以内', eligible: true },
          { value: 'over', label: period + 'を超えている', eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: `${wardName}保健所・子育て支援窓口へ事前登録`,
        desc: '妊娠中または産後すぐに登録。妊婦面談時に案内されることもあります。',
        documents: ['利用申請書（区配布）', '母子健康手帳', '健康保険証'],
      },
      { title: '利用施設・サービスを選定', desc: '区が提携する助産院・産後ケア施設の中から希望を選びます。' },
      { title: 'サービス利用', desc: '訪問型は自宅で、施設型は宿泊または日帰りで助産師のサポートを受けます。' },
      { title: '利用後に自己負担分を支払い', desc: '所得区分に応じた自己負担額を施設または区へ支払います。' },
    ],
    notes: [
      `東京都の「とうきょうママパパ応援事業」（M2）と一部重なる制度ですが、${wardName}では本制度として運用しているため、区窓口での申請となります。`,
      'ひとり親家庭・多胎児家庭は時間数増・自己負担減免の対象となることがあります。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 産後支援ヘルパー派遣（家事援助型）
// ============================================================
interface SangoHelperParams {
  monthsLimit?: number;
  hoursMax?: number;
  hourlyFee?: string;
  serviceName?: string;
}
export function buildSangoHelper(wardName: string, p: SangoHelperParams = {}): BenefitDetail {
  const months = p.monthsLimit ?? 12;
  const hoursMax = p.hoursMax;
  const hourlyFee = p.hourlyFee ?? '400円';
  const serviceName = p.serviceName ?? '産後家庭支援ヘルパー派遣';
  return {
    overview: `出産後${months}か月以内の家庭にヘルパーを派遣し、授乳補助・沐浴・家事援助（掃除・洗濯・料理）を含む生活支援を行う${wardName}独自の制度（${serviceName}）です。${hourlyFee}の自己負担で利用できます。`,
    amountDetail: [
      `自己負担：1時間あたり${hourlyFee}`,
      hoursMax ? `上限：1家庭あたり${hoursMax}時間まで` : '利用時間の上限は区窓口で要確認',
      '対象サービス：授乳補助・沐浴・食事準備・洗濯・掃除・買い物代行など',
      '住民税非課税世帯は減額または無料となる場合あり',
    ],
    whoDetail: `${wardName}在住で、出産後${months}か月以内の家庭。ひとり親家庭や多胎児家庭など、特に支援が必要な家庭は時間数が増えることがあります。`,
    deadlineDetail: `出産後${months}か月以内に区へ申請。妊娠中からの事前登録も可能。`,
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'period',
        question: '出産後の経過期間は？',
        options: [
          { value: 'pregnancy', label: '妊娠中（事前登録）', eligible: true },
          { value: 'within', label: `産後${months}か月以内`, eligible: true },
          { value: 'over', label: `産後${months}か月以上経過`, eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: `${wardName}子ども家庭支援センターへ事前登録`,
        desc: '妊娠中または産後すぐに登録。妊婦面談時に案内されることもあります。',
        documents: ['登録申請書（区配布）', '母子健康手帳', '健康保険証'],
      },
      {
        title: '利用計画の作成',
        desc: '区の担当者と相談して利用予定（曜日・時間・依頼内容）を決めます。',
      },
      {
        title: '委託事業者からヘルパー派遣',
        desc: '区が委託している事業者からヘルパーが派遣されます。事業者の選択は区が行うのが一般的です。',
      },
      {
        title: 'サービス利用',
        desc: '授乳補助・沐浴・家事援助など、登録した内容に沿ってサポートを受けます。',
      },
      {
        title: '利用後に自己負担分を支払い',
        desc: `1時間${hourlyFee}を月締めなどで支払います。事業者または区への支払いとなります。`,
      },
    ],
    notes: [
      '東京都の「とうきょうママパパ応援事業」（M2）と一部重なる制度ですが、区独自運用のため、区窓口での申請となります。',
      '産後ケア事業（宿泊・日帰り）と併用できる場合が多いです。',
      'ひとり親家庭・多胎児家庭は時間数増・自己負担減免の対象となることがあります。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 乳幼児健康診査（無料）
// ============================================================
export function buildKenshin(wardName: string): BenefitDetail {
  return {
    overview: `${wardName}が母子保健法に基づき実施する乳幼児健康診査です。1か月・3〜4か月・6〜7か月・9〜10か月・1歳6か月・3歳の各時期に無料で受診でき、発育・発達のチェックと育児相談が同時に受けられます。`,
    amountDetail: [
      '受診料：無料',
      '実施回数：1か月・3〜4か月・6〜7か月・9〜10か月・1歳6か月・3歳の計6回',
      '区内指定医療機関または保健所での集団健診',
      '健診時に育児相談・栄養相談も実施',
    ],
    whoDetail: `${wardName}在住の0歳〜3歳までの乳幼児。各健診の対象月齢になると区から案内が郵送されます。`,
    deadlineDetail: '各健診の対象月齢に応じて区から案内が届く（自動）。受診しなかった場合も再案内・追加受診の機会あり。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんの月齢は？',
        options: [
          { value: '1m', label: '生後1か月前後', eligible: true },
          { value: '3-4m', label: '3〜4か月', eligible: true },
          { value: '6-7m', label: '6〜7か月', eligible: true },
          { value: '9-10m', label: '9〜10か月', eligible: true },
          { value: '1y6m', label: '1歳6か月', eligible: true },
          { value: '3y', label: '3歳', eligible: true },
          { value: 'other', label: 'その他の月齢', eligible: false },
        ],
      },
    ],
    steps: [
      { title: '区から健診案内の郵送', desc: '対象月齢になると、保健所から受診票・案内が自動的に郵送されます。' },
      {
        title: '健診を受診',
        desc: '指定医療機関での個別健診または保健所での集団健診に出向きます。',
        documents: ['送付された受診票', '母子健康手帳', '健康保険証', '乳幼児医療証（マル子）'],
      },
      { title: '発育・発達チェックと相談', desc: '医師・保健師・栄養士・歯科衛生士などから個別に相談できます。' },
      { title: '結果は母子健康手帳に記録', desc: '気になる結果があれば追加受診や精密検査が案内されます。' },
    ],
    notes: [
      '受診を忘れた場合でも、保健所に連絡すれば追加で受診できる場合があります。',
      '転入してきた方は、転入届出時に受診歴を申告すると、未受診分の案内が届きます。',
      '健診で気になる発達の様子があった場合、区の発達支援センターや専門医療機関への紹介が行われます。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 一時保育・子育てひろば
// ============================================================
interface IchijiHoikuParams {
  feeLabel?: string;
  monthlyHoursMax?: number;
  serviceName?: string;
  ageRangeLabel?: string;
}
export function buildIchijiHoiku(wardName: string, p: IchijiHoikuParams = {}): BenefitDetail {
  const fee = p.feeLabel ?? '1時間600〜800円程度';
  const ageRange = p.ageRangeLabel ?? '就学前まで';
  const monthlyLimit = p.monthlyHoursMax ? `月${p.monthlyHoursMax}時間まで` : '区の運用による';
  const serviceName = p.serviceName ?? '一時保育';
  return {
    overview: `保護者のリフレッシュや急な用事の際に、${wardName}内の認可保育所や子育て支援施設で${serviceName}を利用できる制度です。事前登録の上、必要なときに予約して利用します。`,
    amountDetail: [
      `自己負担：${fee}`,
      `利用上限：${monthlyLimit}`,
      `対象年齢：${ageRange}`,
      '事前登録が必要',
    ],
    whoDetail: `${wardName}在住の${ageRange}の子。利用理由は問わない（リフレッシュも可）。`,
    deadlineDetail: '通年。利用前に事前登録が必要。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんは対象年齢に該当しますか？',
        options: [
          { value: 'yes', label: `${ageRange}`, eligible: true },
          { value: 'no', label: '対象年齢外', eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: `${wardName}子育て支援窓口で事前登録`,
        desc: '初回利用前に登録が必要です。',
        documents: ['事前登録申請書', 'お子さんの健康保険証', '母子健康手帳'],
      },
      { title: '利用予約', desc: '利用希望日の事前予約を電話・窓口で行います。' },
      {
        title: '利用日に持ち物を持参',
        desc: 'おむつ・着替え・哺乳瓶・連絡ノートなど、施設指定の持ち物を準備します。',
      },
      { title: '利用後に自己負担を支払い', desc: '利用時間に応じた料金を施設で精算します。' },
    ],
    notes: [
      '人気施設は予約が取りづらいことがあります。早めの予約がおすすめです。',
      '感染症の症状がある場合は利用できません。病児保育の活用を検討してください。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 病児・病後児保育
// ============================================================
interface ByojiHoikuParams {
  dailyFee?: string;
  ageRangeLabel?: string;
}
export function buildByojiHoiku(wardName: string, p: ByojiHoikuParams = {}): BenefitDetail {
  const fee = p.dailyFee ?? '1日2,000〜3,000円';
  const ageRange = p.ageRangeLabel ?? '0〜8歳';
  return {
    overview: `発熱・体調不良などで保育所や学校を利用できない場合に、${wardName}内提携の病児保育室が子どもを預かる制度です。事前登録が必要で、看護師・保育士が常駐し、医師の連携体制も整っています。`,
    amountDetail: [
      `自己負担：${fee}`,
      `対象年齢：${ageRange}`,
      '看護師・保育士が常駐',
      '事前登録が必要',
    ],
    whoDetail: `${wardName}在住で、${ageRange}の子。発熱・感染症・体調不良などで通常の保育を利用できない状態にある。`,
    deadlineDetail: '通年（事前登録が必要）。当日朝の予約が一般的。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんは対象年齢に該当しますか？',
        options: [
          { value: 'yes', label: ageRange, eligible: true },
          { value: 'no', label: '対象年齢外', eligible: false },
        ],
      },
      {
        id: 'registered',
        question: '事前登録は済んでいますか？',
        note: '健康時に事前登録を済ませておくのがおすすめです',
        options: [
          { value: 'yes', label: '登録済み', eligible: true },
          { value: 'no', label: 'まだ（要登録）', eligible: true },
        ],
      },
    ],
    steps: [
      {
        title: '健康時に事前登録',
        desc: `${wardName}内の病児保育室に事前登録しておきます。複数施設の登録も可能。`,
        documents: ['事前登録申請書', '母子健康手帳', '保険証', '医療証'],
      },
      { title: '受診し医師に「病児保育利用連絡票」を記入してもらう', desc: '当日または前日に医師の診察を受けます。' },
      { title: '病児保育室に予約', desc: '空き状況を確認のうえ予約。当日朝の連絡が必要なことが多いです。' },
      {
        title: '利用日に持ち物を持参',
        desc: '保険証・医療証・連絡票・薬・着替えなどを持参して登所します。',
      },
      { title: '利用後に料金を支払い', desc: '利用時間に応じた料金を施設で精算します。' },
    ],
    notes: [
      '感染症の種類によっては受け入れ不可となる場合があります（はしか・水痘など）。',
      '空き状況は朝の電話確認が必要なことが多いです。',
      '初回利用前の事前登録が必須です。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 出産・子育て応援給付金（区独自）
// ============================================================
interface ShussanKyufuParams {
  totalAmount?: string;
  splitDesc?: string;
  applyWindow?: string;
}
export function buildShussanKyufu(wardName: string, p: ShussanKyufuParams = {}): BenefitDetail {
  const total = p.totalAmount ?? '計10万円';
  const split = p.splitDesc ?? '妊娠届出時5万円＋乳児健診時5万円';
  const applyWindow = p.applyWindow ?? '出産後1年以内';
  return {
    overview: `${wardName}に住民登録がある方を対象に、出産・子育てに関する経済的支援として${total}を給付する区独自の制度です（${split}）。国の出産・子育て応援交付金（B2）との関係は区窓口で要確認。`,
    amountDetail: [
      `総額：${total}`,
      `内訳：${split}`,
      `${wardName}に住民登録がある方が対象`,
      '所得制限なし（区により異なる場合あり）',
    ],
    whoDetail: `${wardName}に住民登録がある妊婦・産婦と、その子。妊娠届出時・出生届出時・乳児健診時など、各タイミングで段階的に給付されることが多いです。`,
    deadlineDetail: applyWindow + 'に区へ申請。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'stage',
        question: '現在の状況は？',
        options: [
          { value: 'pregnant', label: '妊娠中（妊娠届出済み）', eligible: true },
          { value: 'after_birth', label: '出産後（1年以内）', eligible: true },
          { value: 'over', label: '出産から1年以上経過', eligible: false },
        ],
      },
      {
        id: 'interview',
        question: '区の妊婦面談・乳児面談は受けましたか／受ける予定ですか？',
        note: '面談実施が給付条件になっていることが多いです',
        options: [
          { value: 'yes', label: 'はい（受けた／受ける）', eligible: true },
          { value: 'no', label: 'いいえ（受ける予定なし）', eligible: false },
        ],
      },
    ],
    steps: [
      {
        title: '妊娠届出時の面談で第1回給付の案内',
        desc: `${wardName}保健所での妊婦面談時に申請書が渡されます。`,
        documents: ['妊娠届出書', '母子健康手帳交付申請書', '本人確認書類'],
      },
      { title: '面談後、第1回給付金の振込', desc: '面談・申請から1〜2か月で指定口座に振り込まれます。' },
      {
        title: '出生後の乳児面談・健診時に第2回給付の案内',
        desc: '生後4か月健診や面談のタイミングで第2回の給付申請ができます。',
        documents: ['給付金申請書', '母子健康手帳', '振込先口座が分かるもの'],
      },
      { title: '面談・申請後、第2回給付金の振込', desc: '審査後に振り込まれます。' },
    ],
    notes: [
      '国の出産・子育て応援交付金（B2、計10万円）と同じ枠組みで運用されている区も多く、二重支給ではなく一体で運用される場合があります。区窓口で要確認。',
      '面談を受けないと給付対象外となる場合があります。',
      '転入・転出のタイミングによって給付対象が変わります。',
      wardDisclaimer(wardName),
    ],
  };
}

// ============================================================
// 子育てひろば（無料利用施設）
// ============================================================
export function buildHiroba(wardName: string, serviceName?: string): BenefitDetail {
  const name = serviceName ?? '子育てひろば';
  return {
    overview: `${wardName}内の${name}で、就学前の子どもと保護者が無料で利用できる交流・遊び場です。育児相談員が常駐し、リトミックや絵本読み聞かせなどのイベントも定期的に開催されています。`,
    amountDetail: [
      '利用料：無料',
      `対象：${wardName}在住の就学前の子と保護者`,
      '育児相談員が常駐',
      '事前登録の必要は区により異なる',
    ],
    whoDetail: `${wardName}在住の就学前（0〜6歳）の子どもとその保護者。`,
    deadlineDetail: '通年。月〜土の開放が一般的（区によって異なる）。',
    eligibilityQuestions: [
      residenceQ(wardName),
      {
        id: 'age',
        question: 'お子さんは就学前ですか？',
        options: [
          { value: 'yes', label: 'はい（0〜6歳）', eligible: true },
          { value: 'no', label: '小学生以上', eligible: false },
        ],
      },
    ],
    steps: [
      { title: `${wardName}の${name}を確認`, desc: '区のWebサイトで開設場所・時間・イベント予定を確認します。' },
      { title: '気軽に訪問', desc: '基本的に予約不要で利用できます（イベントは予約制の場合あり）。' },
      { title: '育児相談・イベント参加', desc: '常駐スタッフに育児の悩みを相談できます。' },
    ],
    notes: [
      '感染症の症状がある場合は利用を控えてください。',
      `${name}は地域の交流の場としても機能しています。`,
      wardDisclaimer(wardName),
    ],
  };
}
