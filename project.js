let GemeMin
let cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6']
let randomCards = new Array(cards.length * 2)
let index = 0
let oneMemorycard = ""
let strtBottum = ""
let rememberCard
let count = 0
let copyForOne
let copyForTwo
let allPoints = 0
let Points;
let countTry = 0;
let ClickSound = new Audio('Click.mp3')
let correct = new Audio('good.mp3')
let win = new Audio('winner.mp3')
let gameOver = new Audio('gameover.mp3')
// document.getElementById("ClickSound")

function myLevel(min) {

    GameMin = min;
    MakeNewArry()
}

function MakeNewArry() {
    index = 0
    let apear = 0
    while (index < randomCards.length) {
        let myCard = cards[parseInt(Math.random() * cards.length)];
        for (let i = 0; i < index; i++) {
            if (randomCards[i] == myCard)
                apear++
        }
        if (apear < 2) {
            randomCards[index] = myCard
            index++
        }

        apear = 0
    }
    newPageAndMakeTheCardsOnTheScreen()
}

function newPageAndMakeTheCardsOnTheScreen() {
    let theClass = document.querySelectorAll('.welcome')
    for (let i = 0; i < theClass.length; i++) {
        if (i == 0) {
            theClass[i].innerHTML = "Memory Game"
            theClass[i].style.fontSize = '120px';

        }
        else
            theClass[i].style.display = "none"
    }

    theClass = document.querySelectorAll('.welcome2')
    for (let i = 0; i < theClass.length; i++) {
        theClass[i].style.display = "none"
    }

    let theCardIndex
    for (let i = 0; i < randomCards.length; i++) {

        let cards = document.createElement('div');
        cards.setAttribute('class', 'theCard'); //להוסיף Idלכל קלאס
        cards.style.fontSize = "large"
        let rememberClass = cards
        document.querySelector("#Allcards").appendChild(cards);


        cards = document.createElement('div');
        cards.setAttribute('class', 'StaylForCard');
        theCardIndex = document.querySelectorAll(".theCard")
        theCardIndex[i].appendChild(cards);

        cards = document.createElement('div');
        cards.setAttribute('class', randomCards[i]); //קלאס של הצד הפנימי
        theCardIndex[i].appendChild(cards);

        rememberClass.addEventListener("click", () => {
            if (strtBottum == "emp") {
                if (count == 6)
                    startAgain()
                else {
                    if (rememberClass.style.fontSize != "large")   //האם הקלף פתוח או סגור(סגור=לארג')
                        document.querySelector(".msg").innerHTML = "pleas enter on a new card"
                    else {
                        ClickSound.play();
                        rememberClass.style.transform = "rotateY(180deg)"
                        rememberClass.style.fontSize = "small"
                        if (oneMemorycard == "")
                            oneMemorycard = rememberClass
                        else {
                            copyForOne = oneMemorycard
                            copyForTwo = rememberClass
                            setTimeout(finish, 1000)
                            oneMemorycard = ""
                        }
                    }
                }

            }

        })
    }

    console.log(randomCards)

    document.querySelector('.Title').innerHTML = "Score"
    document.querySelector('.Title2').innerHTML = "massage"
    //פסים צדדיים
    let FindCanvas = document.querySelectorAll(".can");
    console.log(FindCanvas)
    for (let i = 0; i < FindCanvas.length; i++) {
        FindCanvas[i].style.display = "inline-block"
    }
    let canvas1 = document.getElementById('myCanvas1');
    let ctx1 = canvas1.getContext('2d');
    ctx1.moveTo(0, 0);
    ctx1.lineTo(0, 600);
    ctx1.lineWidth = 6;
    ctx1.stroke()
    let canvas2 = document.getElementById('myCanvas2');
    let ctx2 = canvas2.getContext('2d');
    ctx2.lineTo(50, 0);
    ctx2.lineTo(50, 600);
    ctx2.lineWidth = 6;
    ctx2.stroke()

    //שעון
    document.querySelector('.clock').style.border = "solid";
    let CopytGameMin = GameMin;
    if (GameMin < 60)
        document.querySelector('.clock').innerHTML = "00:" + CopytGameMin;
    else if (CopytGameMin >= 60 && CopytGameMin < 120) {
        CopytGameMin = CopytGameMin - 60;
        if (CopytGameMin == 0)
            document.querySelector('.clock').innerHTML = "01:" + "00";
        else
            document.querySelector('.clock').innerHTML = "01:" + CopytGameMin;

    }
    else if (CopytGameMin >= 120 && CopytGameMin < 180) {
        CopytGameMin = CopytGameMin - 120;
        if (CopytGameMin == 0)
            document.querySelector('.clock').innerHTML = "02:" + "00";
        else
            document.querySelector('.clock').innerHTML = "02:" + CopytGameMin;
    }

    //ניראות כפתור הstart
    document.querySelector('.startButtom').style.display = "inline-block"
    document.querySelector('#startButtomBackGroung').style.backgroundColor = "rgba(0, 0, 0, 0.371)";
    strtBottum = "full"

}

function finish() {

    if (copyForOne.lastElementChild.className != copyForTwo.lastElementChild.className) {
        console.log(copyForOne.lastElementChild.className)
        console.log(copyForTwo.lastElementChild.className)
        copyForTwo.style.transform = "rotateY(360deg)"
        copyForTwo.style.fontSize = "large"
        copyForOne.style.transform = "rotateY(360deg)"
        copyForOne.style.fontSize = "large"
        document.querySelector(".msg").innerHTML = "the cards are not equals"
        countTry++


    }
    else {
        correct.play()
        document.querySelector(".msg").innerHTML = "the cards are equals"
        count++
        Points = 100 - (countTry * 10)
        allPoints += Points
        document.querySelector(".attempts").innerHTML = "attempts: " + countTry
        document.querySelector(".Score").innerHTML = "Score: " + Points
        document.querySelector(".allScore").innerHTML = "all Score: " + allPoints
        countTry = 0
        if (count == 6) {
            clearInterval(si);
            win.play()
            let a = document.querySelectorAll('.startButtom')
            document.querySelector('#startButtomBackGroung').style.backgroundColor = "rgba(0, 0, 0, 0.371)";
            a[1].style.display = "inline-block"
        }
    }



}

let si;
function startTheGame() {

    document.querySelector('.startButtom').style.display = "none"
    strtBottum = "emp"
    document.querySelector('#startButtomBackGroung').style.backgroundColor = "rgba(0, 0, 0, 0)";
    //הפעלת השעון
    let number = GameMin;


    si = setInterval(() => {
        if (number >= 10 && number < 60)
            document.querySelector('.clock').innerHTML = "00:" + number;
        else if (number < 10)
            document.querySelector('.clock').innerHTML = "00:" + "0" + number;
        else if (number >= 70 && number < 120)
            document.querySelector('.clock').innerHTML = "01:" + (number - 60);
        else if (number < 70 && number > 60)
            document.querySelector('.clock').innerHTML = "01:" + "0" + (number - 60);
        else if (number >= 130 && number < 180)
            document.querySelector('.clock').innerHTML = "02:" + (number - 120);
        else if (number < 130 && number > 120)
            document.querySelector('.clock').innerHTML = "02:" + "0" + (number - 120);
        number--;
        if (number < 0) {
            clearInterval(si);
            strtBottum = "full"
            let a = document.querySelectorAll('.startButtom')
            document.querySelector('#startButtomBackGroung').style.backgroundColor = "rgba(0, 0, 0, 0.371)";
            if (count < 6) {
                a[2].style.display = "inline-block"
                gameOver.play()
            }
            else
                a[1].style.display = "inline-block"

        }
    }, 1000);
}

function startAgain() {
    location.reload();

}