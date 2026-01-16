let game = document.getElementById("game");
let jogador = document.getElementById("jogador");
let pontos = 0;
let vidas = 3;

let pontosTexto = document.getElementById("pontos");
let vidasTexto = document.getElementById("vidas");

let posX = 180;
let gameOver = false;

// Movimento do jogador
document.addEventListener("keydown", function(e) {
    if (gameOver) return;

    if (e.key === "a") posX -= 20;
    if (e.key === "d") posX += 20;

    if (posX < 0) posX = 0;
    if (posX > 360) posX = 360;

    jogador.style.left = posX + "px";

    if (e.key === " ") {
        atirar();
    }
});

function atirar() {
    if (gameOver) return;

    let tiro = document.createElement("div");
    tiro.classList.add("tiro");
    game.appendChild(tiro);

    let tiroX = posX + 18;
    let tiroY = 450;

    tiro.style.left = tiroX + "px";
    tiro.style.top = tiroY + "px";

    let intervalo = setInterval(() => {
        tiroY -= 10;
        tiro.style.top = tiroY + "px";

        let inimigos = document.querySelectorAll(".inimigo");

        inimigos.forEach((inimigo) => {
            let tiroRect = tiro.getBoundingClientRect();
            let inimigoRect = inimigo.getBoundingClientRect();

            if (
                tiroRect.left < inimigoRect.right &&
                tiroRect.right > inimigoRect.left &&
                tiroRect.top < inimigoRect.bottom &&
                tiroRect.bottom > inimigoRect.top
            ) {
                inimigo.remove();
                tiro.remove();
                clearInterval(intervalo);

                pontos++;
                pontosTexto.innerText = pontos;
            }
        });

        if (tiroY < 0) {
            tiro.remove();
            clearInterval(intervalo);
        }
    }, 30);
}

// Criar inimigos
function criarInimigo() {
    if (gameOver) return;

    let inimigo = document.createElement("div");
    inimigo.classList.add("inimigo");
    game.appendChild(inimigo);

    inimigo.style.left = Math.random() * 360 + "px";
    inimigo.style.top = "0px";

    let y = 0;

    let queda = setInterval(() => {
        if (gameOver) {
            inimigo.remove();
            clearInterval(queda);
            return;
        }

        y += 3;
        inimigo.style.top = y + "px";

        // Se encostar no jogador
        let inimigoRect = inimigo.getBoundingClientRect();
        let jogadorRect = jogador.getBoundingClientRect();

        if (
            inimigoRect.left < jogadorRect.right &&
            inimigoRect.right > jogadorRect.left &&
            inimigoRect.top < jogadorRect.bottom &&
            inimigoRect.bottom > jogadorRect.top
        ) {
            inimigo.remove();
            clearInterval(queda);

            vidas--;
            vidasTexto.innerText = vidas;

            if (vidas <= 0) {
                fimDeJogo();
            }
        }

        // Se cair fora da tela
        if (y > 500) {
            inimigo.remove();
            clearInterval(queda);
        }

    }, 30);
}

function fimDeJogo() {
    gameOver = true;
    alert("GAME OVER!\nPontuação: " + pontos);
}

setInterval(criarInimigo, 1000);
// CONTROLES PARA CELULAR
let btnEsq = document.getElementById("esq");
let btnDir = document.getElementById("dir");
let btnTiro = document.getElementById("tiro");

btnEsq.addEventListener("touchstart", () => {
    posX -= 20;
    if (posX < 0) posX = 0;
    jogador.style.left = posX + "px";
});

btnDir.addEventListener("touchstart", () => {
    posX += 20;
    if (posX > 360) posX = 360;
    jogador.style.left = posX + "px";
});

btnTiro.addEventListener("touchstart", () => {
    atirar();
});


