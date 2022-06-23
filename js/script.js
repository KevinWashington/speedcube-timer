let timerEl = document.querySelector(".timer")
let scrambleEl = document.querySelector(".scramble")
let running = false
let miliseconds = "0"+0
let seconds = 0
let minutes = 0
let interval

let scramble = []
let faces = ["F", "B", "R", "L", "U", "D"]
let moves = ["", "'", "2"]
let face = 0
let faceMove = 0
let lastFace = "" 

newScramble()

document.addEventListener("keyup", (e)=>{
    if(e.which == 32){
        run()
    }
})

function timer(){
    miliseconds++
    if(miliseconds == 10){
        seconds++
        miliseconds = 0
        if(seconds == 60){
            minutes ++
            minutes < 10 ? minutes = "0"+minutes : minutes
            seconds = "0"+0
        }
    }
    if(minutes==0){
        timerEl.innerHTML = `${seconds}.<span class="miliseconds">${miliseconds}</span>`
    }else{
        timerEl.innerHTML = `${minutes}:${seconds}.<span class="miliseconds">${miliseconds}</span>`
    }
}

function newScramble(){
    scramble = []
    scrambleEl.innerHTML=""
    do{
        face = Math.floor(Math.random()*5.99)
        faceMove = Math.floor(Math.random()*2.99)
        if(lastFace === face){
            scramble.pop()
        }else{
            scramble.push(`${faces[face]}${moves[faceMove]}`)
        }
        lastFace = face
    }while(scramble.length<20)
    for (i in scramble){
        scrambleEl.innerHTML += scramble[i]
    }
}

function saveTime(){
    let divNova = document.createElement("li");
    divNova.innerHTML = `<p>${timerEl.innerText} ${scrambleEl.innerHTML}</p>`
    // adiciona o novo elemento criado e seu conteúdo ao DOM
    let divpai=document.querySelector("ul")
    divpai.append(divNova)
}

function run(){
    if(!running){
        miliseconds = "0"+0
        seconds = 0
        minutes = 0
        running = true
        scrambleEl.innerHTML = ""
        newScramble()
        interval = setInterval(timer, 100);
    }else{
        saveTime()
        running = false
        clearInterval(interval)
    }
}

