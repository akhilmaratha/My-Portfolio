export function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">{label}</p>
      <div className="mt-4 font-syne text-4xl font-black text-white">{value}</div>
      {detail ? <p className="mt-3 text-sm leading-6 text-white/60">{detail}</p> : null}
    </div>
  );
}