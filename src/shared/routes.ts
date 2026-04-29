const backendURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

// Backend Paths
const ME_PATH = `${backendURL}/me`;
const LOCATIONS_PATH = `${backendURL}/locations`;

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
};
