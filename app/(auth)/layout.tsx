export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-screen items-center justify-center bg-slate-50">
      {children}
    </div>
  );
}
