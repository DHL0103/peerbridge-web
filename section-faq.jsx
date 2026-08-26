// FAQ — 자주 묻는 질문

function FAQ() {
  const items = [
    { q: '최소 투자 금액은 얼마인가요?', a: '상품당 1만 원부터 가능합니다. 분산 투자를 위해 한 상품 최대 투자 한도(보통 모집액의 5%)가 있습니다.' },
    { q: '원금이 보장되나요?', a: '보장되지 않습니다. peerbridge의 모든 상품은 원금 손실 가능성이 있는 투자상품이며, 7년간 누적 부실률은 0.41%입니다.' },
    { q: '세금은 어떻게 처리되나요?', a: '발생한 이자수익에 대해 15.4%(이자소득세 14% + 지방소득세 1.4%)가 원천징수되며, peerbridge가 자동으로 처리합니다.' },
    { q: '투자한 돈은 중도에 회수할 수 있나요?', a: '원칙적으로 만기 전 회수는 불가능합니다. 단, 일부 상품은 양도 게시판을 통해 다른 투자자에게 양도할 수 있습니다.' },
    { q: '예치금은 안전하게 보관되나요?', a: 'KB국민은행 신탁계정에 별도 보관됩니다. peerbridge의 운영자금과 완전히 분리되어 있어, 회사에 문제가 생겨도 예치금은 안전합니다.' },
    { q: '심사역이 누구인지 알 수 있나요?', a: '회사소개 페이지에서 심사역 8명의 이력과 담당 자산 클래스를 확인할 수 있습니다. 평균 경력 18년입니다.' },
  ];

  const [open, setOpen] = React.useState(0);

  return (
    <div style={{ padding: '80px 56px' }}>
      <SectionHeader
        kicker="FAQ"
        title="자주 묻는 질문"
        sub="투자 전 가장 많이 받는 질문들을 정리했습니다. 더 궁금한 점은 1:1 상담으로 연결됩니다."
      />

      <div style={{ background: T.card, borderRadius: T.rLg, overflow: 'hidden' }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} style={{
              borderBottom: i < items.length - 1 ? `1px solid ${T.line}` : 'none',
            }}>
              <div
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  padding: '24px 32px', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>{it.q}</span>
                <span style={{ fontSize: 20, color: T.ink2, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', display: 'inline-block' }}>+</span>
              </div>
              {isOpen && (
                <div style={{ padding: '0 32px 28px', fontSize: 14, color: T.ink2, lineHeight: 1.7, maxWidth: 760 }}>{it.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.FAQ = FAQ;
