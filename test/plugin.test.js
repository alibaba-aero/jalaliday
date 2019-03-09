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

it('Extend dayjs', () => {
  expect(dayjs.$C).toBeDefined()
  expect(dayjs.$C).toEqual('jalali')
  expect(dayjs().$jy).toBeDefined()
})

it('Setting calendar converts date', () => {
  const date = dayjs('1397/06/13', { jalali: true }).calendar('gregory')
  expect(date.$y).toEqual(2018)
  expect(date.$M).toEqual(8)
  expect(date.$D).toEqual(4)

  const date2 = dayjs('2018/09/04').calendar('jalali')
  expect(date2.$jy).toEqual(1397)
  expect(date2.$jM).toEqual(5)
  expect(date2.$jD).toEqual(13)
})

test('keep instance calendar on manipulation', () => {
  const date = dayjs().calendar('jalali')
  expect(date.add(1, 'month').isJalali()).toEqual(true)
  expect(dayjs(date).startOf('month').$C).toEqual('jalali')
  expect(dayjs(date).add(1, 'month').$C).toEqual('jalali')
  expect(dayjs(date).add(1, 'month').add(1, 'month').isJalali()).toEqual(true)
})
