
import MockDate from 'mockdate'
import dayjs from 'dayjs'
import jalali from '../src'

dayjs.extend(jalali)
dayjs.calendar('jalali')

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Extend dayjs', () => {
  expect(dayjs.$C).toBeDefined()
  expect(dayjs.$C).toEqual('jalali')
  expect(dayjs().$jy).toBeDefined()
})

it('Setting calendar converts date', () => {
  const date = dayjs('1397/06/13', { jalali: true }).calendar('gregory')
  expect(date.$y).toEqual(2018)
  expect(date.$M).toEqual(8)
  expect(date.$D).toEqual(4)

  const date2 = dayjs('2018/09/04').calendar('jalali')
  expect(date2.$jy).toEqual(1397)
  expect(date2.$jM).toEqual(5)
  expect(date2.$jD).toEqual(13)
})

describe('Parse Valid String', () => {
  // 2018-09-04
  const date = dayjs('1397/06/13', { jalali: true })

  test('valid jalali date', () => {
    expect(date.year()).toEqual(1397)
    expect(date.month()).toEqual(5)
    expect(date.date()).toEqual(13)
  })

  const date2 = dayjs('1397/06', { jalali: true })

  test('valid jalali date without day', () => {
    expect(date2.year()).toEqual(1397)
    expect(date2.month()).toEqual(5)
    expect(date2.date()).toEqual(1)
  })

  const gregory = date.calendar('gregory')

  test('convert to gregory', () => {
    expect(gregory.year()).toEqual(2018)
    expect(gregory.month()).toEqual(8)
    expect(gregory.date()).toEqual(4)
  })
})

it('Parse invalid String', () => {
  const date = dayjs('', { jalali: true })
  expect(date.year()).toBeNaN()

  const date2 = dayjs(null, { jalali: true })
  expect(date2.year()).toBeNaN()
})

it('startOfMonth', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(1)
})

it('endOfMonth - months with 31 days', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.endOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(31)
})

it('endOfMonth - months with 30 days', () => {
  const date = dayjs('1397/07/13', { jalali: true })
  const date2 = date.endOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(30)
})

it('endOfMonth - months with 29 days', () => {
  const date = dayjs('1397/12/13', { jalali: true })
  const date2 = date.endOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(29)
})

it('endOfMonth - months with 29 days - leap year', () => {
  const date = dayjs('1399/12/13', { jalali: true })
  const date2 = date.endOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(30)
})

it('startOfYear', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('year')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(0)
  expect(date2.date()).toEqual(1)
})

it('endOfYear', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.endOf('year')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(11)
  expect(date2.date()).toEqual(29)
})

it('endOfYear - leap year', () => {
  const date = dayjs('1399/06/13', { jalali: true })
  const date2 = date.endOf('year')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(11)
  expect(date2.date()).toEqual(30)
})

it('startOfWeek', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('week')
  expect(date2.day()).toEqual(6)
})

it('endOfWeek', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.endOf('week')
  expect(date2.day()).toEqual(5)
})

it('dayInMonth, months with 31 days', () => {
  expect(dayjs('1397/06/13', { jalali: true }).daysInMonth()).toEqual(31)
  expect(dayjs('1396/05/13', { jalali: true }).daysInMonth()).toEqual(31)
  expect(dayjs('1395/04/13', { jalali: true }).daysInMonth()).toEqual(31)
  expect(dayjs('1393/03/13', { jalali: true }).daysInMonth()).toEqual(31)
  expect(dayjs('1392/02/13', { jalali: true }).daysInMonth()).toEqual(31)
  expect(dayjs('1391/01/13', { jalali: true }).daysInMonth()).toEqual(31)
})

it('dayInMonth, months with 30 days', () => {
  expect(dayjs('1397/11/13', { jalali: true }).daysInMonth()).toEqual(30)
  expect(dayjs('1396/10/13', { jalali: true }).daysInMonth()).toEqual(30)
  expect(dayjs('1395/09/13', { jalali: true }).daysInMonth()).toEqual(30)
  expect(dayjs('1394/08/13', { jalali: true }).daysInMonth()).toEqual(30)
  expect(dayjs('1393/07/13', { jalali: true }).daysInMonth()).toEqual(30)
})

it('dayInMonth - months with 29 days in leap years', () => {
  const date = dayjs('1399/12/13', { jalali: true })
  expect(date.daysInMonth()).toEqual(30)
})

it('dayInMonth - months with 29 days', () => {
  const date = dayjs('1397/12/13', { jalali: true })
  expect(date.daysInMonth()).toEqual(29)
})

it('format', () => {
  expect(dayjs('2018/09/03').calendar('gregory').format('YYYY/MM/DD')).toEqual('2018/09/03')

  const date = dayjs('1397/06/13', { jalali: true })
  expect(date.format()).toEqual('1397-06-13T00:00:00+04:30')
  expect(date.format('[Unformatted text]')).toEqual('Unformatted text')
  expect(date.format('YY')).toEqual(String(97))
  expect(date.format('YYYY')).toEqual(String(1397))
  expect(date.format('M')).toEqual('6')
  expect(date.format('MM')).toEqual('06')
  expect(date.format('MMM')).toEqual('Sha')
  expect(date.format('MMMM')).toEqual('Shahrivar')
  expect(date.locale('fa').format('MMMM')).toEqual('شهریور')
  expect(date.format('DD')).toEqual('13')
  expect(date.format('D')).toEqual('13')
  expect(date.format('W')).toEqual('W')
  expect(date.format('HH')).toEqual('00')
})

describe('add two date', () => {
  let a = null
  let b = null

  beforeEach(() => {
    a = dayjs('1397/06/01', { jalali: true })
    b = dayjs('1397/09/10', { jalali: true })
  })

  it('add date', () => {
    expect(a.add(100, 'day')).toEqual(b)
  })
})

describe('diff two date', () => {
  const a = dayjs('1397/06/01', { jalali: true })
  const b = dayjs('1397/09/10', { jalali: true })

  it('diff(float)', () => {
    expect(a.diff(b, 'month', true)).toEqual(-3.3)
  })

  it('diff(month)', () => {
    expect(a.diff(b, 'month', false)).toEqual(-3)
  })

  it('diff(day)', () => {
    expect(a.diff(b, 'day')).toEqual(-100)
  })

  it('diff(day): a gregory and jalali', () => {
    expect(a.calendar('gregory').diff(b, 'day')).toEqual(-100)
  })

  it('diff(year)', () => {
    expect(a.diff(b, 'year')).toEqual(0)
  })
})

describe('subtract', () => {
  test('subtract 1 ms', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    const date2 = date.subtract(1, 'ms')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() - 1)
    expect(date2.$ms).toEqual(999)
  })

  test('subtract 1 day in the middle of the month', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    const date2 = date.subtract(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() - 1)
  })

  test('subtract 1 day in the beginning of the month', () => {
    const date = dayjs('1397/06/01', { jalali: true })
    const date2 = date.subtract(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() - 1)
    expect(date2.date()).toEqual(31)
  })

  test('subtract 1 month in the middle of the year', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    const date2 = date.subtract(1, 'month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() - 1)
    expect(date2.date()).toEqual(date.date())
  })

  test('subtract 1 month in the beginning of the year', () => {
    const date = dayjs('1397/01/13', { jalali: true })
    const date2 = date.subtract(1, 'month')
    expect(date2.year()).toEqual(date.year() - 1)
    expect(date2.month()).toEqual(11)
    expect(date2.date()).toEqual(date.date())
  })

  test('subtract 1 year', () => {
    const date = dayjs('1397/01/13', { jalali: true })
    const date2 = date.subtract(1, 'year')
    expect(date2.year()).toEqual(date.year() - 1)
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date())
  })
})

describe('add', () => {
  test('add 1 day in the middle of the month', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    const date2 = date.add(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date() + 1)
  })

  test('add 1 day in the end of the month', () => {
    const date = dayjs('1397/06/31', { jalali: true })
    const date2 = date.add(1, 'day')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() + 1)
    expect(date2.date()).toEqual(1)
  })

  test('add 1 month in the middle of the year', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    const date2 = date.add(1, 'month')
    expect(date2.year()).toEqual(date.year())
    expect(date2.month()).toEqual(date.month() + 1)
    expect(date2.date()).toEqual(date.date())
  })

  test('add 1 month in the end of the year', () => {
    const date = dayjs('1397/12/13', { jalali: true })
    const date2 = date.add(1, 'month')
    expect(date2.year()).toEqual(date.year() + 1)
    expect(date2.month()).toEqual(0)
    expect(date2.date()).toEqual(date.date())
  })

  test('add 1 year', () => {
    const date = dayjs('1397/12/13', { jalali: true })
    const date2 = date.add(1, 'year')
    expect(date2.year()).toEqual(date.year() + 1)
    expect(date2.month()).toEqual(date.month())
    expect(date2.date()).toEqual(date.date())
  })
})

describe('toArray', () => {
  test('Convert date to array', () => {
    const date = dayjs('2018/09/03').calendar('gregory')
    expect(date.toArray()).toEqual([2018, 8, 3, 0, 0, 0, 0])
  })

  test('Convert date to array', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    expect(date.toArray()).toEqual([1397, 5, 13, 0, 0, 0, 0])
  })
})
