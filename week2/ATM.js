let balance = 10000;
let pin = 1234;

function login() {
    let p = Number(document.getElementById("pin").value);

    if (p == pin) {
        document.getElementById("message").innerHTML = "PIN correct";
        document.getElementById("atm").style.display = "block";
    }
    else {
        document.getElementById("message").innerHTML = "Incorrect PIN";
        document.getElementById("atm").style.display = "none";
    }
}

function checkBalance() {
    document.getElementById("result").innerHTML =
        "Balance: Rs. " + balance;
}

function withdraw() {
    let a = Number(document.getElementById("amount").value);

    if (a <= 0)
        document.getElementById("result").innerHTML = "Enter valid amount";
    else if (a % 100 != 0)
        document.getElementById("result").innerHTML = "Enter multiple of 100";
    else if (a > balance)
        document.getElementById("result").innerHTML = "Insufficient balance";
    else {
        balance -= a;
        document.getElementById("result").innerHTML =
            "Withdrawal successful<br>Balance: Rs. " + balance;
    }
}

function deposit() {
    let a = Number(document.getElementById("amount").value);

    if (a <= 0)
        document.getElementById("result").innerHTML = "Enter valid amount";
    else if (a % 100 != 0)
        document.getElementById("result").innerHTML = "Enter multiple of 100";
    else {
        balance += a;
        document.getElementById("result").innerHTML =
            "Deposit successful<br>Balance: Rs. " + balance;
    }
}