// DDRT MUSIC GPT BACKEND
// Song Management Foundation v1.0

/**
 * Create a standard song response.
 */
export function songResponse(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

/**
 * Validate the basic song-generation request.
 */
export function validateSongRequest(data) {
  if (!data) {
    return {
      valid: false,
      message: "Song request data is required."
    };
  }

  if (!data.artistId) {
    return {
      valid: false,
      message: "artistId is required."
    };
  }

  if (!data.title) {
    return {
      valid: false,
      message: "Song title is required."
    };
  }

  if (!data.lyrics && !data.instrumental) {
    return {
      valid: false,
      message: "Lyrics are required unless the song is instrumental."
    };
  }

  return {
    valid: true,
    message: "Song request is valid."
  };
}

/**
 * Create a new internal song record.
 *
 * Database integration will be connected later.
 */
export async function createSong(data) {
  const validation = validateSongRequest(data);

  if (!validation.valid) {
    return {
      success: false,
      message: validation.message
    };
  }

  const songId =
    "song_" +
    Date.now() +
    "_" +
    Math.random().toString(36).slice(2, 8);

  const song = {
    songId,
    artistId: data.artistId,
    title: data.title,
    lyrics: data.lyrics || "",
    genre: data.genre || "",
    style: data.style || "",
    rhythm: data.rhythm || "",
    bpm: data.bpm || null,
    key: data.key || "",
    instrumental: Boolean(data.instrumental),
    provider: "pending",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    message: "Song record created.",
    song
  };
}

/**
 * Create a music-generation job.
 *
 * The actual music provider will be connected later.
 */
export async function createSongJob(song) {
  if (!song || !song.songId) {
    return {
      success: false,
      message: "Valid song data is required."
    };
  }

  const jobId =
    "job_" +
    Date.now() +
    "_" +
    Math.random().toString(36).slice(2, 8);

  const job = {
    jobId,
    songId: song.songId,
    artistId: song.artistId,
    provider: "pending",
    status: "queued",
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    message: "Song generation job created.",
    job
  };
}

/**
 * Update song status.
 */
export function updateSongStatus(song, status, extra = {}) {
  if (!song) {
    return null;
  }

  return {
    ...song,
    status,
    ...extra,
    updatedAt: new Date().toISOString()
  };
    }
