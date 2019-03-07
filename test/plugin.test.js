
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
  const date = dayjs('1397/06/13', { jalali: true })
  expect(date.format('YY')).toEqual(String(97))
  expect(date.format('YYYY')).toEqual(String(1397))
  expect(date.format('M')).toEqual('6')
  expect(date.format('MM')).toEqual('06')
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
  let a = null
  let b = null

  beforeEach(() => {
    a = dayjs('1397/06/01', { jalali: true })
    b = dayjs('1397/09/10', { jalali: true })
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
