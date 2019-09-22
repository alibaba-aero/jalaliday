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

it('add 1 day in the middle of the month', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.add(1, 'day')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(date.date() + 1)
})

it('add 1 day in the end of the month', () => {
  const date = dayjs('1397/06/31', { jalali: true })
  const date2 = date.add(1, 'day')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month() + 1)
  expect(date2.date()).toEqual(1)
})

it('add 1 month in the middle of the year', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.add(1, 'month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month() + 1)
  expect(date2.date()).toEqual(date.date())
})

it('add 1 month in the end of the year', () => {
  const date = dayjs('1397/12/13', { jalali: true })
  const date2 = date.add(1, 'month')
  expect(date2.year()).toEqual(date.year() + 1)
  expect(date2.month()).toEqual(0)
  expect(date2.date()).toEqual(date.date())
})

it('add 1 year', () => {
  const date = dayjs('1397/12/13', { jalali: true })
  const date2 = date.add(1, 'year')
  expect(date2.year()).toEqual(date.year() + 1)
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(date.date())
})

test('add 11 months in the middle of the year', () => {
  const date = dayjs('1396/06/13', { jalali: true })
  const date2 = date.add(11, 'month')
  expect(date2.year()).toEqual(date.year() + 1)
  expect(date2.month()).toEqual(date.month() - 1)
  expect(date2.date()).toEqual(date.date())
})

describe('add 100 days', () => {
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

describe('add 1 month in shahrivar 31th', () => {
  let a = null
  let b = null

  beforeEach(() => {
    a = dayjs('1397/06/31', { jalali: true })
    b = dayjs('1397/07/30', { jalali: true })
  })

  it('add date', () => {
    expect(a.add(1, 'month')).toEqual(b)
  })
})
