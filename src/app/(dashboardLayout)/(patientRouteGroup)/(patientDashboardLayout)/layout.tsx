export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-7xl mx-auto h-screen">{children}</div>;
}
