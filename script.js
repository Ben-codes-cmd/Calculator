// Ben Jordan

const add = function(x, y) {
    return x + y;
  };
  
const subtract = function(x, y) {
    return x-y;
};

const multiply = function(x, y) {
    return x * y
};

const divide = function(x, y){
    return x/y;
}

const power = function(base, exponent) {
    return base ** exponent;
};

const factorial = function(num) {
    let res = 1;
for(let i=2; i<= num; i++){
    res *= i;
}
return res;
};
  
const operate = function(x, y, operator){
    let res;
    switch(operator){
        case "+":{
            res = add(x, y);
            break;
        }
        case "-":{
            res = subtract(x, y);
            break;
        }
        case "*":{
            res = multiply(x, y);
            break;
        }
        case "/":{
            res = divide(x, y);
            break;
        }
    }
    return res;
}

// generate buttons on calc
// 0-9, +, -, *, /, enter

const LEFT = document.querySelector(".left-buttons");
const RIGHT = document.querySelector(".right-buttons");

const keys = generateButtons();
const leftKeys = keys[0]
const rightKeys = keys[1];

function generateButtons(){
    let keys = [[["^2", "7", "8", "9"], ["!", "4", "5", "6"], ["C", "1", "2", "3"], ["AC", "0", ".", "="]], ["/", "*", "-", "+"]];

    // left button panel
    for(let i = 0; i < 4; i++){ // add four buttons to each row
        let row = document.createElement("div");
        row.classList.add("rowLeft");
        for(let j = 0; j < 4; j++){
            let button = document.createElement("div");
            button.classList.add("button");
            button.innerHTML = keys[0][i][j];
            row.appendChild(button);
            keys[0][i][j] = button; // replace keys array with reference to buttons
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
        row.appendChild(button);
        keys[1][i] = button; // replace keys array with reference to buttons
    }

    RIGHT.appendChild(row);

    return keys;
}