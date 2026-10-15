function calculate() {

    let mark1 = Number(document.getElementById("mark1").value);
    let mark2 = Number(document.getElementById("mark2").value);
    let mark3 = Number(document.getElementById("mark3").value);
    let mark4 = Number(document.getElementById("mark4").value);
    let mark5 = Number(document.getElementById("mark5").value);
    let mark6 = Number(document.getElementById("mark6").value);
    let mark7 = Number(document.getElementById("mark7").value);
    let mark8 = Number(document.getElementById("mark8").value);

    let total = mark1 + mark2 + mark3 + mark4 +
                mark5 + mark6 + mark7 + mark8;

    document.getElementById("total").innerHTML =
        "Total: " + total + "/800";

    let division = document.getElementById("division");
    let status = document.getElementById("status");

    division.style.color = "black";

    if (total >= 600) {
        division.innerHTML = "Distinction";
        status.innerHTML = "Pass";
        status.style.color = "green";
    }
    else if (total >= 500) {
        division.innerHTML = "First Division";
        status.innerHTML = "Pass";
        status.style.color = "green";
    }
    else if (total >= 400) {
        division.innerHTML = "Second Division";
        status.innerHTML = "Pass";
        status.style.color = "green";
    }
    else {
        division.innerHTML = "No Divsion";
        status.innerHTML = "Fail";
        status.style.color = "red";
    }
}