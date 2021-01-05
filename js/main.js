// 사용 변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
// console.log(wordInput)
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

// 사용하는 변수들을 화면이 렌더링 됐을때 바로 선언해주는 게 좋을 것 같음
init();

function init(){
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run() {
    if(isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중');
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange("게임시작")
        clearInterval(checkInterval)
    }
}

// 단어들을 일단은 배열로 선언해서 하드코딩으로 불러올건데 나중에 단어 api를 통해서 랜덤한 단어를 사이트에서 받아오는 걸로 해볼것
// 단어 불러오기
function getWords() {
    const words = ['Hello', 'Banana', 'Apple', 'Cherry'];
    buttonChange('게임시작');
}

/*
// 단어 입력시 비교 및 점수 증가
wordInput.addEventListener('input', ()=>{
    // console.log(wordInput.value, wordDisplay.innerHTML) 공백 생김 innterHTML.trim() 도 가능
    // console.log(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase())
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        score++;
        scoreDisplay.innerText = score;
        wordInput.value = "";
    }
    
})
*/

// 단어 일치 체크
function checkMatch () {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);  // Math.floor 소수값이 존재할 떄 소수값을 버리는 역할을 하는 함수
        wordDisplay.innerText = words[randomIndex];
    }
}

// countDown 함수를 1초마다 실행시켜주는 함수
// setInterval(countDown, 1000);

/* 자바스크립트로 주기적인 작업을 실행하기 위해서 setInterval과 setTimeout 메소드를 사용할 수 있습니다. 두 가지는 비숫하지만 중요한 차이점을 가집니다.
- setInterval 함수 : 일정한 시간 간격으로 작업을 수행하기 위해서 사용합니다.clearInterval 함수를 사용하여 중지할 수 있습니다. 주의할 점은 일정한 시간 간격으로 실행되는 작업이 그 시간 간격보다 오래걸릴 경우 문제가 발생할 수 있습니다.
- setTimeout 함수 : 일정한 시간 후에 작업을 한번 실행합니다. 보통 재귀적 호출을 사용하여 작업을 반복합니다. 기본적으로 setInterval 과는 달리 지정된 시간을 기다린후 작업을 수행하고, 다시 일정한 시간을 기다린후 작업을 수행하는 방식입니다. 지정된 시간 사이에 작업 시간이 추가 되는 것입니다. clearTimeout() 을 사용해서 작업을 중지합니다.
출처: https://offbyone.tistory.com/241 [쉬고 싶은 개발자]
*/



// 버튼을 눌렀을때 시간 카운트
function countDown(){
    // React 나 Vue.js를 사용할경우 삼항연산자를 많이 사용하게 됨. 
    // 삼항 연산자 (조건) ? 참일경우 : 거짓일 경우
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying){    // isPlaying 이 false 이면
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}


function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}