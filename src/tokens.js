// DDRT MUSIC GPT BACKEND
// Token Wallet Foundation v1.0

/**
 * Create a standard token response.
 */
export function tokenResponse(data, status = 200) {
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
 * Get an artist's current token balance.
 *
 * Database integration will be connected later.
 */
export async function getTokenBalance(artistId, db) {
  if (!artistId) {
    return {
      success: false,
      error: "Artist ID is required"
    };
  }

  // Temporary placeholder.
  // Real balance will come from token_wallets table.
  return {
    success: true,
    artistId,
    balance: 0
  };
}

/**
 * Check whether an artist has enough tokens.
 */
export async function hasEnoughTokens(
  artistId,
  requiredTokens,
  db
) {
  const wallet = await getTokenBalance(artistId, db);

  if (!wallet.success) {
    return false;
  }

  return wallet.balance >= requiredTokens;
}

/**
 * Reserve tokens before starting song generation.
 *
 * Later this will use a database transaction
 * to prevent double-spending.
 */
export async function reserveTokens(
  artistId,
  amount,
  db
) {
  if (!artistId) {
    throw new Error("Artist ID is required");
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Invalid token amount");
  }

  const wallet = await getTokenBalance(artistId, db);

  if (wallet.balance < amount) {
    return {
      success: false,
      error: "Insufficient tokens"
    };
  }

  return {
    success: true,
    artistId,
    reserved: amount,
    remainingBalance: wallet.balance - amount
  };
}

/**
 * Release reserved tokens after a failed generation.
 */
export async function releaseTokens(
  artistId,
  amount,
  db
) {
  if (!artistId) {
    throw new Error("Artist ID is required");
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Invalid token amount");
  }

  return {
    success: true,
    artistId,
    released: amount
  };
}
