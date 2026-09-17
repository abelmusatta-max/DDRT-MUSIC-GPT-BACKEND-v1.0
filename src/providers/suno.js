// DDRT MUSIC GPT BACKEND
// Suno Provider Adapter v1.0

/**
 * Suno provider configuration.
 *
 * IMPORTANT:
 * The real Suno API endpoint and API key
 * will be connected later.
 *
 * Never place an API key in the Blogger frontend.
 */

/**
 * Get Suno configuration from backend environment variables.
 */
export function getSunoConfig(env) {
  return {
    apiUrl: env?.SUNO_API_URL || "",
    apiKey: env?.SUNO_API_KEY || ""
  };
}

/**
 * Validate Suno configuration.
 */
export function validateSunoConfig(env) {
  const config = getSunoConfig(env);

  if (!config.apiUrl) {
    return {
      valid: false,
      message: "SUNO_API_URL is not configured."
    };
  }

  if (!config.apiKey) {
    return {
      valid: false,
      message: "SUNO_API_KEY is not configured."
    };
  }

  return {
    valid: true,
    message: "Suno provider configuration is ready."
  };
}

/**
 * Build the song-generation payload.
 *
 * This function does NOT call Suno yet.
 * The exact provider API format will be added
 * after the official API documentation is confirmed.
 */
export function buildSunoPayload(song) {
  if (!song) {
    throw new Error("Song data is required.");
  }

  return {
    title: song.title || "",
    lyrics: song.lyrics || "",
    genre: song.genre || "",
    style: song.style || "",
    rhythm: song.rhythm || "",
    bpm: song.bpm || null,
    key: song.key || "",
    instrumental: Boolean(song.instrumental)
  };
}

/**
 * Generate a song through the Suno provider.
 *
 * Provider request is intentionally left as a
 * controlled integration point until the official
 * API endpoint/schema is configured.
 */
export async function generateWithSuno(song, env) {
  const configuration = validateSunoConfig(env);

  if (!configuration.valid) {
    return {
      success: false,
      status: "provider_not_configured",
      message: configuration.message
    };
  }

  const payload = buildSunoPayload(song);

  /*
   * TODO:
   *
   * Connect the official Suno API here.
   *
   * Do NOT invent an API endpoint.
   * Do NOT expose SUNO_API_KEY to the frontend.
   */

  return {
    success: false,
    status: "not_connected",
    provider: "Suno",
    message: "Suno provider is prepared but not connected yet.",
    payload
  };
}

/**
 * Standardize a provider result.
 */
export function normalizeSunoResult(result) {
  if (!result) {
    return {
      success: false,
      status: "empty_result"
    };
  }

  return {
    success: Boolean(result.success),
    provider: "Suno",
    status: result.status || "unknown",
    songId: result.songId || null,
    taskId: result.taskId || null,
    audioUrl: result.audioUrl || null,
    metadata: result.metadata || null,
    message: result.message || ""
  };
}
