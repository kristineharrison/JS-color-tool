// Check to see whether the input is a valid hex color
// Can start with # and have either 3 or 6 characters
// Check that input has appropriate type of characters

const isValidHex = (hex) => {
  if (!hex) return false

  const strippedHex =  hex.replace("#","")
  return strippedHex.length === 3 || strippedHex.length === 6
}

// Get a reference to hexInput and inputColor DOM elements
// Create a keyup event handler for hexInput
// Check if hex color is valid
// If hex color is valid, update the background color of inputColor

const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value
  if (!isValidHex(hex)) return

  const strippedHex = hex.replace("#", "")

  inputColor.style.backgroundColor = "#" + strippedHex
})

// Convert hex to rgb
// This needs to work with 3 or 6 character hex values
// use parseInt("", 16) to convert a hex value to a decimal value
// Should return an object with 3 properties - r, g, and b
// Hex values are 0-9 a-f in format rr gg bb. rgb values are 0-255

const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null

  let strippedHex = hex.replace("#", "")

  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2]
  }
  
  // Convert each hex value pair into rgb decimal values
  const r = parseInt(strippedHex.substring(0, 2), 16) // first 2 values of hex
  const g = parseInt(strippedHex.substring(2, 4), 16)
  const b = parseInt(strippedHex.substring(4, 6), 16)
  
  return {r, g, b} // shorthand of {r:r, g:g, b:b}
}

// Convert RGB to Hex
// Take in 3 parameters - r, g, and b
// For each (r, g, b) create a hex pair that is two characters long
// Return hex value starting with a hashtag
// r.toString(16) will return a string or integer as hex value. Make sure two characters - so 0 will be 00

const convertRGBToHex = (r, g, b) => {
  // To ensure returns 2 character value, add a preceding 0, convert to hex, and return the last 2 digits
  const hexR = ("0" + r.toString(16)).slice(-2)
  const hexG = ("0" + g.toString(16)).slice(-2)
  const hexB = ("0" + b.toString(16)).slice(-2)

  const hex =  `#${hexR}${hexG}${hexB}`
  return hex
}
console.log(convertRGBToHex(255, 255, 255))

// Display Percentage from Slider
// Get reference to slider and sliderText DOM elements
// Create an input event listener
// Display value of the slider

const slider = document.getElementById("slider")
const sliderText = document.getElementById("sliderText")

slider.addEventListener('input', () => {
  sliderText.textContent = `${slider.value}%`
})