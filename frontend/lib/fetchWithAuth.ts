let refreshPromise: Promise<boolean> | null = null;

export async function refreshTokens(backendUrl: string): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async (): Promise<boolean> => {
    try {
      const response = await fetch(`${backendUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function fetchWithAuth(
  url: string,
  backendUrl: string,
  options: RequestInit = {}
): Promise<Response> {
  const mergedOptions: RequestInit = {
    ...options,
    credentials: 'include',
  };

  const response = await fetch(url, mergedOptions);

  if (response.status !== 401) {
    return response;
  }

  const refreshed = await refreshTokens(backendUrl);

  if (!refreshed) {
    return response;
  }

  return fetch(url, mergedOptions);
}
