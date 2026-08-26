// Page: 투자상품 상세 + 투자 모달

function PageProductDetail({ withModal = false }) {
  const p = PRODUCTS[0];
  const months = Array.from({ length: p.term }, (_, i) => i + 1);

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, position: 'relative', paddingBottom: 80 }}>
      <AppNav active="투자상품" />

      <div style={{ padding: '32px 56px 16px' }}>
        <div style={{ fontSize: 12, color: T.ink2 }}>투자상품 / 부동산 담보 / 24-11호</div>
      </div>

      <div style={{ padding: '0 56px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: T.gap, alignItems: 'start' }}>
        {/* Left main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
          {/* Header card */}
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Tag>{p.tag}</Tag>
              <Tag tone="green">선순위 담보</Tag>
              <Tag>D-3</Tag>
            </div>
            <div style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.2 }}>{p.title}</div>
            <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.65, marginTop: 14, maxWidth: 700 }}>
              강남구 역삼동 소재 오피스텔(연면적 1,420㎡)을 담보로 하는 선순위 대출 상품입니다.
              차주는 임대업을 영위하는 법인이며, 임대 수익으로 원리금 상환이 이루어집니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 32, paddingTop: 28, borderTop: `1px solid ${T.line}` }}>
              {[
                ['목표 수익률', `${p.rate}%`, true],
                ['투자 기간', `${p.term}개월`],
                ['모집 금액', `${(p.total / 100_000_000).toFixed(1)}억원`],
                ['신용 등급', p.grade],
              ].map(([k, v, accent]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: T.ink2 }}>{k}</div>
                  <div style={{ fontFamily: T.fDisp, fontSize: 32, fontWeight: 600, letterSpacing: -1, color: accent ? T.green : T.ink, marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: T.ink2 }}>모집 진행률</span>
                <span style={{ fontWeight: 600 }}>{pct(p.raised)} · 1,847명 참여 · 잔여 {fmtKRW(Math.round(p.total * (1 - p.raised)))}원</span>
              </div>
              <div style={{ height: 10, borderRadius: T.rPill, background: T.bg, overflow: 'hidden' }}>
                <div style={{ width: pct(p.raised), height: '100%', background: T.ink }}></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 0 }}>
            <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.line}`, padding: '0 32px' }}>
              {['개요', '위험 분석', '상환 계획', '투자자 현황'].map((t, i) => (
                <div key={t} style={{ padding: '20px 16px', fontSize: 14, fontWeight: 600, color: i === 0 ? T.ink : T.ink2, borderBottom: i === 0 ? `2px solid ${T.ink}` : '2px solid transparent', marginBottom: -1, cursor: 'pointer' }}>{t}</div>
              ))}
            </div>

            <div style={{ padding: 32 }}>
              <SubTitle>대출 목적</SubTitle>
              <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.7 }}>
                기존 1금융권 대출의 만기 도래에 따른 리파이낸싱 자금. 차주사는 동일 자산을 담보로 7년간 정상 상환을 이어왔습니다.
              </p>

              <SubTitle>차주 정보</SubTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 12 }}>
                {[
                  ['업종', '부동산 임대업'],
                  ['설립연도', '2014년 (12년차)'],
                  ['연 매출', '8.4억원 (직전 연도)'],
                  ['신용등급', 'NICE 기업신용 BBB+'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${T.line}`, fontSize: 13 }}>
                    <span style={{ color: T.ink2 }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <SubTitle>담보 정보</SubTitle>
              <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: 20, marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  ['감정평가액', '22.0억원'],
                  ['선순위 채권', '8.5억원'],
                  ['LTV', '58%', true],
                ].map(([k, v, ac]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, color: T.ink2 }}>{k}</div>
                    <div style={{ fontFamily: T.fDisp, fontSize: 24, fontWeight: 600, marginTop: 4, color: ac ? T.green : T.ink }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Repayment schedule preview */}
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>월별 예상 원리금 (100만원 투자 기준)</div>
              <span style={{ fontSize: 12, color: T.ink2 }}>매월 25일 입금</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4, alignItems: 'end', height: 120 }}>
              {months.map(m => (
                <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', height: m === 12 ? 110 : 24 + (m * 1.4), background: m === 12 ? T.green : T.ink, borderRadius: 4 }}></div>
                  <div style={{ fontSize: 10, color: T.ink3 }}>{m}M</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 12, color: T.ink2 }}>
              <span>■ 매월 이자 (약 7,830원)</span>
              <span style={{ color: T.green }}>■ 만기 원금 + 마지막 이자</span>
            </div>
          </div>
        </div>

        {/* Right sticky CTA */}
        <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: T.gap }}>
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
            <div style={{ fontSize: 12, color: T.ink2 }}>예상 수익 (100만원 기준)</div>
            <div style={{ fontFamily: T.fDisp, fontSize: 40, fontWeight: 600, color: T.green, letterSpacing: -1.5, marginTop: 6 }}>+93,938<span style={{ fontSize: 16, color: T.ink2, marginLeft: 4 }}>원</span></div>
            <div style={{ fontSize: 11, color: T.ink3, marginTop: 4 }}>세전 · {p.term}개월 만기 기준</div>

            <div style={{ height: 1, background: T.line, margin: '20px 0' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <Row k="목표 수익률" v={`${p.rate}%`} />
              <Row k="투자 기간" v={`${p.term}개월`} />
              <Row k="상환 방식" v="만기일시" />
              <Row k="이자 지급" v="매월" />
              <Row k="중도상환 수수료" v="없음" />
            </div>

            <Btn size="lg" style={{ width: '100%', marginTop: 20 }}>지금 투자하기 →</Btn>
            <div style={{ fontSize: 11, color: T.ink3, textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
              원금 손실 가능 상품입니다.<br />상품설명서·위험고지서 확인 필수
            </div>
          </div>

          <div style={{ background: T.greenSoft, borderRadius: T.rLg, padding: 20, fontSize: 12, color: T.green, lineHeight: 1.65 }}>
            ✓ 7년간 동일 차주 정상 상환 이력<br />
            ✓ LTV 58%로 안정적 담보비율<br />
            ✓ 임대 수익 기반 원리금 상환
          </div>
        </div>
      </div>

      {/* Investment Modal Overlay */}
      {withModal && <InvestModal p={p} />}
    </div>
  );
}

function SubTitle({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{children}</div>;
}
function Row({ k, v }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: T.ink2 }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>;
}

function InvestModal({ p }) {
  const amount = 1_000_000;
  const interest = Math.round(amount * (p.rate / 100) * (p.term / 12));
  const tax = Math.round(interest * 0.154);
  const net = interest - tax;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(22,20,15,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ width: 480, background: T.card, borderRadius: T.rXl, padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: T.ink2 }}>투자 실행</span>
          <span style={{ fontSize: 18, color: T.ink2 }}>×</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.35, marginBottom: 24 }}>{p.title}</div>

        <div style={{ fontSize: 12, color: T.ink2, marginBottom: 8 }}>투자 금액</div>
        <div style={{ background: T.bgSoft, borderRadius: T.rMd, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
            <span style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2 }}>1,000,000</span>
            <span style={{ fontSize: 16, color: T.ink2 }}>원</span>
          </div>
          <div style={{ height: 4, background: T.card, borderRadius: T.rPill, overflow: 'hidden', marginTop: 14 }}>
            <div style={{ width: '20%', height: '100%', background: T.ink }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink2, marginTop: 8 }}>
            <span>1만원</span><span>최대 500만원 (모집액 5%)</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            {['+10만', '+50만', '+100만', '최대'].map(b => (
              <span key={b} style={{ padding: '6px 12px', background: T.card, borderRadius: T.rPill, fontSize: 12, fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
          <Row k="예치금 잔액" v="4,280,000원" />
          <Row k="투자 후 잔액" v="3,280,000원" />
          <div style={{ height: 1, background: T.line, margin: '4px 0' }}></div>
          <Row k="예상 이자 (세전)" v={`+${interest.toLocaleString()}원`} />
          <Row k="원천징수 (15.4%)" v={`−${tax.toLocaleString()}원`} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, paddingTop: 8 }}>
            <span style={{ fontWeight: 600 }}>예상 실수령 이자</span>
            <span style={{ fontFamily: T.fDisp, fontWeight: 600, color: T.green, fontSize: 18 }}>+{net.toLocaleString()}원</span>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 20, fontSize: 12, color: T.ink2, lineHeight: 1.6 }}>
          <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
          <span>상품설명서 · 위험고지서를 확인하였으며, 원금 손실의 가능성이 있는 상품임을 이해하였습니다.</span>
        </label>

        <Btn size="lg" style={{ width: '100%', marginTop: 20 }}>1,000,000원 투자 확정</Btn>
      </div>
    </div>
  );
}

window.PageProductDetail = PageProductDetail;
