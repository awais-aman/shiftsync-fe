import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
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
          <div className="flex flex-col gap-2 border-t pt-4">
            <Link
              href={ROUTES.locations}
              className={buttonVariants({ variant: "secondary" })}
            >
              Manage locations
            </Link>
            <Link
              href={ROUTES.skills}
              className={buttonVariants({ variant: "secondary" })}
            >
              Manage skills
            </Link>
            <Link
              href={ROUTES.team}
              className={buttonVariants({ variant: "secondary" })}
            >
              Manage team
            </Link>
            <Link
              href={ROUTES.shifts}
              className={buttonVariants({ variant: "secondary" })}
            >
              Manage shifts
            </Link>
            <Link
              href={ROUTES.availability}
              className={buttonVariants({ variant: "secondary" })}
            >
              My availability
            </Link>
            <Link
              href={ROUTES.swaps}
              className={buttonVariants({ variant: "secondary" })}
            >
              Swaps & drops
            </Link>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
