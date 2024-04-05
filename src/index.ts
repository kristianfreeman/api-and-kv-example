import { Hono } from "hono";
type Bindings = { KV: KVNamespace };
const app = new Hono<{ Bindings: Bindings }>();

app.get("/repos/:username", async (c) => {
  const username = c.req.param("username");
  const cached = await c.env.KV.get(`repos:${username}`, "json");

  if (cached) {
    return c.json(cached);
  } else {
    const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        "User-Agent": "CF Workers",
      },
    });
    const data = await resp.json();
    await c.env.KV.put(`repos:${username}`, JSON.stringify(data), {
      expirationTtl: 60,
    });
    return c.json(data);
  }
});

export default app;
