function add() {
    let number1 = Number(document.getElementById("x").value);
    let number2 = Number(document.getElementById("y").value);
    let sum = number1 + number2;
    document.getElementById("result").innerHTML = "The sum is: " + sum;
}

function Subtration() {
    let number1 = Number(document.getElementById("x").value);
    let number2 = Number(document.getElementById("y").value);
    let sub = number1 - number2;
    document.getElementById("result").innerHTML = "The difference is: " + sub;
}

function Multiplication() {
    let number1 = Number(document.getElementById("x").value);
    let number2 = Number(document.getElementById("y").value);
    let mul = number1 * number2;
    document.getElementById("result").innerHTML = "The product is: " + mul;
}