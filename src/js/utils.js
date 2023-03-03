export const sortArray = (array, property, direction) =>
    array.sort((a, b) =>
        (!direction ? a[property] < b[property] : a[property] > b[property]) ? -1 : 1
    )

export function filterArray(array, property, value) {
    let newArray = []
    for (const item of array) {
        if (String(item[property]).includes(value) === true)
            newArray.push(item)
    }
    return newArray
}

// array.forEach((item) =>
//     (String(item[property]).includes(value)) ? newArray.push(item) : null)