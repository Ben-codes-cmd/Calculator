// Ben Jordan

function add(x, y) {
    return x + y;
  };
  
function subtract(x, y) {
    return x-y;
};

function multiply(x, y) {
    return x * y
};

function divide(x, y){
    return x/y;
}

function power(base, exponent) {
    return base ** exponent;
};

function factorial(num) {
    let res = 1;
for(let i=2; i<= num; i++){
    res *= i;
}
return res;
};
  
function operate(x, y, operator){ // make return string?
    let res;
    switch(operator){
        case "+":
            res = add(x, y);
            break;
        case "-":
            res = subtract(x, y);
            break;
        case "*":
            res = multiply(x, y);
            break;
        case "/":
            res = divide(x, y);
            break;
        case "^":
            res = power(x, y);
    }
    return res.toString();
}

function operateSingleOperand(x, operator){
    let res;
    switch(operator){
        case "!":
            res = factorial(x);
            break;
    }
    return res.toString();
}

addEventListener("keydown", (e) => processValue(e));
const LEFT = document.querySelector(".left-buttons");
const RIGHT = document.querySelector(".right-buttons");
createDisplay();
const DIGITS = document.querySelectorAll(".display div");

let ans;
let firstOperand = "";
let secondOperand = "";
let display = "";
let operator = false;
let compound = false;

function generateButtons(){
    let keys = [[["^x", "7", "8", "9"], ["!", "4", "5", "6"], ["C", "1", "2", "3"], ["AC", "0", ".", "="]], ["/", "*", "-", "+"]];

    // left button panel
    for(let i = 0; i < 4; i++){ // add four buttons to each row
        let row = document.createElement("div");
        row.classList.add("rowLeft");
        for(let j = 0; j < 4; j++){
            let button = document.createElement("div");
            button.classList.add("button");
            button.innerHTML = keys[0][i][j];
            button.dataset.value = keys[0][i][j]; // use data-value to process values
            button.addEventListener("click", (e) => processValue(e));
            row.appendChild(button);
        }
        LEFT.append(row); // add row to calc
    }

    // right button panel
    let row = document.createElement("div");
    row.classList.add("rowRight");
    for(let i = 0; i < 4; i++){
        let button = document.createElement("div");
        button.classList.add("button");
        button.innerHTML = keys[1][i];
        button.dataset.value = keys[1][i]; // use data-value to process values
        button.addEventListener("click", (e) => processValue(e));
        row.appendChild(button);
    }
    RIGHT.appendChild(row);
}
function processValue(e){
    // process event accordingly
    e.stopPropagation();

    let val;
    if(e.type == "click"){
        val = e.target.dataset.value;
    }else{
        val = e.key;
    }
    // if integer
    if(!isNaN(parseInt(val))){
        if (operator){
            secondOperand += val;
        }
        else if(!compound){
            firstOperand += val;
        }
    }
    // if decimal
    else if(val == "."){ 
        if(operator){
            if(secondOperand.indexOf(val) == -1){
                secondOperand += val;
            }
        }
        else if(firstOperand.indexOf(val) == -1){
            firstOperand += val;
            }
    }
    // any other operator assuming that an operand has been defined
    else if (firstOperand){
        switch(val){
            case "+":
                operator = val;
                break;
            case "-": 
                operator = val;
                break;
            case "*": 
                operator = val;
                break;
            case "/": 
                operator = val;
                break;
            case "^x":
            case "^":
                operator = "^";
                break;
            case "!":
                if(!secondOperand){
                    ans = operateSingleOperand(firstOperand, val);
                    makeCompoundExpression();
                }
                break;
            case "Backspace":
            case "C":
                if(secondOperand){
                    secondOperand = "";
                }
                else if(operator){
                    operator = false;
                }
                else{
                    reset();
                }
                break;
            case "AC":
                reset();
                break;
            case "Enter":
            case "=":
                if(secondOperand){
                    ans = operate(parse(firstOperand), parse(secondOperand), operator);
                }else{
                    ans = parse(firstOperand).toString();
                }
                makeCompoundExpression();
                break;
        }
    }
    updateDisplay();
}

function reset(){
    firstOperand = "";
    secondOperand = "";
    operator = false;
    compound = false;
}

function makeCompoundExpression(){
    firstOperand = ans;
    secondOperand = "";
    operator = false;
    compound = true;
}

function updateDisplay(){
    // max 19 characters

    if(secondOperand){
        display = firstOperand + operator + secondOperand;
    }
    else if(operator){
        display = firstOperand + operator;
    }
    else if(firstOperand){
        console.log(typeof firstOperand);
        display = firstOperand;
    }else{
        display = "";
    }
    if (display.length > 19){
        if(display.indexOf("e") >=0){
            // trim decimal with scientific notation
            display = display.substr(0, display.indexOf("e")-(display.length-19)) + display.substr(display.indexOf("e"));
        }else{
            display = display.substr(display.length - 19);
        }
    }
    setDisplay(display); // use set display
}

function createDisplay(){
    const SCREEN = document.querySelector(".display");
    // create 19 boxes to space digits evenly
    for(let i = 0; i < 19; i++){
        let digit = document.createElement("div");
        SCREEN.appendChild(digit);
    }
}

function setDisplay(text){
    // takes in a refined <20 digit text

    // reset values from previous frame
    for(let i = 0; i < 19; i++){
        DIGITS[i].innerHTML = "";
    }

    // loop through text and position from left to right
    for(let i = 0; i < text.length; i++){
        DIGITS[19 - text.length + i].innerHTML = text[i];
    }
}

function parse(str){
    str = str.toString();
    if(str.indexOf(".") >= 0){
        return parseFloat(str);
    }
    return parseInt(str);
}

// driver code
generateButtons();