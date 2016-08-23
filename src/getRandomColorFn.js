var colors = require("colors");


var CHOICES = [
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
        "grey"
    ],
    LAST_INDEX = 0,
    LENGTH = CHOICES.length;


module.exports = getRandomColorFn;


function getRandomColorFn() {
    return colors[CHOICES[getRandomIndex()]];
}

function getRandomIndex() {
    var index = (Math.random() * LENGTH) | 0;

    if (index === LAST_INDEX) {
        return getRandomIndex();
    } else {
        LAST_INDEX = index;
        return index;
    }
}
