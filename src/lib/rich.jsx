import React from 'react'
import { useLearner } from './learner.jsx'

// Lesson copy is plain JS strings, so it needs a way to carry the two inline
// emphases the design uses — and only those two. **bold** and *italic*.
// No HTML in content files means no dangerouslySetInnerHTML anywhere.
//
// Copy may also address the learner with {name}.

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*)/g

/**
 * Substitutes {name}. When there is no name, the token disappears along with the
 * comma that was addressing them, and the sentence is re-capitalised:
 *
 *   "{name}, look at this."  ->  "Dennis, look at this."
 *                            ->  "Look at this."
 */
export function fill(text, name) {
  const s = String(text ?? '')
  if (!s.includes('{name}')) return s
  if (name) return s.replaceAll('{name}', name)
  return s
    .replace(/\{name\}\s*,\s*/g, '')
    .replaceAll('{name}', '')
    .replace(/  +/g, ' ')
    .replace(/^(\s*)([a-z])/, (_, space, letter) => space + letter.toUpperCase())
}

export function Rich({ text }) {
  const { name } = useLearner()
  if (text == null || text === '') return null

  const filled = fill(text, name)
  const parts = filled.split(TOKEN)

  return (
    <>
      {parts.map((p, i) => {
        if (p.length > 4 && p.startsWith('**') && p.endsWith('**')) {
          return <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>
        }
        if (p.length > 2 && p.startsWith('*') && p.endsWith('*')) {
          return <em key={i}>{p.slice(1, -1)}</em>
        }
        return <React.Fragment key={i}>{p}</React.Fragment>
      })}
    </>
  )
}

/** The same string with its markup removed — for aria-labels and exports. */
export function plain(text, name = '') {
  return fill(text, name).replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
}
