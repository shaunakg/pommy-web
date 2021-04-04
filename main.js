
document.getElementById("year").innerText = new Date().getFullYear();

const config = {

    times: [
        {
            time: 1500,
            desc: "25 minute working period"
        },

        {
            time: 300,
            desc: "5 minute break"
        },

        {
            time: 900,
            desc: "15 minute break"
        },

        {
            time: 5,
            desc: "5 secs"
        }
    ],

    end_audio: "audio/over.mp3"    
    
}

const timer = document.getElementById("time");
const buttons = document.getElementById("buttons");
const playSound = document.getElementById("play");
const progress = document.getElementById("progress");
const reset = document.getElementById('reset');
let interval, currentTimeRemaining, currentAudio, currentType;

const updateTime = () => {

    if (currentTimeRemaining == 0) {

        timer.innerText = "00:00";
        progress.style.height = 0;

        document.body.classList.remove("counting");
        document.body.classList.add("over");
        reset.style.display = "block";
        clearInterval(interval);

        if (playSound.checked) {
            currentAudio = new Audio(config.end_audio);
            currentAudio.play();
        } else {
            alert(currentType.desc + " pomodoro timer finished.") 
        }

        return;

    }

    progress.style.width = currentTimeRemaining/currentType.time * 100 + "%";

    timeobj = moment.duration(currentTimeRemaining, 'seconds');
    timer.innerText = timeobj.minutes().toString().padStart(2,0) + ":" + timeobj.seconds().toString().padStart(2,0);

    currentTimeRemaining -= 1;

}

config.times.forEach((type) => {

    console.dir(type)
    
    newButton = document.createElement("a");
    newButton.href = "#";
    newButton.innerText = type.desc;
    newButton.classList.add("btn")

    newButton.onclick = () => {

        document.body.classList.remove('over');
        document.body.classList.add('counting');

        progress.style.height = "10px";

        currentAudio && currentAudio.pause();

        clearInterval(interval);

        console.log("setting time for:")
        console.table(type)

        currentTimeRemaining = type.time;
        currentType = type;
        updateTime()

        interval = setInterval(updateTime, 1000);

    }

    buttons.appendChild(newButton)

});
