export enum UserRole {
  Admin = "admin",
  Manager = "manager",
  Staff = "staff",
}

export enum QueryKeys {
  CurrentUser = "currentUser",
  Locations = "locations",
  Location = "location",
  Skills = "skills",
  Skill = "skill",
  Team = "team",
  TeamMember = "teamMember",
  Shifts = "shifts",
  Shift = "shift",
  Availability = "availability",
  Assignments = "assignments",
  DryRun = "dryRun",
  OvertimeOverrides = "overtimeOverrides",
  Swaps = "swaps",
  Swap = "swap",
  Notifications = "notifications",
  NotificationsUnread = "notificationsUnread",
}

export enum AuthMode {
  Login = "login",
  Signup = "signup",
}
