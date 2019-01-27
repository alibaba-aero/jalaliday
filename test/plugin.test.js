
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

it('startOfYear', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('year')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(0)
  expect(date2.date()).toEqual(1)
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


it('dayInMonth', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  expect(date.daysInMonth()).toEqual(31)
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

