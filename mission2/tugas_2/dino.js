const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const pointDino = document.getElementById("point");

let point = 0;
let selang = null;

let jumlahPoint = () => {
    point++;
    pointDino.innerHTML = `Point: ${point}`
};

function loncat() {
    if (dino.classList != "animasi"){
        dino.classList.add("animasi");
    } 
    setTimeout(function(){
        dino.classList.remove("animasi")
    }, 400)

    selang = setInterval(jumlahPoint, 300)
}

const nabrakKaktus = setInterval(function(){
    const dinoLoncat = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
    const kaktusNgalangin = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
    if(kaktusNgalangin < 90 && kaktusNgalangin > 0 && dinoLoncat >= 100){
        cactus.style.animation = "none"
        cactus.style.display = "none"
        if(confirm("Kamu nabrak!! mau ulang?")){
            window.location.reload()
        }
    }
})
