const titleScreen = document.getElementById('title-screen');


window.addEventListener('load', () => {
  setTimeout(() => {
    titleScreen.classList.add('hidden');
    
  }, 0)
})



bubbleWrap();





function bubbleWrap() {
  // console.log("window resized");
  numberToDie = Math.floor(Math.random() * 7) + 6;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // console.log(`${windowWidth} x ${windowHeight}`);

  let numberTilesWide = 0;
  let numberTilesTall = 0;

  // set duration based on css variable
  // const styleVars = getComputedStyle(document.body);
  const styleVars = getComputedStyle(document.documentElement);
  const tileSize = styleVars.getPropertyValue("--tile-width");
  const gridGap = styleVars.getPropertyValue("--grid-gap");
  // console.log(gridGap);

  numberTilesWide = Math.floor(windowWidth / tileSize);
  numberTilesTall = Math.floor(windowHeight / (tileSize - gridGap));

  const totalTiles = numberTilesWide * numberTilesTall;

  const grid = document.getElementById("grid");

  // remove any buttons that already exist
  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }

  for (let i = 0; i < totalTiles; i += 1) {
    const newButton = document.createElement("button");
    newButton.classList.add('bubble');
    grid.appendChild(newButton);
  }
  
  // set css gridTemplateColumns property, eg. "1fr 1fr 1fr"
  let gridWidthColumns = "";
  for (let i = 0; i < numberTilesWide; i += 1) {
    gridWidthColumns += "1fr ";
  }
  grid.style.gridTemplateColumns = gridWidthColumns;
  // console.log(`${gridWidthColumns}`);
  // console.log(`${totalTiles}, ${tileSize}`);

  // BUBBLE CREATION
  // set duration in ms based on 1/5 of total number of bubbles
  const popDuration = Math.ceil(totalTiles / 5);
  const popDurationMs = popDuration * 1000;
  // console.log(popDuration); 
  // set css variable 
  document.documentElement.style.setProperty("--pop-duration", popDuration);
  
  const bubbles = document.getElementsByClassName("bubble");
  
  for (let i = 0, numBubbles = bubbles.length; i < numBubbles; i += 1) {
    const pairsOfRows = 2 * numberTilesWide;
    const greaterThanSecondRowFirst = i % pairsOfRows >= numberTilesWide;
    const lessThanSecondRowLast = i % pairsOfRows < pairsOfRows;
    
    // Shift bubbles on odd rows by adding shift class
    if ( greaterThanSecondRowFirst && lessThanSecondRowLast ) {
      bubbles[i].classList.add("shift-row-left");
    }
    countToDie = 0;
    bubbles[i].addEventListener('click', () => {
        countToDie+=1;
        console.log(countToDie);
        console.log(numberToDie);

        if (countToDie > numberToDie){
            scareImage()
            return false;
        }
      // check to see if bubble has not already been popped
      if (!bubbles[i].getAttribute('popped')) {
        // add data-attribute to bubble
        bubbles[i].setAttribute('popped',true);
        var audio = new Audio("./tones/" + ((i%16)+1) + '.wav');
        console.log("./tones/" + ((i%16)+1) + '.wav')
        audio.play();
        console.log(`Bubble ${i} popped!`);
        // add css class containing the animation
        bubbles[i].classList.add('pop');
        setTimeout( () => {
          // remove class & data-attribute when duration reached
          bubbles[i].classList.remove('pop');
          bubbles[i].removeAttribute(`popped`);
          console.log(`Bubble ${i} reset`);
        }, popDurationMs);
      } else {
        console.log(`Bubble ${i} already popped`);
      }
    });
  }
}

function scareImage(){
    let divtag = document.getElementById("grid");
    divtag. parentNode. removeChild(divtag);
    let divScare = document.getElementById("scare");
    divScare.setAttribute("src", `/img/1.png`);
    divScare.setAttribute("height", `${window.innerHeight}`);
    divScare.setAttribute("width", "100%");
    divScare.setAttribute("position", "absolute");
    
    for(i = 1 ; i < 10; i++){
      let timeout = setTimeout(() => {
        console.log(i);
        document.getElementById('scare').src=`./img/${i % 4 + 1}.png`;
      },1000);
    }

    function delay() {
      return new Promise(resolve => setTimeout(resolve, 2332));
    }

    async function changeImg() {
      for (i = 1 ; i < 15; i++) {
        await delay();
        document.getElementById('scare').src=`./img/${i % 6 + 1}.png`;
      }
      console.log('Done!');
    }
    changeImg();


    var audio = new Audio("./tones/nomusic.mp3");
    audio.play();
}
// Rerender's new set of bubbles when window is resized
window.addEventListener('resize', bubbleWrap);
