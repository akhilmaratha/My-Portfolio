import { AdminLoginForm } from "./admin-login-form";

export default function AdminLoginPage({ searchParams }) {
  const callbackUrl = searchParams?.callbackUrl || "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.08),transparent_30%),radial-gradient(circle_at_bottom,rgba(0,200,255,0.08),transparent_28%)] px-4">
      <AdminLoginForm callbackUrl={callbackUrl} />
    </div>
  );
}