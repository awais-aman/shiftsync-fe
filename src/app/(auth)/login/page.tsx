import { AuthForm } from "@/app/(auth)/_components/auth-form";
import { login } from "@/app/(auth)/actions";

type SearchParams = Promise<{ next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;
  return <AuthForm mode="login" action={login} next={next} />;
}
