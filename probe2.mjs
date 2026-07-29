import { chromium } from '@playwright/test';
for (const [name, opts] of [
  ['default (headless shell)', {}],
  ['channel: chromium (full)', { channel: 'chromium' }],
]) {
  try {
    const b = await chromium.launch(opts);
    const p = await b.newPage();
    const r = await p.goto('http://127.0.0.1:3000/robots.txt', { timeout: 10000 });
    console.log(name, '->', r?.status());
    await b.close();
  } catch (e) { console.log(name, '-> FAIL', e.message.split('\n')[0].slice(0, 55)); }
}
