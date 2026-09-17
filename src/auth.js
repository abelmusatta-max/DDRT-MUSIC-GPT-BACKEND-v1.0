// DDRT MUSIC GPT BACKEND
// Authentication foundation v1.0

/**
 * Extract Bearer token from Authorization header.
 */
export function getBearerToken(request) {
  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    return null;
  }

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

/**
 * Basic authentication response.
 */
export function unauthorizedResponse(message = "Authentication required") {
  return new Response(
    JSON.stringify({
      success: false,
      error: message
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

/**
 * Temporary authentication context.
 *
 * This will later be connected to
 * Google OAuth / Supabase Auth.
 */
export function getAuthContext(request) {
  const token = getBearerToken(request);

  if (!token) {
    return {
      authenticated: false,
      token: null,
      artistId: null
    };
  }

  return {
    authenticated: true,
    token,
    artistId: null
  };
}
