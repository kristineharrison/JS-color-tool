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

  inputColor.style.backgroundColor = `#${strippedHex}`
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


// Display Percentage from Slider
// Get reference to slider and sliderText DOM elements
// Create an input event listener
// Display value of the slider

const slider = document.getElementById("slider")
const sliderText = document.getElementById("sliderText")
const alteredColor = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")

slider.addEventListener('input', () => {

  // Check if hex is valid
  if (!isValidHex(hexInput.value)) return 

  sliderText.textContent = `${slider.value}%`

  // Calculate the appropriate value for the color alteration between postive and negative. Toggled means slide to Darken side.
  const valuePosNeg = toggleBtn.classList.contains('toggled')
    ? -slider.value
    : slider.value

  // Get the altered hex value
  const alteredHex = alterColor(hexInput.value, valuePosNeg) 
  // Update the altered color
  alteredColor.style.backgroundColor = alteredHex
  alteredColorText.innerText = `Altered Color ${alteredHex}`
})

// Alter color by percentage
// Create the alterColor function which accepts hex value and percentage
// Increase each r, g, b value by appropriate amount (percentage of 255)
// Use the new r, b, b values to convert to a hex value
// Return the hex value

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex)

  const amount = Math.floor((percentage/100) * 255) // Get integer between 0-255

  // Create new RGB value by new amount
  const newR = increaseWithinRange(r, amount)
  const newG = increaseWithinRange(g, amount)
  const newB = increaseWithinRange(b, amount)
  return convertRGBToHex(newR, newG, newB)
}

const increaseWithinRange = (hex, amount) => {
  // const newHex = hex + amount
  // if (newHex > 255) return 255
  // if (newHex < 0) return 0

  // one-liner
  return Math.min(255, Math.max(0, hex + amount))
}

// Create custom toggle functionality
// Get reference to lightenText, darkenText, toggleBtn
// Add click event listener to the toggle btn
// Only one of lighten or darken can be unselected at a time

const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")

toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled')
    lightenText.classList.remove('unselected')
    darkenText.classList.add('unselected')
  } else {
    toggleBtn.classList.add('toggled')
    lightenText.classList.add('unselected')
    darkenText.classList.remove('unselected')
  }
})