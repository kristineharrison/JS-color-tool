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
