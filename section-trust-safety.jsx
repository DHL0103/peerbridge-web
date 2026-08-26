// Trust & Safety — 위험 관리 / 안전 장치

function TrustSafety() {
  const items = [
    { k: '0.41%', sub: '누적 부실률', body: '7년간 누적 1.2조 원 운용 중 부실 발생액 49억 원. 업계 평균 3.2% 대비 1/8 수준.' },
    { k: '100%', sub: '담보 우선순위', body: '부동산 상품은 모두 선·후순위가 명확한 담보 기반. 평균 LTV 62% 유지.' },
    { k: '주 1회', sub: '현장 리포트', body: '심사 이후에도 매주 차주사 영업 현황과 담보 가치를 점검해 투자자에게 공유합니다.' },
    { k: '예치금 분리', sub: '신탁사 보관', body: '투자자 예치금은 KB국민은행 신탁계정에 별도 보관. 회사 운영자금과 완전 분리됩니다.' },
  ];

  return (
    <div style={{ padding: '80px 56px', background: T.bgSoft, borderRadius: 0 }}>
      <SectionHeader
        kicker="RISK & SAFETY"
        title={<>위험은 사라지지 않습니다.<br /><span style={{ color: T.ink3 }}>다만 먼저 알 수 있을 뿐.</span></>}
        sub="투자 손실의 가능성을 솔직하게 다루고, 그 가능성을 줄이는 데 모든 자원을 씁니다."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: T.gap }}>
        {items.map(it => (
          <div key={it.sub} style={{
            background: T.card, borderRadius: T.rLg, padding: 32,
            display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: T.fDisp, fontSize: 44, fontWeight: 600,
                color: T.ink, letterSpacing: -1.8, lineHeight: 1,
              }}>{it.k}</div>
              <div style={{ fontSize: 12, color: T.ink2, marginTop: 8 }}>{it.sub}</div>
            </div>
            <div style={{ fontSize: 14, color: T.ink2, lineHeight: 1.65, borderLeft: `1px solid ${T.line}`, paddingLeft: 24 }}>{it.body}</div>
          </div>
        ))}
      </div>

      {/* 위험 고지 */}
      <div style={{
        marginTop: T.gap, padding: '20px 28px', borderRadius: T.rMd,
        background: 'transparent', border: `1px dashed ${T.lineStrong}`,
        fontSize: 12, color: T.ink2, lineHeight: 1.6,
      }}>
        <b style={{ color: T.ink, fontWeight: 600 }}>투자 위험 고지</b>
        &nbsp;&nbsp;원금 손실의 가능성이 있는 상품입니다. 과거 수익률이 미래 수익률을 보장하지 않으며, 투자 전 상품설명서·위험고지서를 반드시 확인해주세요.
        금융위원회 등록 온라인투자연계금융업자(등록번호 2021-XX-001).
      </div>
    </div>
  );
}

window.TrustSafety = TrustSafety;
