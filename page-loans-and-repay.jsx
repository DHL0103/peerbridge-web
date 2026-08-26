// Page: 내 대출 현황 + 상환하기

function PageMyLoans() {
  const inProgress = [
    { name: '강남 역삼 오피스텔 리파이낸싱', remain: 215_000_000, total: 300_000_000, next: '11.25', nextAmt: 2_350_000, progress: 0.28, rate: 9.4 },
    { name: '용산 상가 운영자금', remain: 80_000_000, total: 100_000_000, next: '12.05', nextAmt: 670_000, progress: 0.20, rate: 8.7 },
  ];
  const reviewing = [
    { name: '판교 오피스 시설자금 신청', amount: '5억원', state: '심사중', date: '11.15 신청' },
    { name: '광교 오피스텔 리파이낸싱', amount: '3.2억원', state: '승인', date: '11.12 승인' },
    { name: '서초 상가 운영자금', amount: '1.5억원', state: '반려', date: '11.08 반려' },
  ];

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav active="대출 신청" />
      <div style={{ padding: '32px 56px 24px' }}>
        <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 내 대출</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>내 대출 현황</h1>
          <Btn>새 대출 신청 →</Btn>
        </div>

        {/* summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: T.gap, marginTop: 24 }}>
          <DashStat k="진행중 대출" v="2" unit="건" sub="총 잔여 295,000,000원" />
          <DashStat k="이번 달 상환 예정" v="3,020,000" unit="원" sub="11.25 + 12.05" />
          <DashStat k="평균 금리" v="9.1" unit="%" sub="가중 평균" accent />
          <DashStat k="신용 점수" v="847" unit="점" sub="NICE 1등급" />
        </div>

        {/* in-progress loans */}
        <div style={{ marginTop: 32, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>진행중인 대출</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
          {inProgress.map((l, i) => (
            <div key={i} style={{ background: T.card, borderRadius: T.rLg, padding: 32, display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 200px', gap: 28, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  <Tag tone="green">정상</Tag>
                  <Tag>연 {l.rate}%</Tag>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>{l.name}</div>
                <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>다음 상환 {l.next} · {l.nextAmt.toLocaleString()}원</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.ink2 }}>잔여 원금</div>
                <div style={{ fontFamily: T.fDisp, fontSize: 22, fontWeight: 600, marginTop: 4 }}>{(l.remain / 100_000_000).toFixed(2)}억</div>
                <div style={{ fontSize: 11, color: T.ink3, marginTop: 2 }}>총 {(l.total / 100_000_000).toFixed(1)}억 중</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.ink2, marginBottom: 6 }}>상환 진행률 {pct(l.progress)}</div>
                <div style={{ height: 6, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                  <div style={{ width: pct(l.progress), height: '100%', background: T.ink }}></div>
                </div>
                <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>잔여 {Math.round((1 - l.progress) * 12)}개월</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Btn size="sm">상환하기</Btn>
                <Btn size="sm" variant="secondary">상세</Btn>
              </div>
            </div>
          ))}
        </div>

        {/* review status */}
        <div style={{ marginTop: 40, fontSize: 18, fontWeight: 600, letterSpacing: -0.4, marginBottom: 16 }}>심사 신청 현황</div>
        <div style={{ background: T.card, borderRadius: T.rLg, padding: 0 }}>
          {reviewing.map((r, i) => {
            const tone = r.state === '승인' ? 'green' : r.state === '심사중' ? 'neutral' : 'neutral';
            return (
              <div key={i} style={{ padding: '20px 32px', borderBottom: i < reviewing.length - 1 ? `1px solid ${T.line}` : 'none', display: 'grid', gridTemplateColumns: '1fr 140px 120px 100px', gap: 24, alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontFamily: T.fDisp, fontWeight: 600 }}>{r.amount}</div>
                <Tag tone={tone}>{r.state}</Tag>
                <div style={{ fontSize: 12, color: T.ink2, textAlign: 'right' }}>{r.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 상환하기 페이지 ───
function PageRepay() {
  const principal = 215_000_000;
  const monthlyInt = 1_685_000;
  const total = principal + monthlyInt;

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80 }}>
      <AppNav active="대출 신청" />
      <div style={{ padding: '32px 56px 16px' }}>
        <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>대출 / 내 대출 / 상환</div>
        <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>상환하기</h1>
      </div>

      <div style={{ padding: '24px 56px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: T.gap }}>
        {/* main */}
        <div style={{ background: T.card, borderRadius: T.rLg, padding: 40 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <Tag>강남 역삼 오피스텔 리파이낸싱</Tag>
            <Tag tone="green">정상</Tag>
          </div>

          <div style={{ fontSize: 12, color: T.ink2, marginBottom: 4 }}>11월 상환 예정 금액</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: T.fDisp, fontSize: 64, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1 }}>2,350,000</span>
            <span style={{ fontSize: 22, color: T.ink2 }}>원</span>
          </div>
          <div style={{ fontSize: 12, color: T.ink3, marginTop: 6 }}>매월 25일 자동 출금 · 영업일 +1일 이내</div>

          {/* type select */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 12, color: T.ink2, marginBottom: 10 }}>상환 방식 선택</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: 20, background: T.ink, color: T.card, borderRadius: T.rMd }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>정기 상환</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 6, lineHeight: 1.5 }}>이번 달 이자만 납부 (잔여 12회)</div>
                <div style={{ fontFamily: T.fDisp, fontSize: 22, fontWeight: 600, marginTop: 12 }}>2,350,000원</div>
              </div>
              <div style={{ padding: 20, background: T.bgSoft, borderRadius: T.rMd, border: `1px solid ${T.line}` }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>일시 상환 (전액)</div>
                <div style={{ fontSize: 11, color: T.ink2, marginTop: 6, lineHeight: 1.5 }}>잔여 원금 + 11월 이자 한번에</div>
                <div style={{ fontFamily: T.fDisp, fontSize: 22, fontWeight: 600, marginTop: 12 }}>{(total / 100_000_000).toFixed(2)}억원</div>
                <div style={{ fontSize: 10, color: T.ink3, marginTop: 4 }}>중도상환 수수료 없음</div>
              </div>
            </div>
          </div>

          {/* breakdown */}
          <div style={{ marginTop: 32, padding: 24, background: T.bgSoft, borderRadius: T.rMd }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>상환 내역</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <RowL k="원금" v="—" muted />
              <RowL k="이자 (연 9.4% × 30일)" v="1,685,000원" />
              <RowL k="플랫폼 수수료 (이자의 3%)" v="50,550원" muted />
              <RowL k="원천세 (15.4%)" v="259,490원" muted />
              <div style={{ height: 1, background: T.line, margin: '4px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>출금 예정 합계</span>
                <span style={{ fontFamily: T.fDisp, fontWeight: 600, fontSize: 18 }}>2,350,000원</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <Btn size="lg" style={{ flex: 1 }}>2,350,000원 지금 상환</Btn>
            <Btn size="lg" variant="secondary">자동 출금 변경</Btn>
          </div>
        </div>

        {/* right side - status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>상환 후 잔여</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
              <RowL k="현재 잔여 원금" v="215,000,000원" />
              <RowL k="이번 상환 후 원금" v="215,000,000원" />
              <RowL k="잔여 회차" v="12 → 11회" />
              <RowL k="만기일" v="2027.10.25" />
            </div>
          </div>

          <div style={{ background: T.card, borderRadius: T.rLg, padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>출금 계좌</div>
            <div style={{ padding: 16, background: T.bgSoft, borderRadius: T.rMd, fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}>KB국민은행</div>
              <div style={{ color: T.ink2, marginTop: 4, fontFamily: T.fDisp }}>****-**-**-1234</div>
              <div style={{ fontSize: 11, color: T.ink3, marginTop: 6 }}>잔액 충분 · 자동 출금 등록됨</div>
            </div>
          </div>

          <div style={{ background: T.greenSoft, color: T.green, borderRadius: T.rLg, padding: 20, fontSize: 12, lineHeight: 1.65 }}>
            ✓ 12개월 연속 정상 상환 중<br />
            ✓ 다음 대출 시 우대 금리 −0.3%<br />
            ✓ 신용 점수 +12 (이번 상환 후)
          </div>
        </div>
      </div>
    </div>
  );
}

function RowL({ k, v, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: T.ink2 }}>{k}</span>
      <span style={{ fontFamily: T.fDisp, fontWeight: 500, color: muted ? T.ink2 : T.ink }}>{v}</span>
    </div>
  );
}

Object.assign(window, { PageMyLoans, PageRepay });
