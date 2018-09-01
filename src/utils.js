const padStart = (string, length, pad) => {
  const s = String(string)
  if (!s || s.length >= length) return string
  return `${Array((length + 1) - s.length).join(pad)}${string}`
}

const monthDiff = (a, b) => {
  // function from moment.js in order to keep the same result
  const wholeMonthDiff = ((b.Year() - a.Year()) * 12) + (b.Month() - a.Month())
  const anchor = a.clone().add(wholeMonthDiff, 'months')
  const c = b - anchor < 0
  const anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), 'months')
  return Number(-(wholeMonthDiff + ((b - anchor) / (c ? (anchor - anchor2) : (anchor2 - anchor)))))
}

const absFloor = n => (n < 0 ? Math.ceil(n) || 0 : Math.floor(n))

const prettyUnit = u => (u && String(u).toLowerCase().replace(/s$/, ''))

const isUndefined = s => s === void 0 // eslint-disable-line no-void

export default {
  padStart,
  monthDiff,
  absFloor,
  prettyUnit,
  isUndefined
}

