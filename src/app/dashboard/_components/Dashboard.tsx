import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiVerifiedInfo } from "@/app/dashboard/_components/ApiVerifiedInfo";
import { LogoutButton } from "@/app/dashboard/_components/LogoutButton";
import { SessionInfo } from "@/app/dashboard/_components/SessionInfo";
import { apiFetch } from "@/lib/api/server";
import { createClient } from "@/lib/supabase/server";
import { APIS, ROUTES } from "@/shared/routes";
import type { CurrentUser } from "@/types/auth";

export const Dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.login);

  const meResult = await apiFetch<CurrentUser>(APIS.auth.me);

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>You&apos;re signed in</CardTitle>
          <CardDescription>
            Welcome to ShiftSync. Roles, schedules, and the rest land in the
            next slices.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SessionInfo email={user.email} userId={user.id} />
          <ApiVerifiedInfo result={meResult} />
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
};
