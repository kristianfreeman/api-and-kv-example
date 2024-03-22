# api-and-kv-example

Example application used in the Workers 201 video course, "Managing Data in your Workers Application".

## Usage

This example application shows how to set up an endpoint that requests data from GitHub. It transparently caches that data using KV.

1. `GET /repos/:username`: get the repo data from GitHub for a given username, and return it as JSON.

## Configuration

1. Create a new KV namespace:

```sh
$ npx wrangler kv:namespace create api-and-kv-example
```

2. Add the configuration details to your `wrangler.toml` file:

```toml
[[kv_namespaces]]
binding = "KV"
id = "your-kv-namespace-id"
```

3. Deploy your application:

```sh
$ npx wrangler deploy
```

4. Make a request to your Worker:

```sh
$ http https://worker-url.dev/repos/cloudflare
```

_The initial request will take a few seconds to complete, but subsequent requests should be faster as the data is cached in KV._
