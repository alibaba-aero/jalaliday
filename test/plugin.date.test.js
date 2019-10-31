import dayjs from 'dayjs'
import jalali from '../src'

dayjs.extend(jalali)

it('Should set currect date', () => {
  const d1 = dayjs('1398-08-09', { jalali: true })
  const d2 = dayjs('1398-08-10', { jalali: true }).calendar('jalali').date(9)

  expect(d1.isSame(d2)).toBeTruthy()
})
