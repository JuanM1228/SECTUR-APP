/**
 * Returns an array of selected values from the checkedItems object.
 * @param {Object} checkedItems - The object containing the checked items.
 * @returns {Array} - An array of selected values.
 */
export const getSelectedValues = checkedItems =>
  Object.keys(checkedItems).filter(key => checkedItems[key])
