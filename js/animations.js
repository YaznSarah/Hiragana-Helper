let wide2 = document.getElementById("wide2");
let wide = document.getElementById("wide");

function wideFadeAway()
{
    wide.style.visibility = "hidden";
    wide.style.opacity = "0";
    wide.style.transition = "visibility 0s linear 300ms, opacity 300ms";
    wide2.style.visibility = "hidden";
    wide2.style.opacity = "0";
    wide2.style.transition = "visibility 0s linear 300ms, opacity 300ms";
}

function wideIn()
{
    wide.style.visibility = "visible";
    wide.style.opacity = "100";
    wide.style.transition = "visibility 0s linear 300ms, opacity 300ms";
    wide2.style.visibility = "visible";
    wide2.style.opacity = "100";
    wide2.style.transition = "visibility 0s linear 300ms, opacity 300ms";
}