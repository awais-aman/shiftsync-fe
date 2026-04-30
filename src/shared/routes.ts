const backendURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

// Backend Paths
const ME_PATH = `${backendURL}/me`;
const LOCATIONS_PATH = `${backendURL}/locations`;
const SKILLS_PATH = `${backendURL}/skills`;
const TEAM_PATH = `${backendURL}/team`;

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
};
