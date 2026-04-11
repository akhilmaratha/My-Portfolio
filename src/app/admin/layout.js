import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080b0f] text-white lg:grid lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="min-w-0">
        <div className="border-b border-white/10 bg-[#05070a]/80 px-4 py-4 lg:hidden">
          <div className="font-syne text-2xl font-black text-white">dev.name</div>
        </div>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}