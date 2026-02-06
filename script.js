
function iniciarJogo() {
    // Esconde o menu com uma transição simples
    const menu = document.getElementById("menuInicial");
    const loader = document.getElementById("loader")
    const barra = document.getElementById("progresso-barra")
    const p1 = document.getElementById("pagina1");
    const p2 = document.getElementById("pagina2");

    menu.classList.add("fade-out");

    setTimeout(() => {
        menu.style.display = "none";
        loader.style.display = "flex";
        setTimeout(() => {
            loader.style.opacity = "1";
        }, 50);

        barra.style.height  = "0%";

        setTimeout(() => {
            barra.style.height = "100%";
        }, 50);

        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                p2.style.display = "block";
                const pontoP2 = p2.querySelector(".ponto-espiritual");
                const caixaTexto = p2.querySelector(".balao-texto");
                pontoP2.classList.add("animar-voo-p2");
                setTimeout(() => {
                    pontoP2.classList.remove("animar-voo-p2");
                    pontoP2.classList.add("flutuar-suave");
                    caixaTexto.classList.add("flutuar-suave");
                    caixaTexto.classList.add("mostrar-balao");
                    avancarMensagem();
                    setTimeout(() => {
                        window.addEventListener("click", avancarMensagem);
                    }, 100);
                }, 8000);
            }, 1000);
        }, 5000);
    }, 1000);
}



const mensagens = [
     "Heeeeey, está alguém aí?!",
     "Estou a procura de uma pessoa, não sei se me podes ajudar...",
     "O meu dono falou-me de uma rapariga belíssima",
     "Parece que já a encontrei",
     "Mas para verificar que és mesmo ela, preciso perguntar pelo teu nome?"
];

let indiceMensagem = 0;
let digitando = false;

//verificar se o utilizador meteu o nome Lígia
function verificarNomeLigia (evento) {
    if (evento.key === "Enter") {
        const texto = document.getElementById("nome").value;
        const p1 = document.getElementById("pagina1");
        const p2 = document.getElementById("pagina2");
        const pPergunta = document.getElementById("paginaPergunta");

        if (texto.toLowerCase() === "ligia") {
            p1.style.display = "none";
            pPergunta.style.display = "block";
        } else{
            p1.style.display = "none";
            p2.style.display = "block";
            const mensagemElemento = document.getElementById("mensagem2");
            mensagemElemento.textContent = "Desculpa " + texto + ", mas o meu dono nunca me falou de ti.";
            // Remove o clique da p2 para não avançar mais mensagens
            p2.onclick = null;
        }
    }
}


function avancarMensagem () {
    if (digitando) return;
    const p1 = document.getElementById("pagina1");
    const p2 = document.getElementById("pagina2");
    const elementoTexto = document.getElementById("mensagem2");

    if (indiceMensagem < mensagens.length) {
        const textoCompleto = mensagens[indiceMensagem];
        elementoTexto.textContent = "";
        let i = 0;
        digitando = true;

        // Efeito de escrever da esquerda para a direita
        const intervalo = setInterval(() => {
            elementoTexto.textContent += textoCompleto[i];
            i++;

            if (i >= textoCompleto.length) {
                clearInterval(intervalo);
                digitando = false; // Liberta o clique para a próxima mensagem
                indiceMensagem++;
            }
        }, 50); // Velocidade: 50ms por letra
    }else {
        window.removeEventListener("click", avancarMensagem);
        p2.style.display = "none";
        p1.style.display = "block";
        setTimeout(() => {
            document.getElementById("nome").focus();
        }, 100);
    }
}

const mensagensNo = [
    "Tens a certeza?",
    "Mesmo mesmo?",
    "Estás convicta?",
    "Mas eu amo-te muito...",
    "Crominhaaa, porfavor...",
    "Apenas pensa melhor!",
    "Olha que eu fico triste 😢",
    "FICO MUITO MUITO TRISTE!",
    "DIZ SÓ QUE SIM, POR MIM QUERIDA...",
    "PORFAVOR QUERIDA EU FAÇO QUALQUER COISA POR TI..."
];

let indiceNao = 0;

function clicarButaoNao() {
    const noButton = document.querySelector(".butaoNao");
    const yesButton = document.querySelector(".butaoSim");

    // mudar o texto do botão No
    noButton.textContent = mensagensNo[indiceNao];
    if (indiceMensagem < mensagensNo.length) {
        indiceNao++;
    }

    // aumentar o tamanho do botão Yes
    const tamanhoAtual = parseFloat(
        window.getComputedStyle(yesButton).fontSize
    );

    yesButton.style.fontSize = (tamanhoAtual * 1.4) + "px";
}

function clicarButaoSim() {
    document.getElementById("paginaPergunta").style.display = "none";
    document.getElementById("paginaSim").style.display = "block";
}

const listaFotos = [
    "images/IMG-20250921-WA0030.jpg",
    "images/IMG-20251005-WA0006.jpg",
    "images/IMG-20251101-WA0008.jpg",
    "images/IMG_20251010_235107_172.jpg",
    "images/IMG_20260105_231718_265.jpg",
    "images/IMG_20251107_200129_414.jpg",
    "images/IMG-20250921-WA0005.jpg",
    "images/20251229_200000.jpg",
    "images/2ad72b06735cbc74a7f1015697b57127.jpg",
    "images/asdasd.jpg"
];

let fotoAtual = 0;

function mudarFoto(direcao) {
    const imgElemento = document.getElementById("fotoPolaroid");
    if (!imgElemento) {
        console.error("Não encontrei a imagem seu burro");
        return;
    }
    fotoAtual += direcao;

    if (fotoAtual >= listaFotos.length) {
        fotoAtual = 0;
    }
    if (fotoAtual < 0) {
        fotoAtual = listaFotos.length - 1;
    }

    imgElemento.src = listaFotos[fotoAtual];
}

function clicarButaoCarta() {
    document.getElementById("paginaSim").style.display = "none";
    const paginaCarta = document.getElementById("paginaCarta");
    paginaCarta.style.display = "flex";
    window.scrollTo(0, 0);
    setTimeout(abrirEnvelope, 800);
}

function abrirEnvelope() {
    const envelope = document.querySelector('.envelope-grande');
    if (envelope) {
        envelope.classList.add('open');
    }
}

