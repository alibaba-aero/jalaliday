import MockDate from 'mockdate'
import dayjs from 'dayjs'
import jalali from '../src'

dayjs.extend(jalali)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

test('keep instance calendar on manipulation', () => {
  const date = dayjs().calendar('jalali')
  expect(date.add(1, 'month').isJalali()).toEqual(true)
  expect(dayjs(date).startOf('month').$C).toEqual('jalali')
  expect(dayjs(date).add(1, 'month').$C).toEqual('jalali')
  expect(dayjs(date).add(1, 'month').add(1, 'month').isJalali()).toEqual(true)
})
