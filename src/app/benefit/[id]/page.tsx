import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import EligibilityChecker from '@/components/EligibilityChecker';
import {
  NATIONAL,
  METRO,
  FERTILITY,
  PREGNANCY,
  BIRTH,
  WARD,
} from '@/data';
import { TIER_LABELS, CAT_LABELS, type Benefit } from '@/data/types';
import { BENEFIT_DETAILS } from '@/data/benefitDetails';

function findBenefit(id: string): Benefit | undefined {
  const all: Benefit[] = [
    ...NATIONAL,
    ...METRO,
    ...FERTILITY,
    ...PREGNANCY,
    ...BIRTH,
    ...Object.values(WARD).flat(),
  ];
  return all.find((b) => b.id === id);
}

function tierBadgeClass(tier: string) {
  switch (tier) {
    case 'ward':
      return 'bg-tag-blue-bg text-tag-blue-text';
    case 'metro':
      return 'bg-tag-green-bg text-tag-green-text';
    case 'national':
      return 'bg-tag-orange-bg text-tag-orange-text';
    default:
      return 'bg-bg2 text-sub';
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const benefit = findBenefit(id);
  if (!benefit) return {};
  return {
    title: `${benefit.title} の詳細・申請ガイド | 東京 妊活・出産・育児 支援ガイド`,
    description: benefit.desc,
  };
}

export default async function BenefitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benefit = findBenefit(id);
  const detail = BENEFIT_DETAILS[id];

  if (!benefit || !detail) notFound();

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="bg-bg2 border-b border-border-light py-2.5 px-6">
        <div className="max-w-[860px] mx-auto text-[12px] text-mute">
          <Link href="/" className="text-sub hover:text-text no-underline">
            補助金を探す
          </Link>
          <span className="mx-1.5">›</span>
          <span>{benefit.title}</span>
        </div>
      </div>

      {/* Hero */}
      <header className="bg-white border-b border-border py-10 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={`text-[11px] font-bold px-[7px] py-0.5 rounded-sm tracking-wider ${tierBadgeClass(benefit.tier)}`}
            >
              {TIER_LABELS[benefit.tier]}
            </span>
            {benefit.cat.map((c) => (
              <span
                key={c}
                className="text-[11px] text-mute bg-bg2 border border-border px-[7px] py-0.5 rounded-sm"
              >
                {CAT_LABELS[c]}
              </span>
            ))}
          </div>
          <h1 className="text-[28px] font-bold leading-tight mb-3 tracking-tight">
            {benefit.title}
          </h1>
          <div className="flex items-baseline gap-3 mb-5 flex-wrap">
            <span className="text-[32px] font-bold text-blue leading-none">
              {benefit.amount}
            </span>
            <span className="text-[14px] text-sub">{benefit.as}</span>
          </div>
          <p className="text-[15px] text-sub leading-relaxed">
            {detail.overview}
          </p>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-6 py-10 space-y-12">
        {/* Section 1: Basic info */}
        <section aria-labelledby="info-heading">
          <h2 id="info-heading" className="text-[20px] font-bold mb-4">
            基本情報
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="text-[12px] text-mute mb-1.5 font-bold">
                支給金額
              </div>
              <ul className="text-[13px] text-text space-y-1 leading-relaxed">
                {detail.amountDetail.map((line, i) => (
                  <li key={i}>・{line}</li>
                ))}
              </ul>
            </div>
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="text-[12px] text-mute mb-1.5 font-bold">
                対象者
              </div>
              <p className="text-[13px] text-text leading-relaxed">
                {detail.whoDetail}
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="text-[12px] text-mute mb-1.5 font-bold">
                申請期限
              </div>
              <p className="text-[13px] text-text leading-relaxed">
                {detail.deadlineDetail}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Eligibility check */}
        <section aria-labelledby="check-heading">
          <h2 id="check-heading" className="text-[20px] font-bold mb-2">
            あなたが対象か確認する
          </h2>
          <p className="text-[14px] text-sub mb-5 leading-relaxed">
            以下の質問に回答すると、対象になる可能性を判定します。
          </p>
          <EligibilityChecker questions={detail.eligibilityQuestions} />
        </section>

        {/* Section 3: Steps */}
        <section aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-[20px] font-bold mb-4">
            申請の流れ
          </h2>
          <ol className="space-y-3">
            {detail.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 bg-white border border-border rounded-lg p-5"
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-full bg-blue text-white font-bold flex items-center justify-center text-[14px]"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold mb-1.5">
                    {step.title}
                  </div>
                  <p className="text-[13px] text-sub leading-relaxed">
                    {step.desc}
                  </p>
                  {step.documents && (
                    <div className="mt-3 bg-bg2 rounded-md p-3">
                      <div className="text-[12px] font-bold text-sub mb-1">
                        必要書類
                      </div>
                      <ul className="text-[12px] text-sub space-y-0.5 leading-relaxed">
                        {step.documents.map((doc, j) => (
                          <li key={j}>・{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 4: Notes */}
        {detail.notes && detail.notes.length > 0 && (
          <section aria-labelledby="notes-heading">
            <h2 id="notes-heading" className="text-[20px] font-bold mb-4">
              補足・注意事項
            </h2>
            <ul className="bg-notice-bg border border-notice-border/30 rounded-lg p-5 text-[13px] text-text space-y-2 leading-relaxed">
              {detail.notes.map((note, i) => (
                <li key={i}>・{note}</li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA: Official page */}
        <section>
          <div className="bg-blue-light border border-blue/20 rounded-lg p-7 text-center">
            <h2 className="text-[16px] font-bold mb-2">公式ページで申請する</h2>
            <p className="text-[13px] text-sub mb-5 leading-relaxed">
              申請は加入している健康保険（協会けんぽ／健康保険組合／国民健康保険）
              <br className="hidden sm:inline" />
              または公式ページから行います。
            </p>
            <a
              href={benefit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue text-white font-bold px-7 py-3 rounded-md text-[14px] hover:bg-blue-hover transition-colors no-underline"
            >
              厚生労働省 公式ページへ →
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-[11px] text-mute text-center leading-relaxed">
          本サービスは行政機関ではありません。掲載情報は2025年4月時点の公開情報に基づいています。
          <br />
          正確な条件・金額は公式ページでご確認ください。
        </p>
      </main>

      <footer className="border-t border-border bg-bg2 py-6 px-6 text-center mt-10">
        <Link
          href="/"
          className="text-[13px] text-blue no-underline hover:underline"
        >
          ← 補助金一覧に戻る
        </Link>
      </footer>
    </>
  );
}
