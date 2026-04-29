const backendURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

// Backend Paths
const ME_PATH = `${backendURL}/me`;

// Backend Routes
export const APIS = {
  auth: {
    me: ME_PATH,
  },
};

// Frontend Routes
export const ROUTES = {
  landingPage: "/",
  login: "/login",
  signup: "/signup",
  authCallback: "/auth/callback",
  dashboard: "/dashboard",
};
