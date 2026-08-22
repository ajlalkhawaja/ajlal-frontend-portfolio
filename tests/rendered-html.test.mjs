import assert from "node:assert/strict";
import test from "node:test";

test("renders the portfolio identity and primary actions", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Ajlal Haider \| Senior Frontend Engineer<\/title>/i);
  assert.match(html, /digital products people <em>trust\.<\/em>/i);
  assert.match(html, /Senior Frontend Engineer<\/span>I build/i);
  assert.match(html, /Central Bank UAE/i);
  assert.match(html, /View LinkedIn profile/i);
  assert.match(html, /class="projectDirectory"/i);
  assert.match(html, /All six projects are available below/i);
  assert.match(html, /Client-side Cheque OCR/i);
  assert.match(html, /Explore case study/i);
  assert.match(html, /href="https:\/\/github\.com\/ajlalkhawaja"/i);
  assert.match(html, /href="\/Ajlal_Haider_Senior_Frontend_Engineer_Resume\.pdf"/i);
  assert.match(html, /src="\/ajlal-haider\.png"/i);
  assert.doesNotMatch(html, /\/_vinext\/image/i);
  assert.match(html, /<meta property="og:image"[^>]+og\.png/i);
});
