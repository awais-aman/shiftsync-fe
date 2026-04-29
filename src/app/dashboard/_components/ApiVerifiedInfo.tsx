import { type FunctionComponent } from "react";
import type { ApiResult } from "@/lib/api/server";
import type { CurrentUser } from "@/types/auth";

export type ApiVerifiedInfoProps = {
  result: ApiResult<CurrentUser>;
};

export const ApiVerifiedInfo: FunctionComponent<ApiVerifiedInfoProps> = ({
  result,
}) => {
  return (
    <section className="grid gap-2 border-t pt-4">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
        Verified by ShiftSync API
      </h2>
      {result.ok ? (
        <div className="grid gap-1 text-sm">
          <div>
            <span className="text-muted-foreground">Role: </span>
            <span className="font-medium capitalize">{result.data.role}</span>
          </div>
          {result.data.displayName ? (
            <div>
              <span className="text-muted-foreground">Display name: </span>
              <span className="font-medium">{result.data.displayName}</span>
            </div>
          ) : null}
          {typeof result.data.desiredHoursPerWeek === "number" ? (
            <div>
              <span className="text-muted-foreground">
                Desired hours / week:{" "}
              </span>
              <span className="font-medium">
                {result.data.desiredHoursPerWeek}
              </span>
            </div>
          ) : null}
          <div>
            <span className="text-muted-foreground">Email confirmed: </span>
            <span className="font-medium">
              {result.data.emailConfirmed ? "yes" : "no"}
            </span>
          </div>
          {result.data.lastSignInAt ? (
            <div>
              <span className="text-muted-foreground">Last sign-in: </span>
              <span className="font-medium">
                {new Date(result.data.lastSignInAt).toLocaleString()}
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-destructive text-sm">
          Could not reach API ({result.status || "network"}): {result.error}
        </p>
      )}
    </section>
  );
};
