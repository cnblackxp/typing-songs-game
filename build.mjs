// Builds index.html (a standalone page with its own document shell) from game.html,
// which is written as an Artifact page body (the Artifact publisher adds the shell itself).
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('./game.html', import.meta.url), 'utf8');
const headRe = /^(?:\s*(?:<title>[^<]*<\/title>|<meta[^>]*>|<link[^>]*>))+/;
const m = src.match(headRe);
const head = m ? m[0].trim() : '';
const body = m ? src.slice(m[0].length) : src;
const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
${head}
</head>
<body>
${body.trim()}
</body>
</html>
`;
writeFileSync(new URL('./index.html', import.meta.url), out);
console.log('index.html written', out.length, 'bytes');
