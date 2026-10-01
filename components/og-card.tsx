// Shared layout for the generated OpenGraph images (1200×630).
export const ogSize = { width: 1200, height: 630 };

export function OgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#0f0f11',
        color: '#ececee',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 28, color: '#a3a3ad', letterSpacing: 1 }}>{eyebrow}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 36, color: '#a3a3ad', lineHeight: 1.3 }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: 'flex', height: 6, width: 120, background: '#8cc2ff' }} />
    </div>
  );
}
