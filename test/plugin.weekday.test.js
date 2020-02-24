import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import jalali from '../src'

dayjs.extend(weekday)
dayjs.extend(jalali)

it('Should return correct weekday', () => {
  // پنج‌شنبه ۱ اسفند ۱۳۹۸
  const date = dayjs('1398-12-01', { jalali: true }).locale('fa')

  expect(date.day()).toBe(4)
  expect(date.weekday()).toBe(5)
})
