import { type FunctionComponent } from "react";

export type SessionInfoProps = {
  email?: string;
  userId: string;
};

export const SessionInfo: FunctionComponent<SessionInfoProps> = ({
  email,
  userId,
}) => {
  return (
    <section className="grid gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
        From Supabase session
      </h2>
      <div className="grid gap-1 text-sm">
        <span className="text-muted-foreground">Email</span>
        <span className="font-medium">{email}</span>
      </div>
      <div className="grid gap-1 text-sm">
        <span className="text-muted-foreground">User ID</span>
        <span className="font-mono text-xs break-all">{userId}</span>
      </div>
    </section>
  );
};
