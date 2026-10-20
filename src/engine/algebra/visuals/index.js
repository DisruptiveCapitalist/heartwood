import Balance from './Balance.jsx'
import Pattern from './Pattern.jsx'
import NumberLine from './NumberLine.jsx'
import Expression from './Expression.jsx'

// A lesson's SEE IT names one of these by id. Six exist in the handoff; the
// other two — `machine` and `generic` — arrive with Weeks 2 and 3, and
// `generic` alone serves twenty-one of the thirty lessons.
export const visuals = {
  balance: Balance,
  pattern: Pattern,
  numberline: NumberLine,
  expression: Expression
}

export const getVisual = (id) => visuals[id] ?? null
