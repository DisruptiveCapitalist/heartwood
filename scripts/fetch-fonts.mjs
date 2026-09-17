// Downloads the two Google fonts the design uses into src/fonts/, so Heartwood
// runs with no network at all. Run once: `node scripts/fetch-fonts.mjs`
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../src/fonts')

// A modern user agent gets woff2 with unicode-range subsets; asking as an older
// one gets a single, complete file per face, which is what we want offline.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'

const FACES = [
  { name: 'newsreader-roman', css: 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600&display=swap' },
  { name: 'newsreader-italic', css: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400;1,6..72,500&display=swap' },
  { name: 'publicsans-roman', css: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap' }
]

await mkdir(outDir, { recursive: true })

for (const face of FACES) {
  const css = await (await fetch(face.css, { headers: { 'User-Agent': UA } })).text()
  const url = css.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1]
  if (!url) {
    console.error(`  ! no woff2 found for ${face.name}`)
    continue
  }
  const bytes = Buffer.from(await (await fetch(url)).arrayBuffer())
  await writeFile(resolve(outDir, face.name + '.woff2'), bytes)
  console.log(`  ${face.name}.woff2  ${(bytes.length / 1024).toFixed(0)} KB`)
}

console.log('Fonts are in src/fonts/. Nothing else to do.')
