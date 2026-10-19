import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// React silently drops a CSS property written as an SVG attribute — no error,
// no warning in production, the styling just never applies. `fontVariantNumeric`
// has been written that way three separate times in this engine, each time
// leaving a readout whose digits jump about as the number changes, and each time
// it was found by reading a console warning rather than by anything failing.
//
// Hyphenated SVG attributes have the same problem from the other direction:
// React wants the camelCase form for most of them.
// Only the ones React genuinely rejects. letterSpacing, textAnchor, fontFamily
// and friends are real SVG presentation attributes and belong as attributes —
// listing them here would be a test that punishes correct code.
const CSS_ONLY = ['fontVariantNumeric', 'textWrap', 'whiteSpace', 'boxShadow']

function jsxFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name)
    return e.isDirectory() ? jsxFiles(path) : e.name.endsWith('.jsx') ? [path] : []
  })
}

describe('SVG attributes', () => {
  const files = jsxFiles('src/engine')

  it('finds the engine source to check', () => {
    expect(files.length).toBeGreaterThan(10)
  })

  for (const file of files) {
    const source = readFileSync(file, 'utf8')

    it(`${file} writes CSS-only properties in style, not as attributes`, () => {
      const offenders = CSS_ONLY.filter((p) => source.includes(`${p}="`))
      expect(offenders).toEqual([])
    })

    it(`${file} has no hyphenated SVG attributes`, () => {
      const hits = source.match(/\b(?:fill|stroke|font|text|clip|stop)-[a-z-]+="/g) ?? []
      expect(hits).toEqual([])
    })
  }
})
