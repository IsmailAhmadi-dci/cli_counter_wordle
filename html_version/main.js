// On page load or reload: *********************************************************************************

function onLoad() {
    for (let i = 1 ; i < 6 ; i++) {
        const item = document.getElementsByName('vl' + i);
        for (const term of item) {
            if (term.value == 'no') {
                term.checked = true ;
            } else {
                term.checked = false;
            }
        }
    }
}

onLoad();

// Global Variables : ***************************************************************************************

const fld = fiveLetterDictionary;
const sa = document.getElementById('suggestion-area');

let initalArray = fld.filter(item => item);

let targetWord = 'words';


// variable for searching the words:

let fixed = [];
let includedLetters = [];
let excludedLetters = [];


// Functions : ************************************************************************************************

function play() {
    if (document.getElementById('l1').innerHTML == '') {
        kickStart();
    } else {
        goAhead();
    }
}

function kickStart() {
    const array = [];
    let txt = '';
    for (let i = 0 ; i < 25 ; i++) {
        let word = fld[Math.floor(Math.random() * fld.length)];
        if (array.indexOf(word) === -1) {
            array.push(word);
        }
    }

    for (const item of array) {
        txt += `<button class="sug-btn" onclick="putWord('${item}')">${item}</button>`;
    }

    sa.innerHTML = txt;
}

function putWord(text) {
    targetWord = text ;
    for(let i = 0 ; i < 5 ; i++) {
        document.getElementById('l' + (i + 1)).innerHTML = targetWord[i];
    }
    document.getElementById('play-btn').innerHTML = 'Go Ahead';
}

function goAhead() {
    // main variable:
    const array = [];

    // to search the letter-holders for value:
    for (let i = 1 ; i <= 5 ; i++) {
        const item = document.getElementsByName('vl' + i);
        for (const term of item) {
            if (term.checked) {
                array.push(term.value);
            }
        }
    }

    // transfering the values the search variables:
    for (let i = 0 ; i < 5 ; i++) {
        if (array[i] == 'perfect') {
            fixed[i] = targetWord[i];
        } else if (array[i] == 'included') {
            fixed[i] = '.';
            if(includedLetters.indexOf(targetWord[i]) == -1) includedLetters.push(targetWord[i]);
        } else {
            fixed[i] = '.';
            if (excludedLetters.indexOf(targetWord[i]) == -1) excludedLetters.push(targetWord[i]);
        }
    }

    // adding letters in fixed to includedLetters:
    for (let i = 0 ; i < 5 ; i++) {
        if (fixed[i] != '.') {
            if (includedLetters.indexOf(fixed[i]) == -1) includedLetters.push(fixed[i]);
        }
    }


    // Debug: to remove included letters from excluded ones:
    for (const letter of includedLetters) {
        excludedLetters = excludedLetters.filter(item => item != letter);
    }

    searchWord();
    

}

// main search function:

function searchWord() {
    
    //Looking for excluded letters:
    if (excludedLetters.join('') != '') {
        initalArray = initalArray.filter(item => {
            let result = true;
            for (const letter of excludedLetters) {
                if (item.indexOf(letter) > -1) result = false;
            }
            return result;
        });
    }

    //mapping excluded letters to html screen:
    document.getElementById('info-excluded').innerHTML = excludedLetters.join(', ').toUpperCase();


    //Looking for included letters:
    if(includedLetters.join('') != '') {
        initalArray = initalArray.filter(item => {
            let result = true;
            for (const letter of includedLetters) {
                if(item.indexOf(letter) == -1) result = false;
            }
            return result;
        });
    }

    //mapping included letters to html screen:
    document.getElementById('info-included').innerHTML = includedLetters.join(', ').toUpperCase();



    //Looking for fixed letter who perfectly matches letter and position:
    let re = RegExp(fixed.join(''),'g');
    if(fixed.join('') != '.....') {
        initalArray = initalArray.filter(item => re.test(item));
    }

    //mapping fixed to html screen:
    document.getElementById('info-fixed').innerHTML = fixed.join(' ').toUpperCase().replaceAll('.', '*');


    // suggesting new guess:
    let txt = '';

    for (let item of initalArray) {
        txt += `<button class="sug-btn" onclick="putWord('${item}')">${item}</button>`;
    }

    sa.innerHTML = txt;

    initalArray = fld.filter(item => item);
}