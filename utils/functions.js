/*eslint no-prototype-builtins: "error"*/

// capitalises first character of each word
export const capitaliseFirstCharacter = stringValue =>
  stringValue.replace(/\b([a-z\s])/g, string => string.toUpperCase())

