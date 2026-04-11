export function AdminHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#00ffaa]">Admin</p>
        <h1 className="mt-3 font-syne text-3xl font-black text-white sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}