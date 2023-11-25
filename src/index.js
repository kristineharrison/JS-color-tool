const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const inputColorText = document.getElementById("inputColorText")
const slider = document.getElementById("slider")
const sliderText = document.getElementById("sliderText")
const alteredColor = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")
const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")

// Validate hex color length
const isValidHex = (hex) => {
  if (!hex) return false

  const strippedHex =  hex.replace("#","")
  return strippedHex.length === 3 || strippedHex.length === 6
}

// Handle hex value input
hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value
  if (!isValidHex(hex)) return

  const strippedHex = hex.replace("#", "")

  inputColor.style.backgroundColor = `#${strippedHex}`
  inputColorText.innerText = `Input Color ${hex}`
  reset()
})

// Convert hex to rgb
const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null

  let strippedHex = hex.replace("#", "")

  if (strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2]
  }
  
  // Convert each hex value pair into rgb decimal values
  const r = parseInt(strippedHex.substring(0, 2), 16)
  const g = parseInt(strippedHex.substring(2, 4), 16)
  const b = parseInt(strippedHex.substring(4, 6), 16)
  
  return {r, g, b}
}

// Convert RGB to Hex
const convertRGBToHex = (r, g, b) => {
  const hexR = ("0" + r.toString(16)).slice(-2)
  const hexG = ("0" + g.toString(16)).slice(-2)
  const hexB = ("0" + b.toString(16)).slice(-2)

  const hex =  `#${hexR}${hexG}${hexB}`
  return hex
}


// Display Percentage from Slider
slider.addEventListener('input', () => {
  if (!isValidHex(hexInput.value)) return 

  sliderText.textContent = `${slider.value}%`

  // Calculate the appropriate value for the color alteration between postive and negative.
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
const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex)

  const amount = Math.floor((percentage/100) * 255)

  const newR = increaseWithinRange(r, amount)
  const newG = increaseWithinRange(g, amount)
  const newB = increaseWithinRange(b, amount)
  return convertRGBToHex(newR, newG, newB)
}

const increaseWithinRange = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount))
}

// Create custom toggle functionality
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
  reset()
})

// Create reset function when toggled back and forth or new input value
const reset = () => {
  slider.value = 0
  sliderText.innerText = '0%'
  alteredColor.style.backgroundColor = hexInput.value
  alteredColorText.innerText = `Altered Color ${hexInput.value}`
}