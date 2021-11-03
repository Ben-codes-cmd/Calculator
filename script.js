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