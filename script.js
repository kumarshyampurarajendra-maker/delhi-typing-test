let time = 600;
let timer = null;
let testStarted = false;

const paragraphElement = document.getElementById("paragraph");
const typingArea = document.getElementById("typingArea");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const languageSelect = document.getElementById("language");

function loadParagraph() {

if(languageSelect.value === "hindi"){
paragraphElement.innerText = hindiParagraphs[0];
}else{
paragraphElement.innerText = englishParagraphs[0];
}

}

loadParagraph();

languageSelect.addEventListener("change", loadParagraph);

document.getElementById("startBtn").addEventListener("click", startTest);
document.getElementById("submitBtn").addEventListener("click", submitTest);

function startTest(){

if(testStarted) return;

testStarted = true;

typingArea.disabled = false;
typingArea.focus();

timer = setInterval(function(){

time--;

let min = Math.floor(time / 60);
let sec = time % 60;

timerElement.innerText =
min + ":" + (sec < 10 ? "0" : "") + sec;

if(time <= 0){
submitTest();
}

},1000);

}

function submitTest(){

clearInterval(timer);

typingArea.disabled = true;

const originalWords =
paragraphElement.innerText.trim().split(/\s+/);

const typedWords =
typingArea.value.trim().split(/\s+/);

let correct = 0;
let mistakes = 0;

for(let i = 0; i < typedWords.length; i++){

if(typedWords[i] === originalWords[i]){
correct++;
}else{
mistakes++;
}

}

let totalWords = typedWords.length;

let grossWPM = Math.round(totalWords / 10);

let netWPM = Math.max(0, grossWPM - mistakes);

let accuracy = totalWords > 0
? ((correct / totalWords) * 100).toFixed(2)
: 0;

let qualifyingSpeed =
languageSelect.value === "hindi"
? 25
: 30;

let status =
netWPM >= qualifyingSpeed
? "QUALIFIED"
: "NOT QUALIFIED";

resultElement.innerHTML =
"Total Words: " + totalWords +
"<br>Correct Words: " + correct +
"<br>Mistakes: " + mistakes +
"<br>Accuracy: " + accuracy + "%" +
"<br>Gross WPM: " + grossWPM +
"<br>Net WPM: " + netWPM +
"<br>Status: " + status;

  }
