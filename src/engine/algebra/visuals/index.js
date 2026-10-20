import Balance from './Balance.jsx'
import Pattern from './Pattern.jsx'
import NumberLine from './NumberLine.jsx'
import Expression from './Expression.jsx'
import Generic from './Generic.jsx'
import Machine from './Machine.jsx'

// A lesson's SEE IT names one of these by id. All six the handoff specifies
// are here, so every one of the thirty lessons has its visual. `generic` alone
// serves twenty-one of them: the content supplies the controls and a pure
// render function, and the component supplies the mechanics.
export const visuals = {
  balance: Balance,
  pattern: Pattern,
  numberline: NumberLine,
  expression: Expression,
  generic: Generic,
  machine: Machine
}

export const getVisual = (id) => visuals[id] ?? null
