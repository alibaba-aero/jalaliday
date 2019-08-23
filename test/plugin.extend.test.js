import MockDate from 'mockdate'
import dayjs from 'dayjs'
import jalali from '../src'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('same functionality after extend', () => {
  const originalToday = dayjs()
  const originalTomorrow = dayjs().add(1, 'day')
  const originalYesterday = dayjs().subtract(1, 'day')
  // extend
  dayjs.extend(jalali)


  const extendedToday = dayjs()
  const extendedTomorrow = dayjs().add(1, 'day')
  const extendedYesterday = dayjs().subtract(1, 'day')

  expect(originalToday.isSame(extendedToday, 'day')).toEqual(true)
  expect(originalTomorrow.isSame(extendedTomorrow, 'day')).toEqual(true)
  expect(originalYesterday.isSame(extendedYesterday, 'day')).toEqual(true)
})
