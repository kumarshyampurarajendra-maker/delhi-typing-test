let time = 600;
let timer;
let testStarted = false;

const paragraphElement = document.getElementById("paragraph");
const typingArea = document.getElementById("typingArea");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

paragraphElement.innerText = paragraphs[0];

document.getElementById("startBtn").addEventListener("click", startTest);
document.getElementById("submitBtn").addEventListener("click", submitTest);

function startTest() {

if(testStarted) return;

testStarted = true;

typingArea.disabled = false;
typingArea.focus();

timer = setInterval(() => {

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

const original =
paragraphElement.innerText
.toLowerCase()
.replace(/[^\w\s]/g,'');

const typed =
typingArea.value
.toLowerCase()
.replace(/[^\w\s]/g,'');

const originalWords = original.split(/\s+/);
const typedWords = typed.split(/\s+/);

let correct = 0;

for(let i=0;i<typedWords.length;i++){

if(typedWords[i] === originalWords[i]){
correct++;
}

}

let totalWords = typedWords.length
  let mistakes = 0;

for(let i = 0; i < typedWords.length; i++){

if(
typedWords[i] &&
originalWords[i] &&
typedWords[i] !== originalWords[i]
){
mistakes++;
}

}

let timeTaken = (600 - time) / 60;

if(timeTaken <= 0){
timeTaken = 1;
}

let grossWPM =
Math.round(totalWords / timeTaken);

let netWPM =
Math.max(0, grossWPM - mistakes);

let accuracy =
totalWords > 0
? ((correct / totalWords) * 100).toFixed(2)
: 0;

let status =
netWPM >= 30
? "QUALIFIED"
: "NOT QUALIFIED";
let errorReview = "<br><br><b>Wrong Words Review</b><br>";

for(let i = 0; i < typedWords.length; i++){

if(
typedWords[i] &&
originalWords[i] &&
typedWords[i] !== originalWords[i]
){

errorReview +=
"<span style='color:red'>" +
typedWords[i] +
"</span> → " +
originalWords[i] +
"<br>";

}

}
resultElement.innerHTML =

"Total Words: " + totalWords +
"<br>Correct Words: " + correct +
"<br>Mistakes: " + mistakes +
"<br>Accuracy: " + accuracy + "%" +
"<br>Gross WPM: " + grossWPM +
"<br>Net WPM: " + netWPM +
"<br>Status: " + status +
errorReview;
  }
