document.addEventListener('DOMContentLoaded', function(event) {
    var input = document.getElementById('response');    // get input element from html
    var question = document.getElementById("question"); // get question div from html

    const {conconververter} = require('jp-conversion');
    const {convert} = require('jp-conversion');
    var res =converter.convert('ひらカナ！');
    console.log(res);
    /*
    Planned features: mostly in order of most to least important
    good idea of what we're trying to achieve here can be found at:
    https://realkana.com/


    Functionality:
        implement single hiragana characters
        toggle on/off certain character rows. (a-o, ka-ko, etc)
        toggle on/off dakuten and handakuten characters
        implement single katakana characters
        toggle on/off katakana
        add double characters (cha, nyo, byo)
        add extended characters for katakana (vyo, fo, che, we, ve)

        add simple words
        add quizzes/minigames/highscores
        
    Aesthetic/QoL: 
        light/dark modes
        switch between different typefaces
        autosubmit answer without pressing "enter" each time
    */

    


    // call checkAnswer each time a new character is entered
    input.addEventListener('keyup', () => {
            if (input.value == "a") {
                alert("correct!");
            }
        });
});

