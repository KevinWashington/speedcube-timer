let timerEl = document.querySelector(".timer")
let scrambleEl = document.querySelector(".scramble")
let running = false
let miliseconds = "0"+0
let milisecondsEl = document.querySelector(".miliseconds")
let seconds = 0
let secondsEl = document.querySelector("#seconds")
let minutes = 0
let minutesEl = document.querySelector("#minutes") 
let interval
let times = []
let scramble = []
let faces = ["F", "B", "R", "L", "U", "D"]
let moves = ["", "'", "2"]
let face = 0
let faceMove = 0
let lastFace = "" 
let lastScramble
let bestTime = 99999999999999999
let bestTimeEl = document.querySelector("#bestTime")
let avg3arr = []
let avg3 = 0
let avg3El = document.querySelector("#avg3")
let avg5arr = []
let avg5 = 0
let avg5El = document.querySelector("#avg5")
let avg12arr = []
let avg12 = 0
let avg12El = document.querySelector("#avg12")
let avgarr = []
let avg = 0
let avgEl = document.querySelector("#avgall")

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
        secondsEl.innerHTML= seconds
        milisecondsEl.innerHTML = miliseconds
    }else{
        minutesEl.innerHTML = minutes + ":"
        seconds < 10 ? secondsEl.innerHTML= "0" + seconds : secondsEl.innerHTML = seconds
        milisecondsEl.innerHTML = miliseconds
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
            scramble.push(`${faces[face]}${moves[faceMove]}   `)
        }
        lastFace = face
    }while(scramble.length<20)
    for (i in scramble){
        scrambleEl.innerHTML += scramble[i]
    }
}

function saveTime(){
    let divNova = document.createElement("li");
    times.push({time: Number(`${minutes*60+seconds}.${miliseconds}`),scramble: lastScramble})

    if(times[times.length - 1].time < bestTime){
        bestTime = times[times.length - 1].time
        bestTimeEl.innerHTML = bestTime
    }
    if(times.length >=3){
        avg3 = 0
        avg3arr = times.slice(-3)
        avg3arr.forEach(e => {
            avg3 += e.time
        });
        avg3El.innerHTML = (avg3/3).toFixed(2)
    }
    if(times.length >=5){
        avg5 = 0
        avg5arr = times.slice(-5)
        avg5arr.forEach(e => {
            avg5 += e.time
        });
        avg5El.innerHTML = (avg5/5).toFixed(2)
    }
    if(times.length >=12){
        avg12 = 0
        avg12arr = times.slice(-12)
        avg12arr.forEach(e => {
            avg12 += e.time
        });
        avg12El.innerHTML = (avg12/12).toFixed(2)
    }
    if(times.length >=1){
        avg = 0
        times.forEach(e => {
            avg += e.time
        });
        avgEl.innerHTML = (avg/times.length).toFixed(2)
    }

    divNova.innerHTML = `<p>${timerEl.innerText}</p>`
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
        lastScramble = scrambleEl.innerHTML
        scrambleEl.innerHTML = ""
        newScramble()
        interval = setInterval(timer, 100);
    }else{
        saveTime()
        running = false
        clearInterval(interval)
    }
}

