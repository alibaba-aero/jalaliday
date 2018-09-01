/* eslint-disable */
/*
 JavaScript functions for the Fourmilab Calendar Converter
 by John Walker  --  September, MIM
 http://www.fourmilab.ch/documents/calendar/
 This program is in the public domain.
 */

/*  MOD  --  Modulus function which works for non-integers.  */

function mod(a, b) {
  return a - (b * Math.floor(a / b))
}

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?

function leap_gregorian(year) {
  return ((year % 4) == 0) &&
		(!(((year % 100) == 0) && ((year % 400) != 0)))
}

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

let GREGORIAN_EPOCH = 1721425.5

function gregorian_to_jd(year, month, day) {
  return (GREGORIAN_EPOCH - 1) +
		(365 * (year - 1)) +
		Math.floor((year - 1) / 4) +
		(-Math.floor((year - 1) / 100)) +
		Math.floor((year - 1) / 400) +
		Math.floor((((367 * month) - 362) / 12) +
			((month <= 2) ? 0 :
			  (leap_gregorian(year) ? -1 : -2)
			) +
			day)
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

function jd_to_gregorian(jd) {
  let wjd, 
depoch, 
quadricent, 
dqc, 
cent, 
dcent, 
quad, 
dquad,
    yindex, 
year, 
yearday, 
leapadj

	wjd = Math.floor(jd - 0.5) + 0.5
	depoch = wjd - GREGORIAN_EPOCH
	quadricent = Math.floor(depoch / 146097)
	dqc = mod(depoch, 146097)
	cent = Math.floor(dqc / 36524)
	dcent = mod(dqc, 36524)
	quad = Math.floor(dcent / 1461)
	dquad = mod(dcent, 1461)
	yindex = Math.floor(dquad / 365)
	year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex
	if (!((cent == 4) || (yindex == 4))) {
    year++
	}
  yearday = wjd - gregorian_to_jd(year, 1, 1)
	leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
    :
    (leap_gregorian(year) ? 1 : 2)
  )
	var month = Math.floor((((yearday + leapadj) * 12) + 373) / 367),
    day = (wjd - gregorian_to_jd(year, month, 1)) + 1

	return [year, month, day]
}


let PERSIAN_EPOCH = 1948320.5

//  PERSIAN_TO_JD  --  Determine Julian day from Persian date

function persian_to_jd(year, month, day) {
  let epbase, 
epyear

	epbase = year - ((year >= 0) ? 474 : 473)
	epyear = 474 + mod(epbase, 2820)

	return day +
		((month <= 7) ?
		  ((month - 1) * 31) :
		  (((month - 1) * 30) + 6)
		) +
		Math.floor(((epyear * 682) - 110) / 2816) +
		(epyear - 1) * 365 +
		Math.floor(epbase / 2820) * 1029983 +
		(PERSIAN_EPOCH - 1)
}

//  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

function jd_to_persian(jd) {
  let year, 
month, 
day, 
depoch, 
cycle, 
cyear, 
ycycle,
    aux1, 
aux2, 
yday


	jd = Math.floor(jd) + 0.5

	depoch = jd - persian_to_jd(475, 1, 1)
	cycle = Math.floor(depoch / 1029983)
	cyear = mod(depoch, 1029983)
	if (cyear == 1029982) {
    ycycle = 2820
	} else {
    aux1 = Math.floor(cyear / 366)
		aux2 = mod(cyear, 366)
		ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
			aux1 + 1
	}
  year = ycycle + (2820 * cycle) + 474
	if (year <= 0) {
    year--
	}
  yday = (jd - persian_to_jd(year, 1, 1)) + 1
	month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30)
	day = (jd - persian_to_jd(year, month, 1)) + 1
	return [year, month, day]
}


function toJalaali(y, m, d) {
  return jd_to_persian(gregorian_to_jd(y, m, d));
}

function toGregorian(y, m, d) {
  return jd_to_gregorian(persian_to_jd(y, m, d));
}

export default {
  toJalaali,
  toGregorian
}
