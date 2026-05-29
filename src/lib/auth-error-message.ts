const DEFAULT_AUTH_ERROR =
  "An unexpected authentication error occurred. Please try again.";

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  github:
    "GitHub sign-in failed. This is usually caused by incorrect OAuth credentials or a mismatched callback URL.",
  OAuthSignin:
    "Could not start the GitHub sign-in flow. Please try again.",
  OAuthCallback:
    "GitHub authentication could not be completed after redirect. Please try again.",
  OAuthCreateAccount:
    "Your account could not be created from GitHub data. Please try again.",
  OAuthAccountNotLinked:
    "An account with the same email exists but is not linked to GitHub yet.",
  Callback:
    "GitHub sign-in callback failed. Please retry and check your OAuth app callback URL.",
  AccessDenied:
    "Access was denied. You may have cancelled the GitHub authorization.",
  Configuration:
    "There is a server configuration error. Please contact the site administrator.",
  Verification:
    "The sign-in link has expired or has already been used.",
  Default: DEFAULT_AUTH_ERROR,
};

export function normalizeAuthError(rawError: string | null): string | null {
  if (!rawError) return null;

  const trimmed = rawError.trim();
  if (!trimmed) return null;

  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

export function getAuthErrorMessage(errorCode: string): string {
  return AUTH_ERROR_MESSAGES[errorCode] ?? AUTH_ERROR_MESSAGES.Default;
}
