/**
 * Seeded random number generator.
 * The output is based on the
 *
 * @return {number}
 */
export const seededRandom = function () {
    let x = Math.sin(window._SEED++) * 10000;
    return x - Math.floor(x);
};


/**
 * Get a random integer between the given min and max values
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const random = function (min, max) {
    return Math.floor(seededRandom() * (max - min + 1)) + min;
};

/**
 * Non-seeded random generator, can be used to generate random seeds for the
 * seeded random number generator.
 *
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get a random element from an array, but return null if the array is empty
 *
 * @param {Array} array
 * @return {null|*}
 */
export const randomArrayValue = function (array) {
    if (array.length > 0) {
        return array[random(0, array.length - 1)];
    }

    return null;
};

/**
 * Get the opposite direction.
 * There should be a simpler way to do this right? This feels clunky...
 *
 * Directions are represented as numbers.
 *  - north/up = 0
 *  - east/right = 1
 *  - south/down = 2
 *  - left/west = 3
 *
 * @param {number} direction
 * @return {number}
 */
export const oppositeWall = function (direction) {
    switch (direction) {
        case 0:
            return 2;
        case 1:
            return 3;
        case 2:
            return 0;
        case 3:
        default:
            return 1;
    }
};
