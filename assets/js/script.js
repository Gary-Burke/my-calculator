/* jshint esversion: 11 */

import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.11.0/+esm'; // Able to use mathjs functions and methods in code

let equation = "";
let temp = ""; // Displays number being built and resets after operator is clicked to indicated start of new number
let isProcessing = true; // Prevent operators from being clicked consecutively, e.g. 90+2+++---
let reset = false; // Resets the equation and answer, if a numbers is pressed after the equals button has been pressed.

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    let operands = document.getElementsByClassName("button-operand");
    for (let operand of operands) {
        operand.addEventListener("click", buildEquationOperand)
    };


    let operators = document.getElementsByClassName("button-operator");
    for (let operator of operators) {
        operator.addEventListener("click", buildEquationOperator)
    };


    let equals = document.getElementById("equals");
    equals.addEventListener("click", calculateEquation);


    /**
     * Autonomous function to button clear when clicked.
     * This resets the entire calculator display, variables and equation.
     */
    let clear = document.getElementById("clear");
    clear.addEventListener("click", () => {
        equation = "";
        temp = "";
        isProcessing = true;
        reset = false;
        document.getElementById("answer").innerText = 0;
        document.getElementById("equation").innerText = 0;
    });


    /**
     * Autonomous function to button back when clicked.
     * This removes the last character in the temp variable, allowing the user to make corrections on the calculator display.
     */
    let backButton = document.getElementById("back");
    backButton.addEventListener("click", () => {
        if (temp === "") return;
        temp = temp.slice(0,-1);

        if (temp === "") {
            document.getElementById("answer").innerText = 0;
        } else {
            document.getElementById("answer").innerText = temp;
        };

        console.log("temp: " + temp);
        console.log("equation: " + equation);
    });

});


/**
 * Build equation by adding operands e.g. 0-9, ., ()
 */
function buildEquationOperand(e) {

    const value = e.currentTarget.getAttribute("data-value");

    // Ensures a decimal can't be repeated within a value
    if ((value === ".") && (temp.includes("."))) { 
        return;
    }

    // This allows the calculator to reset, after the equals button has been clicked and a number is then pressed
    if (reset) {
        temp = value;
        reset = false;
        equation = "";
        document.getElementById("equation").innerText = 0;
    } else {
        temp += value;
    }

    // This statement displays a float < 1 with a zero in front, e.g. .6 as 0.6
    if (temp === ".") {
        temp = "0.";
    }

    // This condition ensures a value can't start with 0 unless followed by a decimal
    if ( (temp.length === 2) && (temp.charAt(0) === "0") && (temp.charAt(1) !== ".")) {
        temp = temp.slice(1);
    }

    document.getElementById("answer").innerText = temp;
    isProcessing = false;

    console.log("equation: " + equation);
    console.log("temp: " + temp);
    console.log("reset: " + reset);
    console.log("isProcessing: " + isProcessing);
    console.log("temp.length: " + temp.length);
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
function calculateEquation() {
    if (isProcessing || reset) return;

    if (temp) {
        equation += temp;
    }

    equation = math.evaluate(equation);

    document.getElementById("answer").innerText = equation;
    
    document.getElementById("equation").innerText = equation;
    temp = "";
    reset = true;

    console.log("equation: " + equation);
    console.log("temp: " + temp);
    console.log("reset: " + reset);
    console.log("isProcessing: " + isProcessing);
}