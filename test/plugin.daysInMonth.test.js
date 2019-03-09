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
