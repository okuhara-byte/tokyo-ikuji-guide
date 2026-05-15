'use client';

import { useState } from 'react';
import type { EligibilityQuestion } from '@/data/benefitDetails';

interface Props {
  questions: EligibilityQuestion[];
}

export default function EligibilityChecker({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const allAnswered = questions.every((q) => answers[q.id]);
  const ineligibleQuestions = questions.filter((q) => {
    const a = answers[q.id];
    if (!a) return false;
    const opt = q.options.find((o) => o.value === a);
    return opt && !opt.eligible;
  });

  const result: 'pending' | 'eligible' | 'ineligible' = !allAnswered
    ? 'pending'
    : ineligibleQuestions.length > 0
      ? 'ineligible'
      : 'eligible';

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleReset = () => setAnswers({});

  return (
    <div>
      <ol className="space-y-4">
        {questions.map((q, i) => (
          <li
            key={q.id}
            className="bg-white border border-border rounded-lg p-5"
          >
            <div className="text-[15px] font-bold mb-1 text-text">
              <span className="text-blue mr-2">Q{i + 1}.</span>
              {q.question}
            </div>
            {q.note && (
              <div className="text-[12px] text-mute mb-3 leading-relaxed">
                {q.note}
              </div>
            )}
            <div className="flex flex-col gap-2 mt-3">
              {q.options.map((opt) => {
                const checked = answers[q.id] === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 px-3.5 py-2.5 border rounded-md cursor-pointer transition-colors text-[14px] ${
                      checked
                        ? 'border-blue bg-blue-light'
                        : 'border-border bg-white hover:bg-bg2'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={checked}
                      onChange={() => handleSelect(q.id, opt.value)}
                      className="accent-blue"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        {result === 'pending' && (
          <div
            className="border border-border bg-bg2 rounded-lg p-4 text-sm text-sub text-center"
            role="status"
          >
            すべての質問に回答すると、判定結果が表示されます。
          </div>
        )}
        {result === 'eligible' && (
          <div
            className="border border-ok-border bg-ok-bg rounded-lg p-5"
            role="status"
            aria-live="polite"
          >
            <div className="font-bold text-ok-border mb-1.5 text-[15px]">
              ✓ 対象になる可能性が高いです
            </div>
            <p className="text-sm text-text leading-relaxed">
              ご回答内容では、支給対象に該当する可能性が高いです。下の「申請の流れ」を確認し、加入している健康保険に申請してください。
            </p>
          </div>
        )}
        {result === 'ineligible' && (
          <div
            className="border border-warn-border bg-warn-bg rounded-lg p-5"
            role="status"
            aria-live="polite"
          >
            <div className="font-bold text-warn-border mb-1.5 text-[15px]">
              ! 対象外の可能性があります
            </div>
            <p className="text-sm text-text mb-2 leading-relaxed">
              以下の項目で対象外の条件に該当しています。
            </p>
            <ul className="list-disc list-inside text-sm text-text space-y-1">
              {ineligibleQuestions.map((q) => (
                <li key={q.id}>{q.question}</li>
              ))}
            </ul>
            <p className="text-xs text-mute mt-3 leading-relaxed">
              特殊なケース（資格喪失後の継続給付など）もあるため、詳細は加入している健康保険または公式ページでご確認ください。
            </p>
          </div>
        )}
      </div>

      {Object.keys(answers).length > 0 && (
        <div className="mt-3 text-right">
          <button
            type="button"
            onClick={handleReset}
            className="text-[13px] text-sub underline hover:text-text"
          >
            回答をリセット
          </button>
        </div>
      )}
    </div>
  );
}
