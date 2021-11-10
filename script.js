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
    return res;
}

// generate buttons on calc
// 0-9, +, -, *, /, enter

addEventListener("keydown", (e) => processValue(e));
const LEFT = document.querySelector(".left-buttons");
const RIGHT = document.querySelector(".right-buttons");
const SCREEN = document.querySelector(".display");

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
                operator = "^";
                break;
            case "!":
                if(!operator){
                    ans = factorial(firstOperand);
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
                    ans = parse(firstOperand);
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

    if(secondOperand){
        display = firstOperand + operator + secondOperand;
    }
    else if(operator){
        display = firstOperand + operator;
    }
    else if(firstOperand){
        display = firstOperand;
    }else{
        display = "";
    }
    SCREEN.innerHTML = display;
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