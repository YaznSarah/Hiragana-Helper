(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    document.addEventListener('DOMContentLoaded', function (event) {
      /*
      Planned features: mostly in oadder of most to least important
      good idea of what we're trying to achieve here can be found at:
      https://realkana.com/
  
  
      Functionality:
          *implement single hiragana characters
          *toggle on/off certain character rows. (a-o, ka-ko, etc)
          *toggle on/off dakuten and handakuten characters
          *implement single katakana characters
          *toggle on/off katakana
          *add double characters (cha, nyo, byo)
          implement 'bag' system (selected kana must be seen once before repeating)
          add extended characters for katakana (vyo, fo, che, we, ve)
          show correct answer after 3 failed attempts
  
          stretch goals:
          add simple words
          add quizzes/minigames/highscores
          
          
      Aesthetic/QoL: 
          light/dark modes
          switch between different typefaces
          option to autosubmit answer without pressing "enter" each time

      Known Bugs:
          *'check all' box fails if you click on the box itself.

      * : denotes a fixed/completed feature

      */


      var input = document.getElementById('response');    // get input element from html
      var question = document.getElementById("kanaquestion"); // get question div from html
      var converter = require('jp-conversion');
      var footer = document.getElementById("footer");


      // hiragana reference
      const questions = [
        //hiragana
        { row: 'h', sym: ['あ', 'い', 'う', 'え', 'お'] },
        { row: 'hk', sym: ['か', 'き', 'く', 'け', 'こ'] },
        { row: 'hs', sym: ['さ', 'し', 'す', 'せ', 'そ'] },
        { row: 'ht', sym: ['た', 'ち', 'つ', 'て', 'と'] },
        { row: 'hn', sym: ['な', 'に', 'ぬ', 'ね', 'の'] },
        { row: 'hh', sym: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
        { row: 'hm', sym: ['ま', 'み', 'む', 'め', 'も'] },
        { row: 'hy', sym: ['や', 'ゆ', 'よ'] },
        { row: 'hr', sym: ['ら', 'り', 'る', 'れ', 'ろ'] },
        { row: 'hw', sym: ['わ', 'を'] },
        { row: 'hnn', sym: ['ん'] },
        { row: 'hg', sym: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
        { row: 'hz', sym: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
        { row: 'hd', sym: ['だ', 'づ', 'ぢ', 'で', 'ど'] },
        { row: 'hb', sym: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
        { row: 'hp', sym: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },

        { row: 'hCombo', sym: [] },

        { row: 'hkc', sym: ['きゃ', 'きゅ', 'きょ'] },
        { row: 'hgc', sym: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
        { row: 'hsc', sym: ['しゃ', 'しゅ', 'しょ'] },
        { row: 'hzc', sym: ['じゃ', 'じゅ', 'じょ'] },
        { row: 'htc', sym: ['ちゃ', 'ちゅ', 'ちょ'] },
        { row: 'hdc', sym: ['ぢゃ', 'ぢゅ', 'ぢょ'] },
        { row: 'hnc', sym: ['にゃ', 'にゅ', 'にょ'] },
        { row: 'hhc', sym: ['ひゃ', 'ひゅ', 'ひょ'] },
        { row: 'hbc', sym: ['びゃ', 'びゅ', 'びょ'] },
        { row: 'hpc', sym: ['ぴゃ', 'ぴゅ', 'ぴょ'] },
        { row: 'hmc', sym: ['みゃ', 'みゅ', 'みょ'] },
        { row: 'hrc', sym: ['りゃ', 'りゅ', 'りょ'] },

        //katakana
        { row: 'k', sym: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
        { row: 'kk', sym: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
        { row: 'ks', sym: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
        { row: 'kt', sym: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
        { row: 'kn', sym: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
        { row: 'kh', sym: ['ハ', 'ヒ', 'フ', 'ヘ', 'ほ'] },
        { row: 'km', sym: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
        { row: 'ky', sym: ['ヤ', 'ユ', 'ヨ'] },
        { row: 'kr', sym: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
        { row: 'kw', sym: ['ワ', 'ヲ'] },
        { row: 'knn', sym: ['ン'] },
        { row: 'kg', sym: ['ガ', 'ギ', 'ク', 'ゲ', 'ゴ'] },
        { row: 'kz', sym: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
        { row: 'kd', sym: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
        { row: 'kb', sym: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'] },
        { row: 'kp', sym: ['パ', 'ピ', 'プ', 'ペ', 'ポ'] },

        { row: 'kCombo', sym: [] },

        { row: 'kkc', sym: ['キャ', 'キュ', 'キョ'] },
        { row: 'kgc', sym: ['ギャ', 'ギュ', 'ギョ'] },
        { row: 'ksc', sym: ['シャ', 'シュ', 'ショ'] },
        { row: 'kzc', sym: ['ジャ', 'ジュ', 'ジョ'] },
        { row: 'ktc', sym: ['チャ', 'チュ', 'チョ'] },
        { row: 'kdc', sym: ['ジャ', 'ジュ', 'ジョ'] },
        { row: 'knc', sym: ['ニャ', 'ニュ', 'ニョ'] },
        { row: 'khc', sym: ['ヒャ', 'ヒュ', 'ヒョ'] },
        { row: 'kbc', sym: ['ビャ', 'ビュ', 'ビョ'] },
        { row: 'kpc', sym: ['ピャ', 'ピュ', 'ピョ'] },
        { row: 'kmc', sym: ['ミャ', 'ミュ', 'ミョ'] },
        { row: 'krc', sym: ['リャ', 'リュ', 'リョ'] },
      ];

      var quizzerButton = document.getElementsByClassName("tablink")[2];            // quiz tab button
      var markedBoxes = [];                                                         // array of checked sets
      var tester = [];
      var testerIndex = 0;                          // index of next character to use                                                        // array of symbols to test user on
      var correct = 0;
      var wrong = 0;
      var alreadyWrong = false;

      // add listener for when we click on quizzer button
      quizzerButton.addEventListener('click', () => {
        initializeQuiz();
      })

      // initialize tester array with checked boxes
      // TODO add case when nothing is checked
      function initializeQuiz() {
        // clear tester array
        tester = [];
        question.innerHTML = "";
        // get all checked rows
        markedBoxes = document.querySelectorAll('input[name=hira]:checked,input[name=kata]:checked');
        // add checked rows to tester array
        var hCombos = false;
        var kCombos = false;
        markedBoxes.forEach(function (box) {
          if (box.id == 'hCombo') hCombos = true;
          if (box.id == 'kCombo') kCombos = true;
          if (box.name == "selectall") return; //ignore selectall checkboxes
          if (questions.find(element => element.row == box.id) != undefined) {
            tester = tester.concat(questions.find(element => element.row == box.id).sym)
          }
          if (hCombos == true
            && box.id.startsWith('h')
            && questions.find(element => element.row == box.id + 'c') != undefined) {
            tester = tester.concat(questions.find(element => element.row == box.id + 'c').sym)
          }
          if (kCombos == true
            && box.id.startsWith('k')
            && questions.find(element => element.row == box.id + 'c') != undefined) {
            tester = tester.concat(questions.find(element => element.row == box.id + 'c').sym)
          }

        });

        correct = 0;
        wrong = 0;
        totalAttempts = 0;
        nextLetter();
      };


      // event listener for input
      // is enter is pressed, check answer.

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          var converted = converter.convert(question.innerHTML).romaji;
          if (input.value.length == 0) {
            // do nothing
          }
          else if (input.value.toLowerCase() == converted) {
            correctAnswer();
            nextLetter();
          }                   // if input matches symbol
          else {
            wrongAnswer()
          }

          // code for enter
        }
      });

      function nextLetter() {
        // if nothing is checked, use a-o as default row.
        if (tester.length == 0 || tester == undefined) {
          tester = ['あ', 'い', 'う', 'え', 'お']
        }
        // choose a random index, ensuring we don't roll the same kana twice in a row
        var temp = testerIndex;
        while (testerIndex == temp) {
          testerIndex = Math.floor(Math.random() * tester.length)
        }
        question.innerHTML = tester[testerIndex];
        input.value = "";
        console.log(correct + " correct - " + wrong + " wrong");
        score = (correct / totalAttempts);
        if (isNaN(score)) {
          // do nothing
        }
        else {
          footer.innerHTML = Math.round(score * 100) + "%";
        }


      };

      function wrongAnswer() {
        if (alreadyWrong) {
          return;
        } else {
          alreadyWrong = true;
        }

        wrong++;
        totalAttempts++;
        wideIn();
      }

      function correctAnswer() {
        if (alreadyWrong) {
          alreadyWrong = false;
          wideFadeAway();
        }
        correct++;
        totalAttempts++;
      }


      /*-----------------------------EXPERIMENTAL CODE-----------------------------*/

    });

    /*-----------------------------BEGIN JP-CONVERT CODE-----------------------------*/

  }, { "jp-conversion": 2 }], 2: [function (require, module, exports) {
    // Always useful to have lying around
    var AssociativeArray = function () {
      return {
        keys: [],
        values: [],
        length: 0,
        put: function (key, value) {
          this[key] = value;
          this.keys.push(key);
          this.values.push(value);
          this.length++;
        },
        remove: function (key) {
          delete (this[key]);
          var kpos = 0;
          while (kpos > -1) {
            kpos = this.keys.indexOf(key);
            this.keys[kpos] = '';
            this.values[kpos] = '';
          }
        }
      }
    }

    // double consonant mappings
    var dcmap = new AssociativeArray();

    dcmap.put("kk", "っk");
    dcmap.put("tt", "っt");
    dcmap.put("cc", "っc");
    dcmap.put("ss", "っs");
    dcmap.put("pp", "っp");
    dcmap.put("mm", "んm");
    dcmap.put("mt", "んt");
    dcmap.put("mb", "んb");
    dcmap.put("mp", "んp");
    dcmap.put("nt", "んt");
    dcmap.put("nb", "んb");
    dcmap.put("np", "んp");

    // tracks ascii -> hiragana
    var map = [null, new AssociativeArray(), new AssociativeArray(), new AssociativeArray(), new AssociativeArray()];

    // tracks hiragana -> ascii
    var rmap = [null, new AssociativeArray(), new AssociativeArray()];

    // adds a mapping to the tracking objects
    var addMapping = function (key, val) {
      map[key.length].put(key, val);
      rmap[val.length].put(val, key);
    }

    /**
       This ordering matters, as the reverse map
       is essentially a LILO concept. "Desired"
       romanisation is effected by putting the
       dominant reverse mapping first in a series
       of "converts to the same thing" mappings.
    **/

    addMapping('n', 'ん');
    addMapping('nnn', 'んn');  // special parsing for triple n
    addMapping('nn', 'ん');
    addMapping('xn', 'ん');
    addMapping("n'", 'ん');
    addMapping("nʺ", 'ん');  // to counterarct a conversion trick

    addMapping('a', 'あ');
    addMapping('i', 'い');
    addMapping('u', 'う');
    addMapping('e', 'え');
    addMapping('o', 'お');

    addMapping('yi', 'い');
    addMapping('wu', 'う');
    addMapping('whu', 'う');

    addMapping('la', 'ぁ');
    addMapping('li', 'ぃ');
    addMapping('lu', 'ぅ');
    addMapping('le', 'ぇ');
    addMapping('lo', 'ぉ');

    addMapping('xa', 'ぁ');
    addMapping('xi', 'ぃ');
    addMapping('xu', 'ぅ');
    addMapping('xe', 'ぇ');
    addMapping('xo', 'ぉ');

    addMapping('lyi', 'ぃ');
    addMapping('xyi', 'ぃ');
    addMapping('lye', 'ぇ');
    addMapping('xye', 'ぇ');
    addMapping('ye', 'いぇ');

    addMapping('wi', 'うぃ');
    addMapping('we', 'うぇ');

    addMapping('wha', 'うぁ');
    addMapping('whi', 'うぃ');
    addMapping('whe', 'うぇ');
    addMapping('who', 'うぉ');

    addMapping('vu', 'ヴ');
    addMapping('va', 'ヴぁ');
    addMapping('vi', 'ヴぃ');
    addMapping('vyi', 'ヴぃ');
    addMapping('ve', 'ヴぇ');
    addMapping('vye', 'ヴぇ');
    addMapping('vo', 'ヴぉ');
    addMapping('vya', 'ヴゃ');
    addMapping('vyu', 'ヴゅ');
    addMapping('vyo', 'ヴょ');

    addMapping('ka', 'か');
    addMapping('ki', 'き');
    addMapping('ku', 'く');
    addMapping('ke', 'け');
    addMapping('ko', 'こ');

    addMapping('ca', 'か');
    addMapping('cu', 'く');
    addMapping('co', 'こ');
    addMapping('qu', 'く');

    addMapping('kya', 'きゃ');
    addMapping('kyi', 'きぃ');
    addMapping('kyu', 'きゅ');
    addMapping('kye', 'きぇ');
    addMapping('kyo', 'きょ');

    addMapping('qya', 'くゃ');
    addMapping('qyu', 'くゅ');
    addMapping('qyo', 'くょ');

    addMapping('lka', 'ヵ');
    addMapping('xka', 'ヵ');
    addMapping('lke', 'ヶ');
    addMapping('xke', 'ヶ');

    addMapping('qwa', 'くぁ');
    addMapping('qwi', 'くぃ');
    addMapping('qwu', 'くぅ');
    addMapping('qwe', 'くぇ');
    addMapping('qwo', 'くぉ');

    addMapping('qa', 'くぁ');
    addMapping('qi', 'くぃ');
    addMapping('qe', 'くぇ');
    addMapping('qo', 'くぉ');

    addMapping('kwa', 'くぁ');
    addMapping('qyi', 'くぃ');
    addMapping('qye', 'くぇ');

    addMapping('ga', 'が');
    addMapping('gi', 'ぎ');
    addMapping('gu', 'ぐ');
    addMapping('ge', 'げ');
    addMapping('go', 'ご');

    addMapping('gya', 'ぎゃ');
    addMapping('gyi', 'ぎぃ');
    addMapping('gyu', 'ぎゅ');
    addMapping('gye', 'ぎぇ');
    addMapping('gyo', 'ぎょ');

    addMapping('gwa', 'ぐぁ');
    addMapping('gwi', 'ぐぃ');
    addMapping('gwu', 'ぐぅ');
    addMapping('gwe', 'ぐぇ');
    addMapping('gwo', 'ぐぉ');

    addMapping('shi', 'し');

    addMapping('sa', 'さ');
    addMapping('si', 'し');
    addMapping('su', 'す');
    addMapping('se', 'せ');
    addMapping('so', 'そ');

    addMapping('ci', 'し');
    addMapping('ce', 'せ');

    addMapping('sha', 'しゃ');
    addMapping('shu', 'しゅ');
    addMapping('she', 'しぇ');
    addMapping('sho', 'しょ');

    addMapping('sya', 'しゃ');
    addMapping('syi', 'しぃ');
    addMapping('syu', 'しゅ');
    addMapping('sye', 'しぇ');
    addMapping('syo', 'しょ');

    addMapping('swa', 'すぁ');
    addMapping('swi', 'すぃ');
    addMapping('swu', 'すぅ');
    addMapping('swe', 'すぇ');
    addMapping('swo', 'すぉ');

    addMapping('ji', 'じ');

    addMapping('za', 'ざ');
    addMapping('zi', 'じ');
    addMapping('zu', 'ず');
    addMapping('ze', 'ぜ');
    addMapping('zo', 'ぞ');

    addMapping('ja', 'じゃ');
    addMapping('ju', 'じゅ');
    addMapping('je', 'じぇ');
    addMapping('jo', 'じょ');

    addMapping('jya', 'じゃ');
    addMapping('jyi', 'じぃ');
    addMapping('jyu', 'じゅ');
    addMapping('jye', 'じぇ');
    addMapping('jyo', 'じょ');

    addMapping('zya', 'じゃ');
    addMapping('zyi', 'じぃ');
    addMapping('zyu', 'じゅ');
    addMapping('zye', 'じぇ');
    addMapping('zyo', 'じょ');

    addMapping('chi', 'ち');
    addMapping('tsu', 'つ');

    addMapping('ta', 'た');
    addMapping('ti', 'ち');
    addMapping('tu', 'つ');
    addMapping('te', 'て');
    addMapping('to', 'と');

    addMapping('cha', 'ちゃ');
    addMapping('chu', 'ちゅ');
    addMapping('che', 'ちぇ');
    addMapping('cho', 'ちょ');

    addMapping('tya', 'ちゃ');
    addMapping('tyi', 'ちぃ');
    addMapping('tyu', 'ちゅ');
    addMapping('tye', 'ちぇ');
    addMapping('tyo', 'ちょ');

    addMapping('cya', 'ちゃ');
    addMapping('cyi', 'ちぃ');
    addMapping('cyu', 'ちゅ');
    addMapping('cye', 'ちぇ');
    addMapping('cyo', 'ちょ');

    addMapping('ltu', 'っ');
    addMapping('xtu', 'っ');
    addMapping('ltsu', 'っ');

    addMapping('tsa', 'つぁ');
    addMapping('tsi', 'つぃ');
    addMapping('tse', 'つぇ');
    addMapping('tso', 'つぉ');

    addMapping('tha', 'てゃ');
    addMapping('thi', 'てぃ');
    addMapping('thu', 'てゅ');
    addMapping('the', 'てぇ');
    addMapping('tho', 'てょ');

    addMapping('twa', 'とぁ');
    addMapping('twi', 'とぃ');
    addMapping('twu', 'とぅ');
    addMapping('twe', 'とぇ');
    addMapping('two', 'とぉ');

    addMapping('zu', 'づ');    // deviation from standard - I disagree with this mapping missing so much I refuse to not offer it.
    addMapping('ji', 'ぢ');    // deviation from standard - I disagree with this mapping missing so much I refuse to not offer it.

    addMapping('da', 'だ');
    addMapping('di', 'ぢ');
    addMapping('du', 'づ');
    addMapping('de', 'で');
    addMapping('do', 'ど');

    addMapping('dya', 'ぢゃ');
    addMapping('dyi', 'ぢぃ');
    addMapping('dyu', 'ぢゅ');
    addMapping('dye', 'ぢぇ');
    addMapping('dyo', 'ぢょ');

    addMapping('dha', 'でゃ');
    addMapping('dhi', 'でぃ');
    addMapping('dhu', 'でゅ');
    addMapping('dhe', 'でぇ');
    addMapping('dho', 'でょ');

    addMapping('dwa', 'どぁ');
    addMapping('dwi', 'どぃ');
    addMapping('dwu', 'どぅ');
    addMapping('dwe', 'どぇ');
    addMapping('dwo', 'どぉ');

    addMapping('na', 'な');
    addMapping('ni', 'に');
    addMapping('nu', 'ぬ');
    addMapping('ne', 'ね');
    addMapping('no', 'の');

    addMapping('nya', 'にゃ');
    addMapping('nyi', 'にぃ');
    addMapping('nyu', 'にゅ');
    addMapping('nye', 'にぇ');
    addMapping('nyo', 'にょ');

    addMapping('fu', 'ふ');

    addMapping('ha', 'は');
    addMapping('hi', 'ひ');
    addMapping('hu', 'ふ');
    addMapping('he', 'へ');
    addMapping('ho', 'ほ');

    addMapping('hya', 'ひゃ');
    addMapping('hyi', 'ひぃ');
    addMapping('hyu', 'ひゅ');
    addMapping('hye', 'ひぇ');
    addMapping('hyo', 'ひょ');

    addMapping('fya', 'ふゃ');
    addMapping('fyi', 'ふぃ');
    addMapping('fyu', 'ふゅ');
    addMapping('fye', 'ふぇ');
    addMapping('fyo', 'ふょ');

    addMapping('fa', 'ふぁ');
    addMapping('fi', 'ふぃ');
    addMapping('fe', 'ふぇ');
    addMapping('fo', 'ふぉ');

    addMapping('ba', 'ば');
    addMapping('bi', 'び');
    addMapping('bu', 'ぶ');
    addMapping('be', 'べ');
    addMapping('bo', 'ぼ');

    addMapping('bya', 'びゃ');
    addMapping('byi', 'びぃ');
    addMapping('byu', 'びゅ');
    addMapping('bye', 'びぇ');
    addMapping('byo', 'びょ');

    addMapping('va', 'ヴぁ');
    addMapping('vi', 'ヴぃ');
    addMapping('vu', 'ヴ');
    addMapping('ve', 'ヴぇ');
    addMapping('vo', 'ヴぉ');

    addMapping('vya', 'ヴゃ');
    addMapping('vyi', 'ヴぃ');
    addMapping('vyu', 'ヴゅ');
    addMapping('vye', 'ヴぇ');
    addMapping('vyo', 'ヴょ');

    addMapping('pa', 'ぱ');
    addMapping('pi', 'ぴ');
    addMapping('pu', 'ぷ');
    addMapping('pe', 'ぺ');
    addMapping('po', 'ぽ');

    addMapping('pya', 'ぴゃ');
    addMapping('pyi', 'ぴぃ');
    addMapping('pyu', 'ぴゅ');
    addMapping('pye', 'ぴぇ');
    addMapping('pyo', 'ぴょ');

    addMapping('ma', 'ま');
    addMapping('mi', 'み');
    addMapping('mu', 'む');
    addMapping('me', 'め');
    addMapping('mo', 'も');

    addMapping('mya', 'みゃ');
    addMapping('myi', 'みぃ');
    addMapping('myu', 'みゅ');
    addMapping('mye', 'みぇ');
    addMapping('myo', 'みょ');

    addMapping('ya', 'や');
    addMapping('yu', 'ゆ');
    addMapping('yo', 'よ');

    addMapping('lya', 'ゃ');
    addMapping('lyu', 'ゅ');
    addMapping('lyo', 'ょ');

    addMapping('xya', 'ゃ');
    addMapping('xyu', 'ゅ');
    addMapping('xyo', 'ょ');

    addMapping('ra', 'ら');
    addMapping('ri', 'り');
    addMapping('ru', 'る');
    addMapping('re', 'れ');
    addMapping('ro', 'ろ');

    addMapping('rya', 'りゃ');
    addMapping('ryi', 'りぃ');
    addMapping('ryu', 'りゅ');
    addMapping('rye', 'りぇ');
    addMapping('ryo', 'りょ');

    addMapping('wa', 'わ');
    addMapping('wyi', 'ゐ'); // deviation from standard
    addMapping('wye', 'ゑ'); // deviation from standard
    addMapping('wo', 'を');

    addMapping('lwa', 'ゎ');
    addMapping('xwa', 'ゎ');

    addMapping('-', 'ー');  // long vowel mark

    /*
    addMapping(' ', '　');  // japanese space
    addMapping('[', '「');  // japanese opening quote
    addMapping(']', '」');  // japanese opening quote
    addMapping('*', '＊');  // japanese asterisk
    addMapping('?', '？');  // japanese question mark
    addMapping('.', '。');  // japanese full stop
    addMapping(',', '、');  // japanese comma
    */

    // all hira glyphs
    var hiragana = ["ぁ", "あ", "ぃ", "い", "ぅ", "う", "ぇ", "え", "ぉ", "お",
      "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご",
      "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ",
      "た", "だ", "ち", "ぢ", "っ", "つ", "づ", "て", "で", "と", "ど",
      "な", "に", "ぬ", "ね", "の",
      "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ",
      "ま", "み", "む", "め", "も",
      "ゃ", "や", "ゅ", "ゆ", "ょ", "よ",
      "ら", "り", "る", "れ", "ろ",
      "ゎ", "わ", "ゐ", "ゑ", "を",
      "ん", "ゔ", "ゕ", "ゖ",
      "わ゛", "ゐ゛", "ゑ゛", "を゛"];

    // all kata glyphs
    var katakana = ["ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ",
      "カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ",
      "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ",
      "タ", "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド",
      "ナ", "ニ", "ヌ", "ネ", "ノ",
      "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ",
      "マ", "ミ", "ム", "メ", "モ",
      "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ",
      "ラ", "リ", "ル", "レ", "ロ",
      "ヮ", "ワ", "ヰ", "ヱ", "ヲ",
      "ン", "ヴ", "ヵ", "ヶ",
      "ヷ", "ヸ", "ヹ", "ヺ"];

    // all kanji in the basic unicode plane
    var kanjiRange = /[\u3300-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

    // replace values from array 1 with corresponding values from array 2
    var replaceArray = function (searcharray, replacearray, input) {
      var i, e = searcharray.length;
      for (i = 0; i < e; i++) {
        input = input.replace(new RegExp(searcharray[i], "g"), replacearray[i]);
      }
      return input;
    }

    // check whether a string contains any of the entries in a given array
    var containsArray = function (searcharray, input) {
      var i, e = searcharray.length;
      for (i = 0; i < e; i++) {
        if (input.indexOf(searcharray[i]) !== -1) {
          return true;
        }
      }
      return false;
    };

    module.exports = {
      // convert input from romaji to kana
      convert: function (input) {
        var output = {
          kanji: false,
          hiragana: false,
          katakana: false,
          romaji: input
        };

        // does the input contain any kanji?
        if (new RegExp(kanjiRange).test(input)) {
          output.kanji = input;
          output.romaji = false;
          return output;
        }

        var roman = input;
        // does the input contain any kana?
        if (new RegExp("[\u3040-\u30FF]").test(input)) {
          output.romaji = this.romanise(input);
        }

        // convert, or touch up, input to katakana and hiragana
        output.katakana = replaceArray(["aa", "ii", "uu", "ee", "oo"], ["a-", "i-", "u-", "e-", "o-"], input);
        output.katakana = replaceArray(dcmap.keys, dcmap.values, output.katakana);
        output.hiragana = replaceArray(dcmap.keys, dcmap.values, input);

        // successively replace
        for (var i = 4; i > 0; i--) {
          if (map[i]) {
            output.katakana = replaceArray(map[i].keys, map[i].values, output.katakana);
            output.hiragana = replaceArray(map[i].keys, map[i].values, output.hiragana);
          }
        }

        // do the final katakana conversion step
        output.katakana = replaceArray(hiragana, katakana, output.katakana);

        // if the katakana still contains ascii, this word cannot be converted
        if (new RegExp("[\u0041-\u005A\u0061-\u007A]").test(output.katakana)) {
          return false;
        }

        // if the hiragana word contains any katakana, it cannot be a word spelled using hiragana
        else if ((new RegExp("[\u30A0-\u30FF]")).test(output.hiragana)) {
          output.hiragana = false;
        }

        // for romanising purposes, a training っ cannot be transliterated in any sensible way...
        if (output.romaji) { output.romaji = output.romaji.replace(/っ$/, '!'); }

        return output;
      },

      // romanise a kana string
      romanise: function (kana) {
        if ((new RegExp("[\u30A0-\u30FF]")).test(kana)) {
          kana = replaceArray(katakana, hiragana, kana);
        }
        // make sure っ is not in the reverse mapping, because it causes quite some problems
        rmap[1].remove("っ");
        var result = kana;
        result = replaceArray(rmap[2].keys, rmap[2].values, result);
        result = replaceArray(rmap[1].keys, rmap[1].values, result);
        // then do sensible っ replacement instead
        result = result.replace(/っ(\w)/g, "$1$1");
        // turn a trailing っ into a "!" because that's the most semantically correct I can come up with
        result = result.replace(/っ$/, '!');
        return result;
      }
    };

  }, {}]
}, {}, [1]);
