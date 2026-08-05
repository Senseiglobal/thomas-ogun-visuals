const notConfigured = new Response("Portfolio assets are not configured.", { status: 503 });

const worker = {
  async fetch(request, env) {
    if (!env?.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return notConfigured;
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
