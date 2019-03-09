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

it('format', () => {
  expect(dayjs('2018/09/03').calendar('gregory').format('YYYY/MM/DD')).toEqual('2018/09/03')

  const date = dayjs('1397/06/13', { jalali: true })
  expect(date.format()).toContain('1397-06-13T00:00:00+')
  expect(date.format('[Unformatted text]')).toEqual('Unformatted text')
  expect(date.format('YY')).toEqual(String(97))
  expect(date.format('YYYY')).toEqual(String(1397))
  expect(date.format('M')).toEqual('6')
  expect(date.format('MM')).toEqual('06')
  expect(date.format('MMM')).toEqual('Sha')
  expect(date.format('MMMM')).toEqual('Shahrivar')
  expect(date.locale('fa').format('MMMM')).toEqual('شهریور')
  expect(date.format('DD')).toEqual('13')
  expect(date.format('D')).toEqual('13')
  expect(date.format('W')).toEqual('W')
  expect(date.format('HH')).toEqual('00')
})
