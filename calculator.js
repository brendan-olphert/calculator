var numString = '' // defines numString as an empty string
var numArray = [] // defines numArray as an empty array
let display = document.getElementById('display')
let isPreviousResult = false

listen() // calls listen function

// event listener for click, will getButtonValue
function listen () {
  document.addEventListener('click', getButtonValue)
}

// Checks if input is not NaN and is a decimal, calls number function
// else calls functions allclear, clear, calculate
// or storeNumber based on button matching string
function getButtonValue () {
  let button = event.target.value
  if (!isNaN(button) || button === '.') {
    number(button)
  } else if (button === 'AC') {
    allClear() // if AC button call allclear function
  } else if (button === 'CE') {
    clear() // if CE button button call clear function
  } else if (button === '=') {
    calculate() // if = button call calculate function
  } else {
    storeNumber(button)
  }
}

// function getButtonValue () {
//   let button = event.target.value
//   switch (true) {
//     case (!isNaN(button) || button === '.'):
//       number(button)
//     case (button === 'AC'):
//       allClear()
//     case (button === "CE"):
//       clear()
//     case (button === '='):
//       storeNumber()
//     }

function number (button) {
  if (button === '.' && numString.includes('.')) {
    // return
  } else if (numString.charAt(0) === '0' && numString.length === 1 && button === '0') {
    // return
  } else {
    if (isPreviousResult === true) {
      numString = ''
      isPreviousResult = false
    }
    numString += button
    display.value = numString
  }
}
// returns numString, NunArray to empty value, sets display value to '0'
function allClear () {
  numString = ''
  numArray = []
  display.value = '0'
}
// returns numString to empty, sets display value to '0' without changing NumArrays stored value
function clear () {
  numString = ''
  display.value = '0'
}

function storeNumber (button) {
  if (numString === '' && numArray.length === 0) {
    // return
  } else if (numString === '') { // not sure why tho??
    numArray.length = numArray.length - 1
    numArray.push(button)
  } else {
    numArray.push(numString)
    numArray.push(button)
    numString = ''
  }
}

function calculate () {
  numArray.push(numString)
  let currentNumber = Number(numArray[0])
  for (var i = 0; i < numArray.length; i++) {
    let nextNumber = Number(numArray[i + 1])
    let symbol = numArray[i]
    if (symbol === '+') {
      currentNumber += nextNumber
    } else if (symbol === '-') {
      currentNumber -= nextNumber
    } else if (symbol === '*') {
      currentNumber *= nextNumber
    } else if (symbol === '/') {
      currentNumber /= nextNumber
    }
  }
  if (currentNumber < 0) {
    currentNumber = Math.abs(currentNumber) + '-'
  }

  display.value = currentNumber
  numString = JSON.stringify(currentNumber)
  isPreviousResult = true
  numArray = []
}
