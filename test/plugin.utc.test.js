import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import jalali from '../src'

dayjs.extend(utc)
dayjs.extend(jalali)

it('Should respect utc', () => {
  const date = dayjs.utc().calendar('jalali')

  expect(date.isUTC()).toBe(true)
})
