import { T, Btn, Tag } from '../tokens';
import { AppNav, Sidebar } from '../components/AppChrome';

export default function Notifications() {
  const groups = [
    { label: '오늘', items: [
      { type: 'invest', t: '투자 체결', d: '강남 신논현 오피스 후순위 100,000원 투자 완료', time: '14:28', unread: true },
      { type: 'repay', t: '상환 입금', d: '서울숲 의류 매출채권 47,820원이 예치금에 입금되었습니다', time: '13:02', unread: true },
      { type: 'system', t: '신상품 알림', d: '구독한 카테고리 〈부동산 후순위〉에 새 상품이 올라왔어요', time: '11:48', unread: false },
    ]},
    { label: '어제', items: [
      { type: 'risk', t: '리스크 안내', d: '판교 데이터센터 PF 후순위 모집 속도가 평소보다 느립니다', time: '17:30', unread: false },
      { type: 'invest', t: '모집 마감 임박', d: '관심 표시한 상품이 4시간 후 마감됩니다', time: '10:15', unread: false },
    ]},
    { label: '11월 16일', items: [
      { type: 'event', t: '월간 리포트', d: '10월 평균 수익률 9.4%, 누적 수익 +47,283원', time: '09:00', unread: false },
      { type: 'system', t: '약관 변경 안내', d: '12월 1일부터 적용되는 일부 약관이 개정됩니다', time: '08:30', unread: false },
    ]},
  ];
  const icons = { invest: '◐', repay: '↓', system: '◯', risk: '⚠', event: '★' };

  return (
    <div style={{ background: T.bg, fontFamily: T.fSans, color: T.ink, paddingBottom: 80, minHeight: '100vh' }}>
      <AppNav />
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

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[['전체', 7, true], ['투자/상환', 3], ['리스크', 1], ['시스템', 2], ['이벤트', 1]].map(([t, n, a]) => (
              <span key={t} style={{ padding: '8px 14px', borderRadius: T.rPill, fontSize: 13, fontWeight: 500, background: a ? T.ink : T.card, color: a ? T.card : T.ink2 }}>
                {t} <span style={{ marginLeft: 4, color: a ? 'rgba(255,255,255,0.55)' : T.ink3 }}>{n}</span>
              </span>
            ))}
          </div>

          <div style={{ background: T.card, borderRadius: T.rLg, overflow: 'hidden' }}>
            {groups.map((g, gi) => (
              <div key={g.label}>
                <div style={{ padding: '20px 28px 8px', fontSize: 11, color: T.ink3, letterSpacing: 1.5, borderTop: gi > 0 ? `1px solid ${T.line}` : 'none' }}>{g.label}</div>
                {g.items.map((n, i) => (
                  <div key={i} style={{ padding: '18px 28px', display: 'grid', gridTemplateColumns: '32px 1fr 80px 80px', gap: 16, alignItems: 'center', borderTop: `1px solid ${T.line}`, background: n.unread ? 'rgba(31,81,50,0.02)' : 'transparent' }}>
                    <div style={{ width: 32, height: 32, borderRadius: T.rPill, background: T.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{icons[n.type]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {n.t}
                        {n.unread && <span style={{ width: 6, height: 6, background: T.green, borderRadius: 999 }} />}
                      </div>
                      <div style={{ fontSize: 13, color: T.ink2, marginTop: 4, lineHeight: 1.5 }}>{n.d}</div>
                    </div>
                    <div style={{ fontSize: 12, color: T.ink3, fontFamily: T.fDisp, textAlign: 'right' }}>{n.time}</div>
                    <div style={{ fontSize: 12, textAlign: 'right' }}>상세 →</div>
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
