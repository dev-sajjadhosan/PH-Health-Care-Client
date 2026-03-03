export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const patientProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [/\/dashboard\/.*/],
};

export const doctorProtectedRoutes: RouteConfig = {
  pattern: [/\/doctor\/dashboard\/.*/],
  exact: [],
};

// export const superAdminProtectedRoutes: RouteConfig = {
//   pattern: [/\/admin\/dashboard\/.*/],
//   exact: [],
// };

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/\/admin\/dashboard\/.*/],
  exact: [],
};

export const isRouteMatches = (
  pathname: string,
  routeConfig: RouteConfig,
): boolean => {
  const { exact, pattern } = routeConfig;
  return (
    exact.includes(pathname) ||
    pattern.some((regex: RegExp) => regex.test(pathname))
  );
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  if (isRouteMatches(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatches(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  //   if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
  //     return "SUPER_ADMIN";
  //   }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "PATIENT":
      return "/dashboard";
    case "DOCTOR":
      return "/doctor/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    case "SUPER_ADMIN":
      return "/admin/dashboard";
    default:
      return "/";
  }
};

export const isValidRedirectForRole = (
  role: UserRole,
  redirectPath: string,
): boolean => {
  const unifySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
  role = unifySuperAdminAndAdminRole;
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (role === routeOwner) {
    return true;
  }

  return false;
};
