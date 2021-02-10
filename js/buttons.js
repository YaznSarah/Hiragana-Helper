//function to change pages and highligh/de-light buttons
//nextPage: the page which we are changing to.
function changeTab(evt, nextTab) {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(nextTab).style.display = "flex";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function(event) { 
  changeTab(event, 'quizzer');
  })
