let jogador = document.getElementById("jogador");
let posX = window.innerWidth / 2;
let velocidade = 15;

/* PC - TECLADO */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mover(-velocidade);
    if (e.key === "ArrowRight") mover(velocidade);
});

/* MOBILE - TOQUE */
document.getElementById("esq").addEventListener("touchstart", () => mover(-velocidade));
document.getElementById("dir").addEventListener("touchstart", () => mover(velocidade));

function mover(valor) {
    posX += valor;

    if (posX < 0) posX = 0;
    if (posX > window.innerWidth - 40) posX = window.innerWidth - 40;

    jogador.style.left = posX + "px";
}

