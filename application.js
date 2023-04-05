const track = document.getElementById("image-track");
var currentScreen = "";

const handleOnDown = e => {if(currentScreen != "projects") return; track.dataset.mouseDownAt = e.clientX;}

const handleOnUp = () => {
  if(currentScreen != "projects") return;
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage+50}%, 25%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

document.querySelector('.container').addEventListener('scroll', function(){
  var top = this.scrollTop;
  var bottom = top+this.offsetHeight;
  var arr = [];
  
  this.querySelectorAll("section").forEach(function(div){
    if (
      (div.offsetTop < top && top <div.offsetTop+div.offsetHeight) ||
      (div.offsetTop < bottom && bottom <div.offsetTop+div.offsetHeight)
    ){
      arr.push(div.id);
    }
  });
  if(arr.length == 1){
    currentScreen = arr[0];
  }
});


function onScroll(){
  track.dataset.percentage = 0;
  track.animate({
    transform: `translate(${0+50}%, 25%)`
  }, { duration: 1200, fill: "forwards" });
}

function setCurrentScreen(x){
  currentScreen = x;
}




/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
