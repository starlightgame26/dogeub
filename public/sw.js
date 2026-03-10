importScripts("portal/uv.bundle.js");
importScripts("portal/uv.config.js");
importScripts("portal/uv.sw.js");

const uv = new UVServiceWorker;

async function handleRequest(t) {
    return uv.route(t) ? await uv.fetch(t) : await fetch(t.request);
}

self.addEventListener("fetch", (t => {
    const url = new URL(t.request.url);

    // 🔥 BLOCK the video
    if (url.hostname === "nowgg.fun" && url.pathname === "/loading.mp4") {
        t.respondWith(new Response("", { status: 204 }));
        return;
    }

    // continue normally
    t.respondWith(handleRequest(t));
}));
