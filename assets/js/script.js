/* jshint esversion: 11 */

let equation = ""

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.addEventListener("click", buildEquation)
    }

    let equals = document.getElementById("button-equals");
    equals.addEventListener("click", calculateEquation)

});

function buildEquation(e) {
    const value = e.currentTarget.getAttribute("data-value");
    equation += value;
    document.getElementById("equation").innerText = equation;
    console.log("equation: " + equation);
    return equation
}

function calculateEquation(e) {
    let answer = equation;
    document.getElementById("answer").innerText = answer;
    console.log("answer: " + answer);
}