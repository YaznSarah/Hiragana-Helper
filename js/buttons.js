// set default page to certain tab on document ready
document.addEventListener("DOMContentLoaded", function(event) { 
  changeTab(event, 'hiragana');
  })

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

function check(id) {
  document.getElementById(id).checked = !document.getElementById(id).checked;
}

// function for function of "check all?" boxes
// @param source: the checkbox itself
// @param name: name of the checkboxes that should be affected
function toggle(source, name) {
  var checkboxes = document.getElementsByName(name);
  for(var checkbox of checkboxes) {
    checkbox.checked = source.checked;
  }
}