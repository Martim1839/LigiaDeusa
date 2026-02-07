
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
let digitandoLigia = false;

//verificar se o utilizador meteu o nome Lígia
function verificarNomeLigia (evento) {
    if (evento.key === "Enter") {
        const input = document.getElementById("nome");
        const texto = input.value.trim().toLowerCase();
        const p1 = document.getElementById("pagina1");
        const p2 = document.getElementById("pagina2");
        const pontoP1 = document.getElementById("ponto-p1");

        if (texto === "ligia"|| texto === "lígia") {
            input.disabled = true;
            const container = document.querySelector(".container-introducao");
            container.classList.remove("fade-in");
            container.classList.add("fade-out");

            void pontoP1.offsetWidth;
            pontoP1.classList.add("animarVOOADEVOLTA");

            setTimeout(() => {
                p1.style.display = "none";
                const p3 = document.getElementById("pagina3");
                p3.style.display = "block";

                const pontoLigia = document.getElementById("ponto-ligia");
                pontoLigia.classList.add("flutuar-suave");
                            // Inicia a primeira frase da conversa
                avancarMensagemLigia();
                            // Ativa o clique para o resto da conversa
                setTimeout(() => {
                    window.addEventListener("click", avancarMensagemLigia);
                }, 100);
            }, 2000);
        } else{
            p1.style.display = "none";
            p2.style.display = "block";
            const balao = p2.querySelector(".balao-texto");
            balao.classList.add("mostrar-balao");
            const mensagemElemento = document.getElementById("mensagem2");
            mensagemElemento.textContent = "Desculpa " + texto + ", mas o meu dono nunca me falou de ti.";
            // Remove o clique da p2 para não avançar mais mensagens
            p2.onclick = null;
        }
    }
}

function avancarMensagem () {
    if (digitando) return;
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
        const balao = document.querySelector(".balao-texto");
        balao.classList.remove("mostrar-balao");
        balao.style.display = "none";
                // 2. O ponto da Página 2 faz a animação de voo primeiro
        const pontoP2 = document.getElementById("ponto-p2");
        pontoP2.classList.remove("flutuar-suave"); // Para não dar conflito
        void pontoP2.offsetWidth; // Força o browser a resetar
        pontoP2.classList.add("animarVOOA");
        setTimeout(() => {
             document.getElementById("pagina2").style.display = "none";
             const p1 = document.getElementById("pagina1");
             const container = p1.querySelector(".container-introducao");
             const pontoP1 = document.getElementById("ponto-p1"); // Pegamos o ponto
             p1.style.display = "flex";
             // REMOVE a flutuação quando a pergunta aparece
             pontoP1.classList.remove("flutuar-suave");
             setTimeout(() => {
                 container.classList.add("fade-in");
                 document.getElementById("nome").focus();
             }, 50);
         }, 2000);
    }
}

const mensagensLigia = [
    "Eu sabia que eras tu!",
    "O meu dono tinha razão, és mesmo deslumbrante...",
    "Ele preparou algo especial para ti.",
    "Estás pronta?"
];

let indiceLigia = 0;

function avancarMensagemLigia() {
    if (digitandoLigia) return;

    const elementoTexto = document.getElementById("mensagemLigia");

    if (indiceLigia < mensagensLigia.length) {
        const textoCompleto = mensagensLigia[indiceLigia];
        elementoTexto.textContent = "";
        let i = 0;
        digitandoLigia = true;

        const intervalo = setInterval(() => {
            elementoTexto.textContent += textoCompleto[i];
            i++;

            if (i >= textoCompleto.length) {
                clearInterval(intervalo);
                digitandoLigia = false;
                indiceLigia++;
            }
        }, 50);
    } else {
        window.removeEventListener("click", avancarMensagemLigia);
        document.getElementById("pagina3").style.display = "none";
        document.getElementById("paginaPergunta").style.display = "block";
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
    "images/asdasd.jpg",
    "images/20251211_161246.jpg"
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

function clicarButaoCartaP2() {
    document.getElementById("paginaCarta").style.display = "none";
    const paginaVideoJogo = document.getElementById("paginaVideoJogo");
    // Mostra a página
    paginaVideoJogo.style.display = "flex";
    paginaVideoJogo.style.flexDirection = "column"; // Garante que o score e o player alinham bem
    // LIGA O JOGO AQUI!
    iniciarMinijogo();
}

let score = 0;
let jogoAtivo = false;

function iniciarMinijogo() {
    const player = document.getElementById('player');
    const scoreElement = document.getElementById('score');
    jogoAtivo = true;

    // O personagem segue o rato horizontalmente
    window.addEventListener('mousemove', (e) => {
        if (!jogoAtivo) return;
        // Centraliza o emoji no ponteiro do rato
        player.style.left = (e.clientX - 25) + 'px';
    });

    // Cria corações a cair de posições aleatórias do topo do ecrã
    const gerador = setInterval(() => {
        if (!jogoAtivo) {
            clearInterval(gerador);
            return;
        }
        criarCoracao(player, scoreElement);
    }, 600); // Cria um coração a cada 0.6 segundos
}

function criarCoracao(player, scoreElement) {
    const coracao = document.createElement('div');
    coracao.innerHTML = '❤️';
    coracao.className = 'coracao-caindo';
    coracao.style.position = 'fixed';
    coracao.style.left = Math.random() * (window.innerWidth - 40) + 'px';
    document.body.appendChild(coracao);

    let posicaoTopo = -50;
    const velocidade = 3 + Math.random() * 4; // Velocidades diferentes para parecer mais natural

    const queda = setInterval(() => {
        if (!jogoAtivo) {
            coracao.remove();
            clearInterval(queda);
            return;
        }

        posicaoTopo += velocidade;
        coracao.style.top = posicaoTopo + 'px';

        const baldeRect = document.getElementById('imagemBalde').getBoundingClientRect(); // Focamos no balde
        const cRect = coracao.getBoundingClientRect();

        if (
            cRect.bottom >= baldeRect.top &&
            cRect.right >= baldeRect.left &&
            cRect.left <= baldeRect.right &&
            cRect.top <= baldeRect.bottom
        ) {
            score++;
            scoreElement.innerHTML = `Corações: ${score}`;
            coracao.remove();
            clearInterval(queda);

            if (score === 15) {
                jogoAtivo = false;
                finalizarJogo();
            }
        }

        if (posicaoTopo > window.innerHeight) {
            coracao.remove();
            clearInterval(queda);
            if (jogoAtivo) { // Só tira pontos se o jogo ainda estiver a decorrer
                score = score - 2;
                scoreElement.innerHTML = `Corações: ${score}`; // ATUALIZAÇÃO IMEDIATA AQUI!
            }
        }
    }, 20);
}

function finalizarJogo() {
    // 1. Limpa cliques de conversas anteriores que ficaram ativos
    window.removeEventListener("click", avancarMensagem);
    window.removeEventListener("click", avancarMensagemLigia);

    // 2. Esconde o jogo 1 e limpa corações
    document.getElementById("paginaVideoJogo").style.display = "none";
    document.querySelectorAll('.coracao-caindo').forEach(c => c.remove());

    // 3. Inicia a pesca
    iniciarJogoPesca();
}

let peixes = []; // Array global para controlar os peixes

function iniciarJogoPesca() {
    presenteCapturado = false;
    const p2 = document.getElementById("paginaVideoJogo2");
    p2.style.display = "block";

    // Movimento do barco (Corrigido)
    window.addEventListener('mousemove', (e) => {
        const barco = document.getElementById('barco-container');
        if (p2.style.display === "block" && !pescando) {
            barco.style.left = (e.clientX - 75) + 'px'; // 75 é metade da largura (150/2)
        }
    });

    window.addEventListener("mousedown", lancarAnzol);
    gerarPeixes();
    animarPresente();
}

function gerarPeixes() {
    const jogo = document.getElementById("paginaVideoJogo2");

    for (let i = 0; i < 12; i++) {
        const peixe = document.createElement("div");
        peixe.innerHTML = "🐟";
        peixe.className = "peixe-obstaculo";

        // Posição: 40% a 80% da altura para ficarem na "água"
        peixe.style.top = (35 + (i * 4)) + "%";
        peixe.style.left = Math.random() * 100 + "vw";

        jogo.appendChild(peixe);
        peixes.push(peixe);
        animarPeixe(peixe);
    }
}

function animarPeixe(peixe) {
    let pos = parseFloat(peixe.style.left) || 0;
    let velocidade = 2 + Math.random() * 2;
    let direcao = Math.random() > 0.5 ? 1 : -1;

    function mover() {
        // Se o jogo acabou ou o peixe foi removido, pára a animação
        if (!document.body.contains(peixe)) return;

        pos += velocidade * direcao;

        if (pos > window.innerWidth) pos = -50;
        if (pos < -50) pos = window.innerWidth;

        peixe.style.left = pos + "px";
        peixe.style.transform = direcao === 1 ? "scaleX(-1)" : "scaleX(1)";

        requestAnimationFrame(mover);
    }
    mover();
}

let pescando = false;
let presenteCapturado = false;

function lancarAnzol() {
    if (pescando) return;
    pescando = true;

    const linha = document.getElementById("linha");
    const anzol = document.getElementById("anzol");
    const tesouro = document.getElementById("tesouro");

    linha.style.height = "65vh";

    const loopColisao = setInterval(() => {
        const anzolRect = anzol.getBoundingClientRect();

        // 1. Colisão com Peixes (Reset normal)
        document.querySelectorAll('.peixe-obstaculo').forEach(peixe => {
            if (detectarColisao(anzolRect, peixe.getBoundingClientRect())) {
                resetarCana(loopColisao);
            }
        });

        // 2. Colisão com Tesouro
        if (detectarColisao(anzolRect, tesouro.getBoundingClientRect())) {
            clearInterval(loopColisao);
            presenteCapturado = true;

            tesouro.style.transition = "none";

            // Criamos um novo loop para o presente seguir o anzol na subida
            const subirComTesouro = setInterval(() => {
                const novoAnzolRect = anzol.getBoundingClientRect();
                const linhaAltura = parseFloat(window.getComputedStyle(linha).height);

                // O presente segue a posição do anzol
                tesouro.style.top = (novoAnzolRect.top) + "px";
                tesouro.style.left = (novoAnzolRect.left) + "px";

                if (linhaAltura <= 5) {
                    clearInterval(subirComTesouro);
                    tesouro.style.display = "none";
                    irParaPaginaDanca();
                }
            }, 10);

            linha.style.height = "0px";
        }
    }, 20);

    setTimeout(() => {
        if (pescando) resetarCana(loopColisao);
    }, 1000);
}

function resetarCana(intervalo) {
    clearInterval(intervalo);
    const linha = document.getElementById("linha");
    linha.style.height = "0px";
    setTimeout(() => { pescando = false; }, 1000);
}

function detectarColisao(r1, r2) {
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

function animarPresente() {
    const tesouro = document.getElementById("tesouro");
    let pos = 50; // Começa no meio (50%)
    let direcao = 1;
    let velocidade = 0.25; // Velocidade do presente na areia

    function mover() {
        // Se mudares de página, para a animação
        if (presenteCapturado || document.getElementById("paginaVideoJogo2").style.display !== "block") return;

        pos += velocidade * direcao;

        if (pos >= 95 || pos <= 5) {
            direcao *= -1;
        }

        tesouro.style.left = pos + "%";
        requestAnimationFrame(mover);
    }
    mover();
}

function pularParaPesca() {
    // Esconde o menu e qualquer outra página aberta
    document.getElementById("menuInicial").style.display = "none";
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "none";
    document.getElementById("paginaPergunta").style.display = "none";
    document.getElementById("paginaSim").style.display = "none";
    document.getElementById("paginaCarta").style.display = "none";
    document.getElementById("paginaVideoJogo").style.display = "none";

    iniciarJogoPesca();
}

function irParaPaginaDanca() {
    document.getElementById("paginaVideoJogo2").style.display = "none";
    const paginaDanca = document.getElementById("paginaVideoJogoDanca");
    paginaDanca.style.display = "flex";
}