const backendURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

// Backend Paths
const ME_PATH = `${backendURL}/me`;
const LOCATIONS_PATH = `${backendURL}/locations`;
const SKILLS_PATH = `${backendURL}/skills`;
const TEAM_PATH = `${backendURL}/team`;
const SHIFTS_PATH = `${backendURL}/shifts`;
const AVAILABILITY_PATH = `${backendURL}/availability`;

// Backend Routes
export const APIS = {
  auth: {
    me: ME_PATH,
  },
  locations: {
    list: LOCATIONS_PATH,
    create: LOCATIONS_PATH,
    detail: (id: string) => `${LOCATIONS_PATH}/${id}`,
    update: (id: string) => `${LOCATIONS_PATH}/${id}`,
    delete: (id: string) => `${LOCATIONS_PATH}/${id}`,
  },
  skills: {
    list: SKILLS_PATH,
    create: SKILLS_PATH,
    detail: (id: string) => `${SKILLS_PATH}/${id}`,
    update: (id: string) => `${SKILLS_PATH}/${id}`,
    delete: (id: string) => `${SKILLS_PATH}/${id}`,
  },
  team: {
    list: TEAM_PATH,
    detail: (id: string) => `${TEAM_PATH}/${id}`,
    setCertifications: (id: string) => `${TEAM_PATH}/${id}/certifications`,
    setSkills: (id: string) => `${TEAM_PATH}/${id}/skills`,
    setManagedLocations: (id: string) => `${TEAM_PATH}/${id}/managed-locations`,
  },
  shifts: {
    list: (params?: { locationId?: string; from?: string; to?: string }) => {
      if (!params) return SHIFTS_PATH;
      const search = new URLSearchParams();
      if (params.locationId) search.set("locationId", params.locationId);
      if (params.from) search.set("from", params.from);
      if (params.to) search.set("to", params.to);
      const qs = search.toString();
      return qs ? `${SHIFTS_PATH}?${qs}` : SHIFTS_PATH;
    },
    create: SHIFTS_PATH,
    detail: (id: string) => `${SHIFTS_PATH}/${id}`,
    update: (id: string) => `${SHIFTS_PATH}/${id}`,
    delete: (id: string) => `${SHIFTS_PATH}/${id}`,
    publish: (id: string) => `${SHIFTS_PATH}/${id}/publish`,
    unpublish: (id: string) => `${SHIFTS_PATH}/${id}/unpublish`,
    assignments: (id: string) => `${SHIFTS_PATH}/${id}/assignments`,
    unassign: (id: string, staffId: string) =>
      `${SHIFTS_PATH}/${id}/assignments/${staffId}`,
  },
  availability: {
    me: `${AVAILABILITY_PATH}/me`,
    createRecurring: `${AVAILABILITY_PATH}/me/recurring`,
    updateRecurring: (id: string) =>
      `${AVAILABILITY_PATH}/me/recurring/${id}`,
    deleteRecurring: (id: string) =>
      `${AVAILABILITY_PATH}/me/recurring/${id}`,
    createException: `${AVAILABILITY_PATH}/me/exceptions`,
    updateException: (id: string) =>
      `${AVAILABILITY_PATH}/me/exceptions/${id}`,
    deleteException: (id: string) =>
      `${AVAILABILITY_PATH}/me/exceptions/${id}`,
    forStaff: (staffId: string) => `${AVAILABILITY_PATH}/staff/${staffId}`,
  },
};

// Frontend Routes
export const ROUTES = {
  landingPage: "/",
  login: "/login",
  signup: "/signup",
  authCallback: "/auth/callback",
  dashboard: "/dashboard",
  locations: "/locations",
  newLocation: "/locations/new",
  skills: "/skills",
  newSkill: "/skills/new",
  team: "/team",
  teamMember: (id: string) => `/team/${id}`,
  shifts: "/shifts",
  newShift: "/shifts/new",
  shiftDetail: (id: string) => `/shifts/${id}`,
  availability: "/availability",
};
