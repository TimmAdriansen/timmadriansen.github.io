function onHoverImage(x) {
    let image = x.querySelector(".image");
    let div = x.querySelector(".centered");
    image.style.opacity = "0.7";
    image.style.filter = "grayscale(100%)";
    showTextHover(div);
}

function onHoverImageLeave(x) {
    let image = x.querySelector(".image");
    let div = x.querySelector(".centered");
    image.style.opacity = "1";
    image.style.filter = "grayscale(0%)";
    hideTextHover(div);
}

function showTextHover(div){
    div.style.opacity = "1";
}

function hideTextHover(div){
    div.style.opacity = "0";
}