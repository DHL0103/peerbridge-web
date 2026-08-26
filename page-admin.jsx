// Page: 관리자 대시보드 (내부 운영 도구)
// 데이터 밀도 높은 운영 화면. 디자인 토큰은 유지하지만 카드 더 작고 정보 밀집.

function PageAdmin() {
  const reviewQueue = [
    { id: 'L-2026-1142', title: '강남 역삼 오피스텔 후순위', amt: '8.5억', ltv: '68%', grade: 'B+', days: 2, score: 78 },
    { id: 'L-2026-1141', title: '용산 상가 운영자금', amt: '1.2억', ltv: '—', grade: 'B', days: 1, score: 71 },
    { id: 'L-2026-1140', title: '판교 오피스 시설자금', amt: '5.0억', ltv: '54%', grade: 'A−', days: 3, score: 84 },
    { id: 'L-2026-1139', title: '광교 오피스텔 리파이낸싱', amt: '3.2억', ltv: '61%', grade: 'A−', days: 4, score: 82 },
    { id: 'L-2026-1138', title: '삼성동 매출채권 (B2B)', amt: '5,500만', ltv: '—', grade: 'B+', days: 1, score: 76 },
  ];
  const products = [
    { id: 'P-2026-0287', t: '강남 신논현 오피스 후순위', funded: 0.86, target: '12억', rate: '8.4%', remain: '4시간' },
    { id: 'P-2026-0286', t: '서울숲 의류 매출채권', funded: 0.42, target: '5,000만', rate: '11.2%', remain: '2일' },
    { id: 'P-2026-0285', t: '판교 데이터센터 PF 후순위', funded: 0.68, target: '40억', rate: '9.8%', remain: '6일' },
  ];

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80, minHeight: 1200 }}>
      {/* Admin top bar - distinguish from user */}
      <div style={{ padding: '12px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.ink, color: T.card, fontSize: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontWeight: 700 }}>peerbridge ADMIN</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>/ 운영자: 박지훈 (CTO)</span>
        </div>
        <div style={{ display: 'flex', gap: 16, color: 'rgba(255,255,255,0.7)' }}>
          <span>● PROD</span><span>2026.11.18 14:32</span><span>알림 12</span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <Sidebar active="대시보드" group="admin" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>운영 / 대시보드</div>
              <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>오늘의 운영 현황</h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="secondary" size="sm">CSV 내보내기</Btn>
              <Btn size="sm">주간 보고서 →</Btn>
            </div>
          </div>

          {/* Top KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {[
              ['신규 회원', '+47', '오늘'],
              ['진행 중 상품', '14', '총 87억'],
              ['심사 대기', '5', '평균 2.1일'],
              ['오늘 모집액', '8.4억', '+18% vs 어제'],
              ['연체 발생', '0', '7일째 무사고'],
              ['부실률', '0.8%', '−0.1%p MoM'],
            ].map(([k, v, sub], i) => (
              <div key={k} style={{ background: T.card, borderRadius: T.rMd, padding: 18 }}>
                <div style={{ fontSize: 11, color: T.ink2 }}>{k}</div>
                <div style={{ fontFamily: T.fDisp, fontSize: 26, fontWeight: 600, letterSpacing: -0.5, marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: 10, color: T.ink3, marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Two-column area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: T.gap, marginTop: T.gap }}>
            {/* Review queue */}
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>심사 대기 큐 <span style={{ color: T.ink3, fontWeight: 400, fontSize: 13 }}>5건</span></div>
                <div style={{ fontSize: 12, color: T.ink2 }}>SLA 평균 2.1일 / 목표 3일</div>
              </div>
              <div style={{ fontSize: 11, color: T.ink3, display: 'grid', gridTemplateColumns: '1.6fr 0.7fr 0.5fr 0.5fr 0.6fr 80px', gap: 12, padding: '8px 4px', borderBottom: `1px solid ${T.line}` }}>
                <div>상품명 / ID</div><div>금액</div><div>LTV</div><div>등급</div><div>점수</div><div>대기</div>
              </div>
              {reviewQueue.map((r, i) => (
                <div key={r.id} style={{ fontSize: 13, display: 'grid', gridTemplateColumns: '1.6fr 0.7fr 0.5fr 0.5fr 0.6fr 80px', gap: 12, padding: '14px 4px', borderBottom: i < reviewQueue.length - 1 ? `1px solid ${T.line}` : 'none', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: T.ink3, fontFamily: T.fDisp, marginTop: 2 }}>{r.id}</div>
                  </div>
                  <div style={{ fontFamily: T.fDisp, fontWeight: 500 }}>{r.amt}</div>
                  <div>{r.ltv}</div>
                  <div><Tag>{r.grade}</Tag></div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: 32, height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                      <div style={{ width: r.score + '%', height: '100%', background: r.score >= 80 ? T.green : T.ink2 }}></div>
                    </div>
                    <span style={{ fontFamily: T.fDisp, fontSize: 11 }}>{r.score}</span>
                  </div>
                  <div style={{ fontSize: 11, color: r.days >= 3 ? '#c4452f' : T.ink2 }}>{r.days}일째</div>
                </div>
              ))}
            </div>

            {/* Risk panel */}
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>리스크 현황</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['연체 발생률 (30일+)', 1.2, 2.0, '%'],
                  ['부실률 (90일+)', 0.8, 1.5, '%'],
                  ['평균 LTV', 58, 70, '%'],
                  ['집중도 (TOP 차주)', 4.2, 10, '%'],
                ].map(([k, v, max, u]) => (
                  <div key={k}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                      <span style={{ color: T.ink2 }}>{k}</span>
                      <span style={{ fontFamily: T.fDisp, fontWeight: 600 }}>{v}{u} <span style={{ color: T.ink3, fontWeight: 400 }}>/ {max}{u} 한도</span></span>
                    </div>
                    <div style={{ height: 6, background: T.bg, borderRadius: T.rPill, overflow: 'hidden' }}>
                      <div style={{ width: (v / max) * 100 + '%', height: '100%', background: v / max < 0.7 ? T.green : '#c4452f' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 14, background: T.greenSoft, color: T.green, borderRadius: T.rMd, fontSize: 12, lineHeight: 1.65 }}>
                ✓ 모든 리스크 지표가 한도 내에 있습니다.
              </div>
            </div>
          </div>

          {/* Active products */}
          <div style={{ background: T.card, borderRadius: T.rLg, padding: 24, marginTop: T.gap }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>모집 중 상품</div>
              <div style={{ fontSize: 12, color: T.ink2 }}>전체 14건</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {products.map(p => (
                <div key={p.id} style={{ padding: 16, border: `1px solid ${T.line}`, borderRadius: T.rMd }}>
                  <div style={{ fontSize: 10, color: T.ink3, fontFamily: T.fDisp }}>{p.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{p.t}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.ink2, marginTop: 12 }}>
                    <span>목표 {p.target}</span><span>연 {p.rate}</span>
                  </div>
                  <div style={{ height: 4, background: T.bg, borderRadius: T.rPill, overflow: 'hidden', marginTop: 8 }}>
                    <div style={{ width: pct(p.funded), height: '100%', background: T.ink }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink3, marginTop: 6 }}>
                    <span>{pct(p.funded)} 모집</span><span>{p.remain} 남음</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed + System */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: T.gap, marginTop: T.gap }}>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>최근 활동</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['14:28', '심사 통과', 'L-2026-1140 판교 오피스 시설자금'],
                  ['13:54', '신상품 등록', 'P-2026-0288 송파 오피스텔 후순위'],
                  ['13:12', '회원 KYC 검증', '0247명 일괄 처리'],
                  ['12:40', '리스크 알림', 'P-2026-0285 모집 속도 둔화'],
                  ['11:22', '심사 반려', 'L-2026-1136 LTV 초과 (74%)'],
                ].map(([t, k, d]) => (
                  <div key={t + d} style={{ display: 'grid', gridTemplateColumns: '50px 100px 1fr', gap: 12, fontSize: 12, paddingBottom: 10, borderBottom: `1px solid ${T.line}` }}>
                    <span style={{ fontFamily: T.fDisp, color: T.ink3 }}>{t}</span>
                    <span style={{ fontWeight: 500 }}>{k}</span>
                    <span style={{ color: T.ink2 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: T.card, borderRadius: T.rLg, padding: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>시스템 상태</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['결제 시스템', 'KB / 토스 / 카카오', 'OK'],
                  ['신용 정보', 'NICE 평가정보', 'OK'],
                  ['감정 평가 API', '한국감정원', 'OK'],
                  ['이메일 / SMS', 'AWS SES / NHN', 'OK'],
                  ['자동 출금', '내일 03:00 예정', '대기'],
                ].map(([n, d, st]) => (
                  <div key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: `1px solid ${T.line}`, fontSize: 12 }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{n}</div>
                      <div style={{ fontSize: 10, color: T.ink3, marginTop: 2 }}>{d}</div>
                    </div>
                    <Tag tone={st === 'OK' ? 'green' : 'neutral'}>● {st}</Tag>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PageAdmin = PageAdmin;
