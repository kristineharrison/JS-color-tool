// Check to see whether the input is a valid hex color
// Can start with # and have either 3 or 6 characters
// Check that input has appropriate type of characters

const validHex = (hex) => {
  if (!hex) return false

  const strippedHex =  hex.replace("#","")
  return strippedHex.length === 3 || strippedHex.length === 6
}



console.log(validHex("#334433"))
console.log(validHex("#3344339"))
console.log(validHex("fff"))
console.log(validHex("ac"))
console.log(validHex("#ac"))