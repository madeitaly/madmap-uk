// Function to type sentence in HTML page like type-writer
/* Inspiration taken from this Medium article 
https://medium.com/front-end-weekly/how-to-create-typing-effect-in-css-and-js-3252dd807f0a */
const carouselText = [
    { text: "an explorer.", color: "rgb(254, 245, 225)" },
    { text: "an engineer.", color: "rgb(254, 245, 225)" },
    { text: "a thinker.", color: "rgb(254, 245, 225)" },
    { text: "a traveller.", color: "rgb(254, 245, 225)" },
    { text: "an optmist.", color: "rgb(254, 245, 225)" },
    { text: "an idiot.", color: "rgb(254, 245, 225)" },
    { text: "anything I want.", color: "rgb(254, 245, 225)" }
]

$(document).ready(async function () {
    carousel(carouselText, "#feature-text")
});

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

async function startFullSentence(sentence, eleRef) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function carousel(carouselList, eleRef) {
    var i = 0;
    var firstTime = true;
    while (true) {
        if (firstTime) {
            await startFullSentence(carouselList[i].text, eleRef);
            await waitForMs(3000);
            await deleteSentence(eleRef);
            await waitForMs(500);
            firstTime = false;
            i ++
        } else {
            // updateFontColor(eleRef, carouselList[i].color)
            await typeSentence(carouselList[i].text, eleRef);
            await waitForMs(2000);
            await deleteSentence(eleRef);
            await waitForMs(500);
            i++
            if (i >= carouselList.length) { i = 0; }
        }

    }
}


function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// Easter Egg triggered with 3 Clicks
var egg = document.querySelector('.easter-egg');

let countClicks = 0;

egg.onclick = function() { 
  countClicks++;
  console.log(countClicks);
  if(countClicks === 3) {
    document.location.href = "https://madeitaly.github.io/nerdCV/";
  }
};

