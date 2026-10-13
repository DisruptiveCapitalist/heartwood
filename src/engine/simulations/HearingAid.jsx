import { useState } from 'react'

// Lesson 23. What is actually happening inside the learner's own hearing aids.
//
// The point the lesson has to land is why turning everything up does not work.
// Age-related loss is not a single missing volume — it is a slope, mild at the
// bottom and steep at the top. Flat amplification therefore overshoots the
// bass, which was fine, while still undershooting the consonants, which were
// not. Matching the gain to the shape of the loss is the entire job, and the
// two buttons let the learner hear the difference as a picture.
//
// The numbers are decibels: representative conversational speech, and a typical
// gently sloping high-frequency loss. They are illustrative, and the caption
// says so.

const BANDS = [
  { hz: '250', label: 'low hum',    speech: 58, loss: 10, carries: 'vowels, warmth' },
  { hz: '500', label: '',           speech: 62, loss: 15, carries: 'vowels' },
  { hz: '1k',  label: '',           speech: 60, loss: 25, carries: 'most of the loudness' },
  { hz: '2k',  label: '',           speech: 52, loss: 40, carries: 'clarity' },
  { hz: '4k',  label: '',           speech: 44, loss: 55, carries: 's, f, th' },
  { hz: '8k',  label: 'high hiss',  speech: 38, loss: 65, carries: 's, t, sh' }
]

const COMFORT = 95      // above this it stops being helpful and starts hurting
const AUDIBLE = 0       // heard level at or below zero means it never arrives

export default function HearingAid() {
  const [mode, setMode] = useState('off')     // off | flat | matched
  const [volume, setVolume] = useState(30)

  const gainFor = (b) =>
    mode === 'off' ? 0
      : mode === 'flat' ? volume
        : Math.max(0, b.loss - 8) * (volume / 30) * 0.9

  const rows = BANDS.map((b) => {
    const gain = gainFor(b)
    const heard = b.speech + gain - b.loss
    return { ...b, gain, heard, tooLoud: b.speech + gain > COMFORT, missing: heard <= AUDIBLE + 6 }
  })

  const missing = rows.filter((r) => r.missing)
  const blasting = rows.filter((r) => r.tooLoud)

  const verdict =
    mode === 'off'
      ? 'Unaided. The low notes arrive; the consonants at the top do not, which is why speech sounds mumbled rather than quiet.'
      : mode === 'flat'
        ? (blasting.length
          ? `Everything up by the same amount. The bottom end is now uncomfortably loud${missing.length ? ', and the consonants are still not getting through' : ''}. Louder is not clearer.`
          : 'Everything up by the same amount — but the bands that were already fine get the same boost as the ones that were not.')
        : (missing.length
          ? 'Shaped to the loss, and most of it is through. Turn it up a little further.'
          : 'Shaped to the loss: a lot at the top where it was missing, very little at the bottom where it was not. The consonants arrive without the bass shouting.')

  const barH = (db) => Math.max(2, Math.min(100, db) * 1.1)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Sounds not getting through</span>
          <span className="hw-readout-num" style={{ color: missing.length ? 'var(--brake)' : 'var(--green)' }}>
            {missing.length}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> of 6 bands</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, marginTop: 4 }}>
            {missing.length
              ? `Missing: ${missing.map((m) => m.carries).join('; ')}.`
              : 'All six bands are arriving.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 262, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">The signal chain</span>
          <span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            sound → microphone → split into bands → each band turned up by its own amount → speaker → ear
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: blasting.length ? 'var(--brake)' : 'var(--muted)', minHeight: 48, lineHeight: 1.5 }}>
            {verdict}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`Six frequency bands of speech. ${missing.length} of them are not reaching the ear.`}
      >
        <div style={{ position: 'absolute', inset: '18px 24px 56px 24px', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          {rows.map((r) => (
            <div key={r.hz} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 128 }}>
                {/* what the voice sends */}
                <div style={{ width: 13, height: barH(r.speech), background: 'var(--rule)', borderRadius: '2px 2px 0 0' }} />
                {/* what the ear can no longer pick up */}
                <div style={{ width: 13, height: barH(r.loss), background: '#e4d2cc', borderRadius: '2px 2px 0 0' }} />
                {/* what actually gets through */}
                <div style={{
                  width: 13, height: barH(Math.max(0, r.heard)),
                  background: r.missing ? 'var(--brake)' : r.tooLoud ? 'var(--warn)' : 'var(--green)',
                  borderRadius: '2px 2px 0 0'
                }} />
              </div>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, color: 'var(--label)' }}>{r.hz}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--muted)', textAlign: 'center', minHeight: 24, lineHeight: 1.3 }}>
                {r.carries}
              </span>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 14, display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: 'var(--sans)', fontSize: 11.5, color: 'var(--muted)' }}>
          <span><span style={{ display: 'inline-block', width: 11, height: 8, background: 'var(--rule)', marginRight: 6 }} />what the voice sends</span>
          <span><span style={{ display: 'inline-block', width: 11, height: 8, background: '#e4d2cc', marginRight: 6 }} />what your ear has lost</span>
          <span><span style={{ display: 'inline-block', width: 11, height: 8, background: 'var(--green)', marginRight: 6 }} />what gets through</span>
          <span style={{ flex: 1 }} />
          <span>Representative figures, not an audiogram.</span>
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['off', 'Aid off'], ['flat', 'Turn everything up'], ['matched', 'Match the loss']].map(([id, label]) => (
            <button key={id} className="hw-btn" onClick={() => setMode(id)} aria-pressed={mode === id}
              style={{
                padding: '12px 16px', letterSpacing: '.04em',
                borderColor: mode === id ? 'var(--accent)' : 'var(--field)',
                background: mode === id ? 'var(--accent-wash-2)' : 'var(--paper)',
                color: mode === id ? 'var(--ink)' : 'var(--ink-3)'
              }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
          <label htmlFor="hw-vol-aid" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            How much · {volume} dB
          </label>
          <input id="hw-vol-aid" type="range" min="0" max="60" step="2"
            value={volume} disabled={mode === 'off'}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: 200, accentColor: 'var(--accent)', height: 28, opacity: mode === 'off' ? 0.4 : 1 }} />
        </div>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 260, textAlign: 'right' }}>
          Try "turn everything up" first, and watch the bottom two bands.
        </span>
      </div>
    </div>
  )
}
