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
