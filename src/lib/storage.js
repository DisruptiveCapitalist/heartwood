// Everything the learner writes lives here. One key per lesson, namespaced by
// course so a second subject cannot collide with Physics I.
//
// This is deliberately the ONLY module that touches localStorage. When the time
// comes to put the journal somewhere sturdier than a browser profile, this file
// is the seam.

const PREFIX = 'heartwood.v1'

export const lessonKey = (courseId, lessonId) => `${PREFIX}.${courseId}.${lessonId}`

export function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** Every Heartwood key currently stored, as one plain object. */
export function readAll() {
  const out = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(PREFIX + '.')) out[k] = read(k)
    }
  } catch { /* private window, blocked storage — an empty export is honest */ }
  return out
}

/** A human-readable copy of the journal, for keeping outside the browser. */
export function journalText(course, entries) {
  const lines = [
    course.title,
    course.subtitle,
    '',
    `Journal exported ${new Date().toLocaleDateString()}`,
    ''
  ]
  for (const e of entries) {
    lines.push(e.label, '', e.text, '', '—'.repeat(40), '')
  }
  return lines.join('\n')
}

export function download(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
