(async () => {
    const chSel = 'a[href^="/@"], a[href^="/channel/"], a[href^="/c/"], a[href^="/user/"]';
    const root = document.querySelector('ytd-browse #primary') || document.querySelector('#primary') || document;
    const vidId = a => { try { return new URL(a.href).searchParams.get('v'); } catch { return null; } };
    const countVideos = () => new Set([...root.querySelectorAll('a[href*="/watch?v="]')].map(vidId).filter(Boolean)).size;

    // 1. scroll so that all videos show 
    let prev = -1, stable = 0;
    while (stable < 4) {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => setTimeout(r, 1200));
        const n = countVideos();
        stable = n === prev ? stable + 1 : 0;
        prev = n;
        console.log('Uploaded videos:', n);
    }
    window.scrollTo(0, 0);

    // 2. for every video find its url
    const channels = new Map();
    for (const w of root.querySelectorAll('a[href*="/watch?v="]')) {
        let el = w;
        for (let i = 0; i < 8 && el.parentElement; i++) {
            el = el.parentElement;
            const vids = new Set([...el.querySelectorAll('a[href*="/watch?v="]')].map(vidId));
            if (vids.size > 1) break; // go out of video card
            const cl = [...el.querySelectorAll(chSel)];
            if (cl.length) {
                const a = cl.find(x => x.textContent.trim()) || cl[0];
                const parts = decodeURIComponent(new URL(a.href).pathname).split('/').filter(Boolean);
                const id = parts[0].startsWith('@') ? parts[0] : parts.slice(0, 2).join('/');
                const key = id.toLowerCase();
                if (!channels.has(key)) channels.set(key, { name: a.textContent.trim() || id, url: `https://www.youtube.com/${id}` });
                break;
            }
        }
    }

    const list = [...channels.values()];
    console.log(`Video: ${countVideos()}, unique channels: ${list.length}`);
    console.table(list);

    const LIMIT = 40; // 40 links open at a time
    const start = 0;  // 40,80,120,.etc
    const batch = list.slice(start, start + LIMIT);

    if (!confirm(`Unique channels: ${list.length}. Open ${batch.length} (с ${start})?`)) return;
    for (const { url } of batch) window.open(url, '_blank', 'noopener');
})();
