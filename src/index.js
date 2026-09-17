export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          name: "DDRT MUSIC GPT Backend",
          version: "1.0.0",
          status: "online"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (url.pathname === "/api/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "DDRT MUSIC GPT Backend",
          version: "1.0.0"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Route not found"
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
