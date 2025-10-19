/* jshint esversion: 11 */

import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.11.0/+esm'; // Able to use mathjs functions and methods in code.

let equation = "";
let temp = ""; // Displays number being built and resets after operator is clicked to indicated start of new number.
let isProcessing = true; // Prevent operators from being clicked consecutively, e.g. 90+2+++---
let reset = false; // Resets the equation and answer, if a numbers is pressed after the equals button has been pressed.
let bracketOpen = 0;
let bracketClosed = 0;

// Wait for the DOM to load before executing functions.
document.addEventListener("DOMContentLoaded", function () {

    /**
     * Add event listener for keyboard keys
     */
    document.addEventListener("keydown", handleKey);


    /**
     * Adds the is-active class to all buttons when pressed or clicked.
     * Works with touch screen and better ux with mobile.
     */
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('pointerdown', () => btn.classList.add('is-active'));
        btn.addEventListener('pointerup', () => btn.classList.remove('is-active'));
        btn.addEventListener('pointerleave', () => btn.classList.remove('is-active'));
        btn.addEventListener('pointercancel', () => btn.classList.remove('is-active'));
    });


    /**
     * Function for handling operands 0-9 ()
     */
    let operands = document.getElementsByClassName("button-operand");
    for (let operand of operands) {
        operand.addEventListener("click", buildEquationOperand)
    };


    /**
     * Function for handling operators + - / *
     */
    let operators = document.getElementsByClassName("button-operator");
    for (let operator of operators) {
        operator.addEventListener("click", buildEquationOperator)
    };

    /**
     * Function for handling equals button "="
     */
    let equals = document.getElementById("button-equals");
    equals.addEventListener("click", calculateEquation);


    /**
     * Function for handling backspace on calculator display
     */
    let backButton = document.getElementById("button-back");
    backButton.addEventListener("click", buttonBack);


    /**
     * Function handle button clear "C"
     * This resets the entire calculator display, variables and equation.
     */
    let clear = document.getElementById("button-clear");
    clear.addEventListener("click", () => {
        equation = "";
        temp = "";
        isProcessing = true;
        reset = false;
        document.getElementById("answer").innerText = 0;
        document.getElementById("equation").innerText = 0;
        bracketClosed = 0;
        bracketOpen = 0;
    });

});


/**
 * Helper function to handle keyboards keys pressed
 */
function handleKey(e) {
    const key = e.key;
    const operands = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    const operators = ["/", "*", "-", "+"]

    if (operands.includes(e.key)) {
        e.preventDefault();        
        buildEquationOperand({currentTarget: {getAttribute: () => key}
        });
    }

    if (operators.includes(e.key)) {
        e.preventDefault();        
        buildEquationOperator({currentTarget: {getAttribute: () => key}
        });
    }


}


/**
 * Build equation by adding operands e.g. 0-9, ., ()
 */
function buildEquationOperand(e) {

    const value = e.currentTarget.getAttribute("data-value");

    if (value === "(") {
        bracketOpen += 1;
    } else if (value === ")") {
        if (bracketClosed === bracketOpen) return; // Prevent ")" from being used before "("
        if (temp.at(-1) === "(") return; // Prevent empty brackets i.e. "()"
        bracketClosed += 1;
    }


    // This check stops the entire function if value is 0 and second would be too.
    // Prevents value like 00256
    if ((temp.length === 1) && (temp === "0") && (value === "0")) {
        return;
    }

    // Ensures a decimal can't be repeated within a value.
    // E.g. 2..500.2
    if ((value === ".") && (temp.includes("."))) {
        return;
    }

    // This allows the calculator to reset, after the equals button has been clicked and a number is then pressed.
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

    // This condition ensures a value can't start with 0 unless followed by a decimal.
    if ((temp.length === 2) && (temp.charAt(0) === "0") && (temp.charAt(1) !== ".")) {
        temp = temp.slice(1);
    }

    document.getElementById("answer").innerText = temp;
    isProcessing = false;
    console.log("temp: " + temp);

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

}


/**
 * Calculates built equation by evaluating expression with mathjs.
 */
function calculateEquation() {
    if (isProcessing || reset || (bracketOpen !== bracketClosed)) return;

    if (temp) {
        equation += temp;
    }

    document.getElementById("equation").innerText = equation + "=";

    equation = math.evaluate(equation);

    document.getElementById("answer").innerText = equation;

    temp = "";
    reset = true;
}


/**
 * This removes the last character in the temp variable, allowing the user to make corrections on the calculator display.
 */
function buttonBack() {
    if (temp === "") {
        isProcessing = true;
        return;
    }
    temp = temp.slice(0, -1);

    if (temp === "") {
        document.getElementById("answer").innerText = 0;
    } else {
        document.getElementById("answer").innerText = temp;
    };
}