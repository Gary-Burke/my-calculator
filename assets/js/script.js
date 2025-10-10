/* jshint esversion: 11 */

let equation = ""

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    let operands = document.getElementsByClassName("button-operand");
    for (let operand of operands) {
        operand.addEventListener("click", buildEquationOperand)
    }

    let operators = document.getElementsByClassName("button-operator");
    for (let operator of operators) {
        operator.addEventListener("click", buildEquationOperator)
    }

    let equals = document.getElementById("button-equals");
    equals.addEventListener("click", calculateEquation)

});

function buildEquationOperand(e) {
    const value = e.currentTarget.getAttribute("data-value");
    equation += value;
    document.getElementById("equation").innerText = equation;
    console.log("equation: " + equation);
    return equation
}

function buildEquationOperator(e) {
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