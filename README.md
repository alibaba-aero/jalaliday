# Jalaliday
[![npm (scoped with tag)](https://img.shields.io/npm/v/jalaliday/latest.svg?style=flat-square)](https://npmjs.com/package/jalaliday)
[![npm](https://img.shields.io/npm/dt/jalaliday.svg?style=flat-square)](https://npmjs.com/package/jalaliday)
[![CircleCI](https://img.shields.io/circleci/project/github/alibaba-aero/jalaliday.svg?style=flat-square)](https://circleci.com/gh/)
[![Codecov](https://img.shields.io/codecov/c/github/alibaba-aero/jalaliday.svg?style=flat-square)](https://codecov.io/gh/)
[![Dependencies](https://david-dm.org/jalaliday/status.svg?style=flat-square)](https://david-dm.org/)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

Persian (Jalali, Khorshidi) Plugin for [Day.js](https://github.com/iamkun/dayjs), Jalaliday add multi-calendar functionality to Day.js core regardless for of locale, so we can have Gregorian calendar is Persian locale of Jalali calendar in English locale  
Unlike moment and becuase of immutablity of dayjs, there is no need for formats like `jYYYY` or `jMM`, in Jalaliday all formats are same and standard

> 

[📖 **Release Notes**](./CHANGELOG.md)

## Installation
NPM
```
npm install --save jalaliday
```
YARN
```
yarn add jalaliday
```

## Usage
```javascript
import dayjs from 'dayjs'
import jalaliday from 'jalaliday'

dayjs.extend(jalaliday)
```

### Changing calendar
If you want to all new instanses of dayjs use `jalali` calendar, you can set default calendar
```javascript
dayjs.calendar('jalali') // Jalali Calendar
// OR
dayjs.calendar('gregory') // Gregorian Calendar
```
also you can create a jalali date without changing default calendar
```javascript
const date = dayjs()
const jalaliDate = date.calendar('jalali')
```

### Parse Date
- Parse Gregory date 
```js
const date = dayjs('2018-04-04T16:00:00.000Z');
```
- Parse Jalali date
```js
const date = dayjs('1398-10-17', { jalali: true });
```

### Multiple Locale
with combination of `calendar` and `locale` we have multi language for real
```javascript
dayjs().calendar('jalali').locale('en').format('DD MMMM YYYY') // '13 Shahrivar 1397'
dayjs().calendar('gregory').locale('fa').format('DD MMMM YYYY') // '04 سپتامبر 2018'
```

### API
All Api operations of Jalaliday is same as Dayjs itself but calendar based, for more information checkout [Dayjs API](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md)
For a glance:
- [API Reference](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#api-reference)
  - [Parsing](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#parsing)
    - [Constructor `dayjs(existing?: string | number | Date | Dayjs)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#constructor-dayjsexisting-string--number--date--dayjs)
      - [ISO 8601 string](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#iso-8601-string)
      - [Unix Timestamp (milliseconds since the Unix Epoch - Jan 1 1970, 12AM UTC)](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#unix-timestamp-milliseconds-since-the-unix-epoch---jan-1-1970-12am-utc)
      - [Native Javascript Date object](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#native-javascript-date-object)
    - [Clone `.clone() | dayjs(original: Dayjs)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#clone-clone-dayjsoriginal-dayjs)
    - [Validation `.isValid()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#validation-isvalid)
  - [Get and Set](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#get-and-set)
    - [Year `.year()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#year-year)
    - [Month `.month()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#month-month)
    - [Day of the Month `.date()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#day-of-the-month-date)
    - [Day of the Week `.day()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#day-of-the-week-day)
    - [Hour `.hour()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#hour-hour)
    - [Minute `.minute()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#minute-minute)
    - [Second `.second()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#second-second)
    - [Millisecond `.millisecond()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#millisecond-millisecond)
    - [Set `.set(unit: string, value: number)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#set-setunit-string-value-number)
  - [Manipulating](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#manipulating)
    - [Add `.add(value: number, unit: string)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#add-addvalue-number-unit-string)
    - [Subtract `.subtract(value: number, unit: string)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#subtract-subtractvalue-number-unit-string)
    - [Start of Time `.startOf(unit: string)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#start-of-time-startofunit-string)
    - [End of Time `.endOf(unit: string)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#end-of-time-endofunit-string)
  - [Displaying](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#displaying)
    - [Format `.format(stringWithTokens: string)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#format-formatstringwithtokens-string)
      - [List of all available formats](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#list-of-all-available-formats)
    - [Difference `.diff(compared: Dayjs, unit: string (default: 'milliseconds'), float?: boolean)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#difference-diffcompared-dayjs-unit-string-default-milliseconds-float-boolean)
    - [Unix Timestamp (milliseconds) `.valueOf()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#unix-timestamp-milliseconds-valueof)
    - [Unix Timestamp (seconds) `.unix()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#unix-timestamp-seconds-unix)
    - [Days in the Month `.daysInMonth()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#days-in-the-month-daysinmonth)
    - [As Javascript Date `.toDate()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-javascript-date-todate)
    - [As Array `.toArray()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-array-toarray)
    - [As JSON `.toJSON()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-json-tojson)
    - [As ISO 8601 String `.toISOString()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-iso-8601-string-toisostring)
    - [As Object `.toObject()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-object-toobject)
    - [As String `.toString()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#as-string-tostring)
  - [Query](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#query)
    - [Is Before `.isBefore(compared: Dayjs)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#is-before-isbeforecompared-dayjs)
    - [Is Same `.isSame(compared: Dayjs)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#is-same-issamecompared-dayjs)
    - [Is After `.isAfter(compared: Dayjs)`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#is-after-isaftercompared-dayjs)
    - [Is a Dayjs `.isDayjs()`](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#is-a-dayjs-isdayjscompared-any)
  - [Plugin APIs](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#plugin-apis)
    - [RelativeTime](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#relativetime)
    - [IsLeapYear](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#isleapyear)
    - [WeekOfYear](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#weekofyear)
    - [IsBetween](https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#isbetween)
