const pokedex = document.getElementById("pokedex");
const pohon = document.getElementById("pohon");
const pointPokedex = document.getElementById("point");

let point = 0;
let selang = null;

let jumlahPoint = () => {
    point++;
    pointPokedex.innerHTML = `Point: ${point}`
};

function loncat() {
    if (pokedex.classList != "animasi"){
        pokedex.classList.add("animasi");
    } 
    setTimeout(function(){
        pokedex.classList.remove("animasi")
    }, 400)

    selang = setInterval(jumlahPoint, 300)
}

const nabrakPohon = setInterval(function(){
    const pokedexLoncat = parseInt(window.getComputedStyle(pokedex).getPropertyValue("top"))
    const pohonNgalangin = parseInt(window.getComputedStyle(pohon).getPropertyValue("left"))
    if(pohonNgalangin < 60 && pohonNgalangin > 0 && pokedexLoncat >= 100){
        pohon.style.animation = "none"
        pohon.style.display = "none"
        if(confirm("Kamu nabrak!! mau ulang?")){
            window.location.reload()
        }
    }
})
