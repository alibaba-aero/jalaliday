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


it('endOfWeek', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.endOf('week')
  expect(date2.day()).toEqual(5)
})
