/* jshint esversion: 11 */

import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.11.0/+esm';

let equation = ""
let answer = ""
let temp = ""
let isProcessing = true; // Prevent operators from being clicked consecutively

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

/**
 * Build equation by adding operands e.g. 0-9, ., ()
 */
function buildEquationOperand(e) {
    isProcessing = false;

    const value = e.currentTarget.getAttribute("data-value");
    equation += value; 
    temp += value;
    document.getElementById("equation").innerText = equation;
    document.getElementById("answer").innerText = temp;
 

    return equation
}

/**
 * Build equation by adding operators e.g. +, -, /, *
 */
function buildEquationOperator(e) {
    if (isProcessing) return;

    const value = e.currentTarget.getAttribute("data-value");
    equation += value;
    document.getElementById("equation").innerText = equation;
    temp = ""
    document.getElementById("answer").innerText = 0;
    isProcessing = true;
    return equation
}


/**
 * Calculates built equation
 */
function calculateEquation(e) {
    if (isProcessing) return;

    let answer = math.evaluate(equation);
    document.getElementById("answer").innerText = answer;
    equation = ""
    answer = ""
    temp =""
    isProcessing = true;
}