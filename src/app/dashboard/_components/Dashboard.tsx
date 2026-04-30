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
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { apiFetch } from "@/lib/api/server";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/shared/constants";
import { APIS, ROUTES } from "@/shared/routes";
import type { CurrentUser } from "@/types/auth";

export const Dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.login);

  const meResult = await apiFetch<CurrentUser>(APIS.auth.me);
  const isAdmin = meResult.ok && meResult.data.role === UserRole.Admin;

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>You&apos;re signed in</CardTitle>
            <CardDescription>
              Welcome to ShiftSync. Roles, schedules, and the rest land in the
              next slices.
            </CardDescription>
          </div>
          <NotificationBell userId={user.id} />
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
            {isAdmin ? (
              <Link
                href={ROUTES.adminAudit}
                className={buttonVariants({ variant: "secondary" })}
              >
                Audit log
              </Link>
            ) : null}
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
