export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: [
    '*', 
  ],
  ADMIN: [
    // Dashboard routes
    '/dashboard',
  ],
  OPERATOR: [
    // Dashboard routes
    '/table',
  ],
} as const;

/**
 * Default redirect paths for each role after successful login
 */
export const ROLE_DEFAULT_REDIRECTS = {
  SUPER_ADMIN: '/dashboard',
  ADMIN: '/dashboard',
  OPERATOR: '/table',
} as const;

/**
 * Routes that are always public (no authentication required)
 */
export const PUBLIC_ROUTES = [
  '/',
  '/login',
] as const;

/**
 * Check if a path matches a pattern
 * 
 * Patterns:
 * - '*' = Match all paths
 * - '/path/*' = Match /path and all subpaths
 * - '/path/[param]' = Match /path with any single segment
 * - '/path' = Exact match only
 * 
 * @param pathname - The path to check (e.g., '/products/123')
 * @param pattern - The pattern to match against (e.g., '/products/*')
 * @returns true if path matches pattern
 */
function matchesPattern(pathname: string, pattern: string): boolean {
  // Wildcard: match all paths
  if (pattern === '*') {
    return true;
  }

  // Exact match
  if (pattern === pathname) {
    return true;
  }

  // Wildcard suffix: /path/* matches /path and /path/anything
  if (pattern.endsWith('/*')) {
    const basePattern = pattern.slice(0, -2); // Remove /*
    return pathname === basePattern || pathname.startsWith(`${basePattern}/`);
  }

  // Dynamic segment: /path/[param] matches /path/anything (single segment only)
  if (pattern.includes('[') && pattern.includes(']')) {
    const regexPattern = pattern
      .replace(/\[([^\]]+)\]/g, '([^/]+)') // [param] -> ([^/]+)
      .replace(/\*/g, '.*'); // * -> .*
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  }

  return false;
}

/**
 * Check if a user role can access a specific route
 * 
 * @param pathname - The path to check (e.g., '/products/123')
 * @param userRole - The user's role (e.g., 'STAFF')
 * @returns true if user has access to the route
 * 
 * @example
 * canAccess('/products', 'STAFF') // true
 * canAccess('/settings', 'STAFF') // false
 * canAccess('/admin', 'STORE_ADMIN') // false
 * canAccess('/products', 'CUSTOMER') // false
 */
export function canAccess(pathname: string, userRole?: string | null): boolean {
  // No role = unauthenticated user, check public routes only
  if (!userRole) {
    return PUBLIC_ROUTES.some((pattern) => matchesPattern(pathname, pattern));
  }

  // Check role-specific permissions
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!permissions) {
    // Unknown role = deny access
    return false;
  }

  // Check if any permission pattern matches the pathname
  return permissions.some((pattern) => matchesPattern(pathname, pattern));
}

/**
 * Check if a route is public (no authentication required)
 * 
 * @param pathname - The path to check
 * @returns true if route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((pattern) => matchesPattern(pathname, pattern));
}

/**
 * Get the default redirect path for a user role after login
 * 
 * @param userRole - The user's role
 * @returns The default redirect path for the role
 */
export function getDefaultRedirect(userRole?: string | null): string {
  if (!userRole) {
    return '/';
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return ROLE_DEFAULT_REDIRECTS[userRole as keyof typeof ROLE_DEFAULT_REDIRECTS] || '/';
}


/**
 * Check if a user has permission to perform an action on a resource
 * 
 * This is for fine-grained permissions within routes (e.g., edit vs view)
 * Currently simplified - extend as needed for action-level permissions
 * 
 * @param userRole - The user's role
 * @param action - The action (e.g., 'create', 'read', 'update', 'delete')
 * @param resource - The resource (e.g., 'product', 'order', 'customer')
 * @returns true if user can perform the action
 */
export function canPerformAction(
  userRole: string,
  action: 'create' | 'read' | 'update' | 'delete',
  resource: string
): boolean {
  // SUPER_ADMIN can do anything
  if (userRole === 'SUPER_ADMIN') {
    return true;
  }

  // STORE_ADMIN can do anything within their store
  if (userRole === 'STORE_ADMIN') {
    return true;
  }

  // STAFF has limited write permissions
  if (userRole === 'STAFF') {
    // Staff can read most things
    if (action === 'read') {
      return true;
    }

    // Staff can update orders (order processing)
    if (action === 'update' && resource === 'order') {
      return true;
    }

    // Staff can update customers (customer service)
    if (action === 'update' && resource === 'customer') {
      return true;
    }

    // No other write permissions
    return false;
  }

  // CUSTOMER can only manage their own data
  if (userRole === 'CUSTOMER') {
    // Customers can read public data
    if (action === 'read' && ['product', 'category', 'brand'].includes(resource)) {
      return true;
    }

    // Customers can manage their own orders, addresses, wishlist
    if (['order', 'address', 'wishlist'].includes(resource)) {
      return true; // Note: Must also check ownership in the actual route
    }

    return false;
  }

  // Unknown role = deny
  return false;
}