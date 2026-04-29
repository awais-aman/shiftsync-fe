"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/(auth)/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      disabled={pending}
      onClick={() => startTransition(() => logout())}
    >
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
