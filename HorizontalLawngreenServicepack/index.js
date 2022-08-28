/*********************************************************
 * Codeclan Coding Exercise — August 2022                *
 * -- Benjamin Smith                                     *
 *********************************************************/

'use strict';

console.log("HorizontalLawngreenServicepack — Codeclan Coding Exercise — August 2022");

// Store the weather in different places
const weatherDatabase = {
    "Scotland": "sunny",
    "Spain": "glorious",
    "Poland": "cold"
};

// Describe the weather given the country and the weather
const getWeather = function(country, weatherType) {
    return `The weather in ${country} is ${weatherType}`;
};

// Right to left composition of two functions
const compose = function(left, right) {
    return function(argArray) { return left(right(...argArray)); };
};

/////// Main program ///////
// For each entry in the weather database,
//   describe the weather and log this to the console.
Object.entries(weatherDatabase).forEach(compose(console.log, getWeather));

/* References:
   * How to loop through objects in JavaScript
     https://flexiple.com/javascript/loop-through-object-javascript/
   * MDN docs for Function.prototype.apply(), with example of using spread instead
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
   * Example of a fancier function composition that can compose multiple functions in one call
     https://jrsinclair.com/articles/2022/javascript-function-composition-whats-the-big-deal/
   * MDN docs for `console`
     https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console
*/