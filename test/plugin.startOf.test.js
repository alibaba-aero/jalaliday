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

it('startOfMonth', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('month')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(date.month())
  expect(date2.date()).toEqual(1)
})

it('startOfWeek', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('week')
  expect(date2.day()).toEqual(6)
})

it('startOfYear', () => {
  const date = dayjs('1397/06/13', { jalali: true })
  const date2 = date.startOf('year')
  expect(date2.year()).toEqual(date.year())
  expect(date2.month()).toEqual(0)
  expect(date2.date()).toEqual(1)
})
