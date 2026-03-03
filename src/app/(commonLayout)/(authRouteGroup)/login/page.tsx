import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginParams) {
  const params = await searchParams;
  const redirectUrl = params.redirect;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm redirectPath={redirectUrl} />
    </div>
  );
}
