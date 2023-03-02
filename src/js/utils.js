export const sortArray = (array, property, direction) =>
    array.sort((a, b) =>
        (!direction ? a[property] < b[property] : a[property] > b[property]) ? -1 : 1
    )