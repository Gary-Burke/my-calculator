/* jshint esversion: 11 */

import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.11.0/+esm'; // Able to use mathjs functions and methods in code

let equation = "";
let temp = ""; // Displays number being built and resets after operator is clicked to indicated start of new number
let isProcessing = true; // Prevent operators from being clicked consecutively, e.g. 90+2+++---
let reset = false; // Resets the equation and answer, if a numbers is pressed after the equals button has been pressed.
let decimal = false;

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

    let equals = document.getElementById("equals");
    equals.addEventListener("click", calculateEquation)

    let clear = document.getElementById("clear");
    clear.addEventListener("click", () => {
        equation = "";
        temp = "";
        isProcessing = true;
        reset = false;
        document.getElementById("answer").innerText = 0;
        document.getElementById("equation").innerText = 0;
    });

});


/**
 * Build equation by adding operands e.g. 0-9, ., ()
 */
function buildEquationOperand(e) {

    const value = e.currentTarget.getAttribute("data-value");    

    if ( (value === ".") && (temp.includes(".")) ) {  //Ensures a decimal can't be repeated within a value
        return;
    }

    if (reset) {        
        temp = value;
        reset = false;
    } else {        
        temp += value;
    }

    document.getElementById("answer").innerText = temp;
    isProcessing = false;

    console.log("equation: " + equation);
    console.log("temp: " + temp);
    console.log("reset: " + reset);
    console.log("isProcessing: " + isProcessing);
}


/**
 * Build equation by adding operators e.g. +, -, /, *
 */
function buildEquationOperator(e) {
    if (isProcessing) return;

    reset = false;
    const value = e.currentTarget.getAttribute("data-value");

    equation += temp + value;
    document.getElementById("equation").innerText = equation;
    temp = "";
    document.getElementById("answer").innerText = 0;

    isProcessing = true;

    console.log("equation: " + equation);
    console.log("temp: " + temp);
    console.log("reset: " + reset);
    console.log("isProcessing: " + isProcessing);

}


/**
 * Calculates built equation by evaulating expression with mathjs
 */
function calculateEquation(e) {
    if (isProcessing || reset) return;

    if (temp) {
        equation += temp;
    }

    let answer = math.evaluate(equation);

    document.getElementById("answer").innerText = answer;
    equation = answer;
    document.getElementById("equation").innerText = answer;
    temp = "";
    reset = true;

    console.log("answer: " + answer);
    console.log("equation: " + equation);
    console.log("temp: " + temp);
    console.log("reset: " + reset);
    console.log("isProcessing: " + isProcessing);
}