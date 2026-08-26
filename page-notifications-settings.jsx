// Pages: 알림센터 / 계정 설정

function PageNotifications() {
  const groups = [
    {
      label: '오늘',
      items: [
        { type: 'invest', t: '투자 체결', d: '강남 신논현 오피스 후순위 100,000원 투자 완료', time: '14:28', unread: true },
        { type: 'repay', t: '상환 입금', d: '서울숲 의류 매출채권 47,820원이 예치금에 입금되었습니다', time: '13:02', unread: true },
        { type: 'system', t: '신상품 알림', d: '구독한 카테고리 〈부동산 후순위〉에 새 상품이 올라왔어요', time: '11:48', unread: false },
      ],
    },
    {
      label: '어제',
      items: [
        { type: 'risk', t: '리스크 안내', d: 'P-2026-0285 〈판교 데이터센터 PF 후순위〉 모집 속도가 평소보다 느립니다', time: '17:30', unread: false },
        { type: 'invest', t: '모집 마감 임박', d: '관심 표시한 상품이 4시간 후 마감됩니다', time: '10:15', unread: false },
      ],
    },
    {
      label: '11월 16일',
      items: [
        { type: 'event', t: '월간 리포트', d: '10월 평균 수익률 9.4%, 누적 수익 +47,283원', time: '09:00', unread: false },
        { type: 'system', t: '약관 변경 안내', d: '12월 1일부터 적용되는 일부 약관이 개정됩니다', time: '08:30', unread: false },
      ],
    },
  ];
  const icons = { invest: '◐', repay: '↓', system: '◯', risk: '⚠', event: '★' };

  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80, minHeight: 900 }}>
      <AppNav active="고객센터" />
      <div style={{ display: 'flex' }}>
        <Sidebar active="대시보드" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>알림센터</div>
              <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>알림</h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="secondary" size="sm">모두 읽음 처리</Btn>
              <Btn size="sm" variant="secondary">알림 설정 ⚙</Btn>
            </div>
          </div>

          {/* filter chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[
              ['전체', 7, true],
              ['투자/상환', 3, false],
              ['리스크', 1, false],
              ['시스템', 2, false],
              ['이벤트', 1, false],
            ].map(([t, n, a]) => (
              <span key={t} style={{ padding: '8px 14px', borderRadius: T.rPill, fontSize: 13, fontWeight: 500, background: a ? T.ink : T.card, color: a ? T.card : T.ink2 }}>
                {t} <span style={{ marginLeft: 4, color: a ? 'rgba(255,255,255,0.55)' : T.ink3 }}>{n}</span>
              </span>
            ))}
          </div>

          {/* notification feed */}
          <div style={{ background: T.card, borderRadius: T.rLg, overflow: 'hidden' }}>
            {groups.map((g, gi) => (
              <div key={g.label}>
                <div style={{ padding: '20px 28px 8px', fontSize: 11, color: T.ink3, letterSpacing: 1.5, textTransform: 'uppercase', borderTop: gi > 0 ? `1px solid ${T.line}` : 'none' }}>{g.label}</div>
                {g.items.map((n, i) => (
                  <div key={i} style={{ padding: '18px 28px', display: 'grid', gridTemplateColumns: '32px 1fr 80px 80px', gap: 16, alignItems: 'center', borderTop: `1px solid ${T.line}`, background: n.unread ? 'rgba(31, 81, 50, 0.02)' : 'transparent' }}>
                    <div style={{ width: 32, height: 32, borderRadius: T.rPill, background: T.bgSoft, color: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{icons[n.type]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {n.t}
                        {n.unread && <span style={{ width: 6, height: 6, background: T.green, borderRadius: 999 }}></span>}
                      </div>
                      <div style={{ fontSize: 13, color: T.ink2, marginTop: 4, lineHeight: 1.5 }}>{n.d}</div>
                    </div>
                    <div style={{ fontSize: 12, color: T.ink3, fontFamily: T.fDisp, textAlign: 'right' }}>{n.time}</div>
                    <div style={{ fontSize: 12, color: T.ink, textAlign: 'right' }}>상세 →</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageSettings() {
  return (
    <div style={{ width: 1440, background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80, minHeight: 1100 }}>
      <AppNav active="나의 투자" />
      <div style={{ display: 'flex' }}>
        <Sidebar active="계정 설정" />
        <div style={{ flex: 1, padding: '32px 56px 0 0' }}>
          <div style={{ fontSize: 13, color: T.ink2, marginBottom: 8 }}>나의 투자 / 계정 설정</div>
          <h1 style={{ fontFamily: T.fDisp, fontSize: 36, fontWeight: 600, letterSpacing: -1.2, margin: 0 }}>계정 설정</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, marginTop: 32, alignItems: 'start' }}>
            {/* sub-nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 16 }}>
              {['프로필', '보안', '알림', '연결 계좌', '세금', '약관 동의 내역'].map((s, i) => (
                <div key={s} style={{ padding: '10px 14px', borderRadius: T.rMd, fontSize: 13, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? T.ink : T.ink2, background: i === 0 ? T.card : 'transparent' }}>{s}</div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
              {/* Profile */}
              <SettingCard title="프로필" desc="다른 사용자에게 표시되는 정보입니다.">
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'center' }}>
                  <div style={{ width: 96, height: 96, borderRadius: T.rPill, background: T.ink, color: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fDisp, fontSize: 36, fontWeight: 600 }}>김</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <SettingRow label="이름">
                      <input defaultValue="김민준" style={inputStyle} />
                    </SettingRow>
                    <SettingRow label="이메일">
                      <input defaultValue="m.kim@example.com" style={inputStyle} />
                    </SettingRow>
                    <SettingRow label="휴대폰">
                      <input defaultValue="010-****-1234" style={{ ...inputStyle, fontFamily: T.fDisp }} />
                    </SettingRow>
                  </div>
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${T.line}`, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <Btn variant="secondary" size="sm">취소</Btn>
                  <Btn size="sm">저장</Btn>
                </div>
              </SettingCard>

              {/* Security */}
              <SettingCard title="보안" desc="계정과 자산을 보호하는 인증 수단입니다.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <ToggleRow t="비밀번호" d="3개월마다 변경을 권장합니다" rt="마지막 변경: 2026.08.20" act="변경" />
                  <ToggleRow t="2단계 인증 (OTP)" d="로그인·출금 시 6자리 코드 추가" on />
                  <ToggleRow t="공동인증서 출금 확인" d="100만원 이상 출금 시 인증서 필요" on />
                  <ToggleRow t="해외 IP 로그인 차단" d="익숙하지 않은 위치에서 접근 차단" />
                </div>
              </SettingCard>

              {/* Notification preferences */}
              <SettingCard title="알림" desc="받고 싶은 알림 종류와 채널을 선택하세요.">
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 60px 60px 60px', gap: 16, alignItems: 'center', fontSize: 12, color: T.ink3, paddingBottom: 12, borderBottom: `1px solid ${T.line}` }}>
                  <span></span><span style={{ textAlign: 'center' }}>앱</span><span style={{ textAlign: 'center' }}>이메일</span><span style={{ textAlign: 'center' }}>SMS</span>
                </div>
                {[
                  ['투자 체결 / 상환 입금', true, true, false],
                  ['신상품 알림', true, false, false],
                  ['리스크 / 연체 알림', true, true, true],
                  ['월간 리포트', false, true, false],
                  ['이벤트 / 프로모션', false, false, false],
                ].map(([n, a, b, c]) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '1.6fr 60px 60px 60px', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${T.line}`, fontSize: 13 }}>
                    <span>{n}</span>
                    <ToggleDot on={a} />
                    <ToggleDot on={b} />
                    <ToggleDot on={c} />
                  </div>
                ))}
              </SettingCard>

              {/* Linked account */}
              <SettingCard title="연결 계좌" desc="입출금에 사용되는 본인 명의 계좌입니다.">
                <div style={{ padding: 20, background: T.bgSoft, borderRadius: T.rMd, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>KB국민은행</div>
                    <div style={{ fontSize: 13, color: T.ink2, fontFamily: T.fDisp, marginTop: 4 }}>****-**-**-1234</div>
                    <div style={{ fontSize: 11, color: T.ink3, marginTop: 6 }}>2024.03.12 등록 · 본인 인증 완료</div>
                  </div>
                  <Btn variant="secondary" size="sm">변경</Btn>
                </div>
              </SettingCard>

              {/* Danger zone */}
              <SettingCard title="계정 종료" desc="모든 진행 중인 투자/대출이 정리된 후에만 가능합니다." danger>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.6 }}>현재 진행 중인 투자 14건이 있어 즉시 종료가 불가능합니다.<br />모든 상품 만기 후에 다시 시도해주세요.</div>
                  <Btn variant="secondary" size="sm">종료 신청</Btn>
                </div>
              </SettingCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { background: T.bgSoft, border: 'none', borderRadius: T.rMd, padding: '12px 14px', fontSize: 14, fontFamily: T.fSans, color: T.ink, width: 320 };

function SettingCard({ title, desc, children, danger }) {
  return (
    <div style={{ background: T.card, borderRadius: T.rLg, padding: 28, border: danger ? '1px solid rgba(196,69,47,0.15)' : 'none' }}>
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, color: danger ? '#c4452f' : T.ink }}>{title}</div>
      <div style={{ fontSize: 12, color: T.ink2, marginTop: 4, marginBottom: 20 }}>{desc}</div>
      {children}
    </div>
  );
}

function SettingRow({ label, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'center', fontSize: 13 }}>
      <span style={{ color: T.ink2 }}>{label}</span>
      {children}
    </div>
  );
}

function ToggleRow({ t, d, rt, act, on }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
        <div style={{ fontSize: 11, color: T.ink2, marginTop: 4 }}>{d}{rt && <span style={{ marginLeft: 8, color: T.ink3 }}>· {rt}</span>}</div>
      </div>
      {act ? <Btn variant="secondary" size="sm">{act}</Btn> : <ToggleDot on={on} />}
    </div>
  );
}

function ToggleDot({ on }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: T.rPill, background: on ? T.green : '#d8d3ca', position: 'relative', justifySelf: 'center' }}>
      <div style={{ width: 16, height: 16, borderRadius: 999, background: T.card, position: 'absolute', top: 2, left: on ? 18 : 2, transition: 'left 0.2s' }}></div>
    </div>
  );
}

Object.assign(window, { PageNotifications, PageSettings });
