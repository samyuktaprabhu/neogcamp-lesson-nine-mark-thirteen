const inputBirthday = document.querySelector('#input-birthday')
const outputText = document.querySelector('#output-text')
const btnClick = document.querySelector('#btn-check')

function preprocessDate(date) {
  const [year, month, day] = date.split('-')
  return { day: Number(day), month: Number(month), year: Number(year) }
}

function reverseString(str) {
  const strArray = str.split('')
  var revList = strArray.reverse()
  const joinString = revList.join('')
  return joinString
}

function isPalindrome(str) {
  return str === reverseString(str)
}

function dateToStringConverter(date) {
  var strDate = {
    day: '',
    month: '',
    year: '',
  }

  if (date.day < 10) {
    strDate.day = '0' + date.day
  } else {
    strDate.day = date.day.toString()
  }
  if (date.month < 10) {
    strDate.month = '0' + date.month
  } else {
    strDate.month = date.month.toString()
  }
  strDate.year = date.year.toString()
  return strDate
}

function returnVariations(str) {
  var ddmmyyyy = str.day + str.month + str.year
  var mmddyyyy = str.month + str.day + str.year
  var yyyymmdd = str.year + str.month + str.day
  var ddmmyy = str.day + str.month + str.year.slice(-2)
  var mmddyy = str.month + str.day + str.year.slice(-2)
  var yyddmm = str.year.slice(-2) + str.day + str.month
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm]
}

function isAllPalindrome(strArr) {
  const isPalindromeStr = []
  const variations = returnVariations(strArr)
  for (var i = 0; i < variations.length; i++) {
    isPalindromeStr.push(isPalindrome(variations[i]))
  }
  return isPalindromeStr
}

function isLeapYear(year) {
  if (year % 400) {
    return true
  }
  if (year % 100) {
    return false
  }
  if (year % 4) {
    return true
  }
  return false
}

function getNextDate(date) {
  var day = date.day + 1
  var month = date.month
  var year = date.year
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1
        month++
      }
    } else {
      if (day > 28) {
        day = 1
        month++
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1
      month++
    }
  }

  if (month > 12) {
    month = 1
    year++
  }

  return { day: day, month: month, year: year }
}

function findNextPalindrome(stringDate) {
  var counter = 0

  var date = getNextDate(stringDate)

  while (1) {
    counter++
    var dateStr = dateToStringConverter(date)
    const flagArray = isAllPalindrome(dateStr)
    for (var i = 0; i < flagArray.length; i++) {
      if (flagArray[i]) {
        outputText.innerText =
          'The next Palindrome date is ' +
          date.day +
          '-' +
          date.month +
          '-' +
          date.year +
          ' and it is ' +
          counter +
          ' days away'
        return
      }
    }
    date = getNextDate(date)
  }
}

btnClick.addEventListener('click', palindromeHandler)

function palindromeHandler() {
  const birthDate = inputBirthday.value
  if (birthDate != '') {
    const preprocessedDate = preprocessDate(birthDate)
    const a = dateToStringConverter(preprocessedDate)
    const b = isAllPalindrome(a)
    for (var i = 0; i < b.length; i++) {
      if (b[i]) {
        outputText.innerText = 'Yayy, it is a palindrome!'
        return
      }
    }
    findNextPalindrome(preprocessedDate)
  } else {
    outputText.innerText = 'Please enter valid details'
  }
}
