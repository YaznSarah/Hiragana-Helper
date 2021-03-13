var wide2, wide, input;

document.addEventListener("DOMContentLoaded", function(event) { 
    wide2 = document.getElementById("wide2");
    wide = document.getElementById("wide");
    input = document.getElementById("response");
 })


function wideFadeAway()
{
    wide.classList.toggle("incorrect");
    wide2.classList.toggle("incorrect");
    input.classList.toggle("incorrect");
}

function wideIn()
{
    wide.classList.toggle("incorrect");
    wide2.classList.toggle("incorrect");
    input.classList.toggle("incorrect");
}