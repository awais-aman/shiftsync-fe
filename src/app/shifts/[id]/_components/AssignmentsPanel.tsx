"use client";

import { useMemo, useState, type FunctionComponent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  useAssignStaff,
  useShiftAssignments,
  useUnassignStaff,
} from "@/hooks/assignments";
import type { TeamMember } from "@/types/team";

export type AssignmentsPanelProps = {
  shiftId: string;
  canManage: boolean;
  allStaff: TeamMember[];
  requiredSkillId: string;
  locationId: string;
};

export const AssignmentsPanel: FunctionComponent<AssignmentsPanelProps> = ({
  shiftId,
  canManage,
  allStaff,
  requiredSkillId,
  locationId,
}) => {
  const { data: assignments, isLoading, error } = useShiftAssignments(shiftId);
  const assign = useAssignStaff(shiftId);
  const unassign = useUnassignStaff(shiftId);

  const assignedIds = useMemo(
    () => new Set((assignments ?? []).map((a) => a.staffId)),
    [assignments],
  );

  // Show every staff member; flag whether each one would clear the BE's
  // skill+cert filter so the manager can see why someone's greyed out.
  const staffOptions = useMemo(() => {
    return allStaff
      .filter((staff) => !assignedIds.has(staff.id))
      .map((staff) => {
        const hasSkill = staff.skills.some((s) => s.id === requiredSkillId);
        const certified = staff.certifications.some(
          (l) => l.id === locationId,
        );
        return {
          staff,
          eligible: hasSkill && certified,
          missing: [
            !hasSkill ? "skill" : null,
            !certified ? "certification" : null,
          ].filter(Boolean) as string[],
        };
      })
      .sort((a, b) => Number(b.eligible) - Number(a.eligible));
  }, [allStaff, assignedIds, requiredSkillId, locationId]);

  const [selectedStaffId, setSelectedStaffId] = useState("");

  const onAssign = () => {
    if (!selectedStaffId) return;
    assign.mutate(
      { staffId: selectedStaffId },
      {
        onSuccess: () => {
          toast.success("Staff assigned");
          setSelectedStaffId("");
        },
        onError: (e) => toast.error(e.message),
      },
    );
  };

  const onUnassign = (staffId: string) => {
    unassign.mutate(staffId, {
      onSuccess: () => toast.success("Staff unassigned"),
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned staff</CardTitle>
        <CardDescription>
          The constraint engine validates skills, certifications, availability,
          double-booking, and minimum rest before saving.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading…</p>
        ) : error ? (
          <p className="text-destructive text-sm">{error.message}</p>
        ) : !assignments || assignments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No one assigned yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {assignments.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-md border p-3 text-sm"
              >
                <div>
                  <div className="font-medium">
                    {a.staffDisplayName ?? a.staffEmail ?? a.staffId}
                  </div>
                  {a.staffEmail ? (
                    <div className="text-muted-foreground text-xs">
                      {a.staffEmail}
                    </div>
                  ) : null}
                </div>
                {canManage ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => onUnassign(a.staffId)}
                    disabled={unassign.isPending}
                  >
                    Unassign
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {canManage ? (
        <CardFooter className="flex flex-col items-stretch gap-3 border-t pt-4">
          <div className="grid gap-2">
            <Label htmlFor="staff-picker">Assign a staff member</Label>
            <select
              id="staff-picker"
              value={selectedStaffId}
              onChange={(event) => setSelectedStaffId(event.target.value)}
              className="border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="">Choose a staff member…</option>
              {staffOptions.map(({ staff, eligible, missing }) => (
                <option key={staff.id} value={staff.id}>
                  {staff.displayName ?? staff.email ?? staff.id}
                  {eligible ? "" : ` — missing ${missing.join(", ")}`}
                </option>
              ))}
            </select>
            <p className="text-muted-foreground text-xs">
              Staff missing skill or certification are still listed but will be
              rejected by the constraint engine. Availability and double-booking
              checks happen on submit.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onAssign}
              disabled={!selectedStaffId || assign.isPending}
            >
              {assign.isPending ? "Assigning…" : "Assign"}
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};
