export default function IntroSection() {
  return (
    <div>
      <h2 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border">
        このサービスでわかること
      </h2>
      <div className="grid grid-cols-3 gap-px bg-border border border-border rounded overflow-hidden mb-9">
        <div className="bg-white p-[22px]">
          <div className="text-[11px] font-bold tracking-widest mb-2 text-pink">
            不妊治療・妊活
          </div>
          <h3 className="text-[15px] font-bold mb-1.5">不妊治療の補助金</h3>
          <p className="text-[13px] text-sub leading-relaxed">
            保険適用・都の助成・男性不妊支援など、治療費を軽減できる制度を一覧できます。
          </p>
        </div>
        <div className="bg-white p-[22px]">
          <div className="text-[11px] font-bold tracking-widest mb-2 text-purple">
            妊娠〜出産
          </div>
          <h3 className="text-[15px] font-bold mb-1.5">妊娠中・出産時の給付</h3>
          <p className="text-[13px] text-sub leading-relaxed">
            妊婦健診公費負担・出産一時金50万円・応援交付金10万円など、妊娠届から出生届まで受けられる給付を確認できます。
          </p>
        </div>
        <div className="bg-white p-[22px]">
          <div className="text-[11px] font-bold tracking-widest mb-2 text-tag-blue-text">
            育児期
          </div>
          <h3 className="text-[15px] font-bold mb-1.5">育児の補助金（区別）</h3>
          <p className="text-[13px] text-sub leading-relaxed">
            ベビーシッター補助・認可外保育補助・産後ヘルパーなど、お住まいの区・都・国の育児支援制度を一覧できます。
          </p>
        </div>
      </div>

      <h2 className="text-base font-bold mb-3.5 pb-2.5 border-b border-border mt-8">
        ご利用の流れ
      </h2>
      <div className="border border-border rounded overflow-hidden">
        <div className="bg-bg2 border-b border-border px-5 py-3 text-sm font-bold">
          使い方（4ステップ）
        </div>
        <div className="grid grid-cols-4 gap-px bg-border">
          {[
            { n: 1, title: 'ライフステージを選択', desc: '妊活〜育児から該当するステージを選びます' },
            { n: 2, title: '制度一覧を確認', desc: '該当ステージの国・都・区の制度が一覧表示されます' },
            { n: 3, title: '条件・金額を確認', desc: '締切バッジで申請時期を把握できます' },
            { n: 4, title: '公式サイトへ', desc: '「詳細・申請」で各機関の公式ページへ' },
          ].map((step) => (
            <div key={step.n} className="bg-white p-[18px] flex gap-3 items-start">
              <div className="w-[26px] h-[26px] bg-blue text-white rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {step.n}
              </div>
              <div>
                <h4 className="text-[13px] font-bold mb-1">{step.title}</h4>
                <p className="text-[12px] text-sub leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
