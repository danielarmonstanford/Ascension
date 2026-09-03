const host = "www.ascensionsenses.com";
const key = "a7c4e9182b6f43d0ac51e79b8f236d04";
const paths = ["/", "/about", "/dien-chan", "/attend", "/facilitate"];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: paths.map((path) => `https://${host}${path}`),
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed (${response.status}): ${body}`);
}

console.log(`Submitted ${paths.length} ASCENSION URLs to IndexNow (${response.status}).`);
