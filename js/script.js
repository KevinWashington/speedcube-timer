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
let listaEl = document.querySelector(".savedTimes")
let id = 0
let resultado = document.querySelector(".mostraSolveScramble")
let scrambleDaSolve = document.querySelector(".scrambleDaSolve")

newScramble()

document.addEventListener("keyup", (e)=>{
    if(e.which == 32){
        run()
    }
})

function timer(){
    
    miliseconds++
    miliseconds < 10 ? miliseconds = "0"+miliseconds : miliseconds
    if(miliseconds == 100){
        seconds++
        miliseconds = "0" + 0
        if(seconds == 60){
            minutes ++
            minutes < 10 ? minutes = "0"+minutes : minutes
            seconds = 0
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
    let divNova = document.createElement("tr");
    divNova.classList.add("savedTimes")
    times.push({time: Number(`${minutes*60+seconds}.${miliseconds}`),scramble: lastScramble, id: times.length})
    divNova.setAttribute("data-id", times[times.length - 1].id)
    divNova.innerHTML = `<td>${times[times.length - 1].id+1}</td><td>${timerEl.innerText}</td>`

    if(times[times.length - 1].time < bestTime){
        bestTime = times[times.length - 1].time
        if(bestTime >= 60 ){
            bestTimeEl.innerHTML = `${(bestTime/60).toFixed(0)}:${ bestTime < 1 ? (bestTime%60).toFixed(2) : "0"+(bestTime%60).toFixed(2)}` 
        }else{
            bestTimeEl.innerHTML = bestTime
        }
        
    }
    if(times.length >=3){
        avg3 = 0
        avg3arr = times.slice(-3)
        avg3arr.forEach(e => {
            avg3 += e.time
        });
        if(avg3/3 >= 60 ){
            avg3El.innerHTML = `${(avg3/3/60).toFixed(0)}:${ avg3/3 < 1 ? ((avg3/3)%60).toFixed(2) : "0"+((avg3/3)%60).toFixed(2)}` 
        }else{
            avg3El.innerHTML = (avg3/3).toFixed(2)
        }
        
    }
    if(times.length >=5){
        avg5 = 0
        avg5arr = times.slice(-5)
        avg5arr.forEach(e => {
            avg5 += e.time
        });
        if(avg5/5 >= 60 ){
            avg5El.innerHTML = `${(avg5/5/60).toFixed(0)}:${ avg5/5 < 1 ? ((avg5/5)%60).toFixed(2) : "0"+((avg5/5)%60).toFixed(2)}` 
        }else{
            avg5El.innerHTML = (avg5/5).toFixed(2)
        }
        
    }
    if(times.length >=12){
        avg12 = 0
        avg12arr = times.slice(-12)
        avg12arr.forEach(e => {
            avg12 += e.time
        });
        if(avg12/12 >= 60 ){
            avg12El.innerHTML = `${(avg12/12/60).toFixed(0)}:${ avg12/12 < 1 ? ((avg12/12)%60).toFixed(2) : "0"+((avg12/12)%60).toFixed(2)}` 
        }else{
            avg12El.innerHTML = (avg12/12).toFixed(2)
        }
       
    }
    if(times.length >=1){
        avg = 0
        times.forEach(e => {
            avg += e.time
        });
        if(avg/times.length >= 60 ){
            avgEl.innerHTML = `${(avg/times.length/60).toFixed(0)}:${ avg/times.length < 1 ? ((avg/times.length)%60).toFixed(2) : "0"+((avg/times.length)%60).toFixed(2)}` 
        }else{
            avgEl.innerHTML = (avg/times.length).toFixed(2)
        }
        
    }
    let divpai = document.querySelector("tbody")
    divpai.insertBefore(divNova, divpai.firstChild)
}

function run(){
    if(!running){
        miliseconds = "0"+0
        seconds = 0
        minutesEl.innerHTML = ""
        minutes = 0
        running = true
        document.querySelector("#timer-container").classList.add("running")
        lastScramble = scrambleEl.innerHTML
        scrambleEl.innerHTML = "" 
        newScramble()
        interval = setInterval(timer, 10);
    }else{
        saveTime()
        seeSolveScrambles()
        document.querySelector("#timer-container").classList.remove("running")
        running = false
        clearInterval(interval)
    }
}



function seeSolveScrambles(){
    document.querySelectorAll(".savedTimes").forEach((e)=>{
        e.addEventListener("click", ()=>{
            id = e.getAttribute("data-id")
            scrambleDaSolve.innerText = times[id].scramble
            resultado.classList.add("active")
        })
    })
} 

document.querySelector(".fechaDetails").addEventListener("click", ()=>{
    resultado.classList.remove("active")
})
