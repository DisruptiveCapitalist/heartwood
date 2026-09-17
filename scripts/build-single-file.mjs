// Produces one self-contained HTML file: no server, no install, no network.
// Double-clicking it opens Heartwood in the default browser.
//
//   node scripts/build-single-file.mjs
//
// The learner's writing is saved by the browser against that file's location,
// so keep the file where it is once you start using it.

import { execFileSync } from 'node:child_process'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'dist-single')

execFileSync('npx', ['vite', 'build', '--config', 'vite.single.config.js'], { cwd: root, stdio: 'inherit' })

const html = await readFile(resolve(out, 'index.html'), 'utf8')
const js = await readFile(resolve(out, 'app.js'), 'utf8')
const css = await readFile(resolve(out, 'app.css'), 'utf8')

// Inlining a bundle into an HTML page has two traps, and Heartwood hit both.
//
// 1. `String.replace` with a string replacement reads $&, $`, $' and $1 inside
//    it as backreferences. Minified React contains `.replace(wt,"$&/")`, which
//    put the literal text `</body>` in the middle of the bundle. Every
//    replacement below passes a FUNCTION, which is taken verbatim.
//
// 2. Worse, and invisible: React's bundle contains the string "<script>". Inside
//    script data the HTML parser sees that and switches to its double-escaped
//    state, where the next `</script>` no longer ends the element — so the real
//    closing tag was swallowed along with the rest of the page and the browser
//    tried to parse `</body></html>` as JavaScript. Blank page, one SyntaxError,
//    and nothing in the source that looks wrong.
//
//    The fix is the one every bundler uses: escape the three sequences that can
//    move the parser out of plain script data. `\x3C` is `<` in a string, a
//    template literal and a regular expression alike, so every value in the
//    bundle is unchanged — only the bytes the HTML parser scans are different.
const escapeForInlineScript = (code) => code
  .replaceAll('<script', '\\x3Cscript')
  .replaceAll('</script', '\\x3C/script')
  .replaceAll('<!--', '\\x3C!--')

const safeJs = escapeForInlineScript(js)
const safeCss = css.replaceAll('</style', '\\00003C/style')

const single = html
  .replace(/<script[^>]*src="[^"]*app\.js"[^>]*><\/script>/, () => '')
  .replace(/<link[^>]*href="[^"]*app\.css"[^>]*>/, () => `<style>${safeCss}</style>`)
  .replace('</body>', () => `<script>${safeJs}</script>\n</body>`)

// Structural checks. Either bug above would have been caught here.
const once = (needle, label) => {
  const n = single.split(needle).length - 1
  if (n !== 1) throw new Error(`Expected exactly one ${label}, found ${n} — the page was corrupted while inlining.`)
}
once('</body>', '</body>')
once('</html>', '</html>')
once('<script>', 'opening <script> tag')
once('</script>', 'closing </script> tag')
if (!single.includes('id="root"')) throw new Error('The inlined page lost its mount point.')
if (!single.includes('createRoot')) throw new Error('The bundle was not inlined.')
if (/(src|href)="(?!data:)[a-zA-Z0-9./]/.test(single)) {
  throw new Error('Something in the page still points outside it; this file has to stand alone.')
}

const file = resolve(root, 'Heartwood - Physics I.html')
await writeFile(file, single)
await rm(out, { recursive: true, force: true })

const kb = (Buffer.byteLength(single) / 1024).toFixed(0)
console.log(`\nWrote "Heartwood - Physics I.html" (${kb} KB). One file — email it, double-click it.`)
