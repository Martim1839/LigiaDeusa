
function iniciarJogo() {
    const transitionContainer = document.getElementById("pixel-transition");
    const menu = document.getElementById("menuInicial");
    const loader = document.getElementById("loader");
    const barra = document.getElementById("progresso-barra"); // Garante que este ID existe no HTML
    const p2 = document.getElementById("pagina2");

    // --- TRANSIÇÃO 1: MENU PARA LOADER ---
    transitionContainer.innerHTML = '';
    const colunas = 10;
    const linhas = Math.ceil(window.innerHeight / (window.innerWidth / colunas));
    const totalBlocks = colunas * linhas;

    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.className = "pixel-block";
        block.style.width = `10vw`;
        block.style.height = `10vw`;
        transitionContainer.appendChild(block);
    }

    const blocks = document.querySelectorAll(".pixel-block");

    // Pixels aparecem (Tapa o Menu)
    blocks.forEach((block) => {
        setTimeout(() => { block.style.opacity = "1"; }, Math.random() * 600);
    });

    setTimeout(() => {
        menu.style.display = "none";
        loader.style.display = "flex";
        loader.style.opacity = "1";

        // Pixels desaparecem (Revela o Loader)
        blocks.forEach((block) => {
           setTimeout(() => { block.style.opacity = "0"; }, Math.random() * 600 + 200);
        });

        // Inicia a barra de progresso
        setTimeout(() => { if(barra) barra.style.height = "100%"; }, 100);

        // --- TRANSIÇÃO 2: LOADER PARA PÁGINA 2 ---
        setTimeout(() => {
            // Recriar/Resetar pixels para tapar o loader
            newBlocksAnimation(transitionContainer, colunas, totalBlocks, () => {
                // Esta função corre quando o ecrã está todo preto:
                loader.style.display = "none";
                p2.style.display = "block";

                const pontoP2 = p2.querySelector(".ponto-espiritual");
                const caixaTexto = p2.querySelector(".balao-texto");
                pontoP2.classList.add("animar-voo-p2");

                // Final: Ponto voa e as mensagens começam
                setTimeout(() => {
                    pontoP2.classList.remove("animar-voo-p2");
                    pontoP2.classList.add("flutuar-suave");
                    caixaTexto.classList.add("flutuar-suave");
                    caixaTexto.classList.add("mostrar-balao");
                    avancarMensagem();
                    setTimeout(() => {
                        window.addEventListener("click", avancarMensagem);
                    }, 100);

                    // LIMPEZA FINAL: Remove os quadrados para não estorvar
                    transitionContainer.innerHTML = '';
                }, 8000);
            });
        }, 5000); // Tempo do Loader
    }, 800);
}

// Função auxiliar para evitar repetir código de criação de blocos
function newBlocksAnimation(container, colunas, total, callbackMid) {
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const block = document.createElement("div");
        block.className = "pixel-block";
        block.style.width = `10vw`; block.style.height = `10vw`;
        container.appendChild(block);
    }
    const blocks = container.querySelectorAll(".pixel-block");

    // Aparecem
    blocks.forEach(b => setTimeout(() => b.style.opacity = "1", Math.random() * 400));

    // Troca o conteúdo a meio
    setTimeout(() => {
        callbackMid();
        // Desaparecem
        blocks.forEach(b => setTimeout(() => b.style.opacity = "0", Math.random() * 400 + 200));
    }, 600);
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

            const pontoLigia = document.getElementById("ponto-ligia");
            const balaoLugia = document.getElementById("balaoLigia");

            // 1. Esconde o balão da P3 imediatamente antes de o ponto sair
            if(balaoLugia) balaoLugia.style.display = "none";

            // 2. O ponto faz a animação de saída
            pontoLigia.classList.remove("flutuar-suave");
            void pontoLigia.offsetWidth;
            pontoLigia.classList.add("animar-saida-ponto");

            // --- ESTE É O SETTIMEOUT ONDE DEVES COLOCAR O CÓDIGO ---
            setTimeout(() => {
                // Esconde a página antiga e mostra a nova
                document.getElementById("pagina3").style.display = "none";
                const pagSim = document.getElementById("paginaSim");
                pagSim.style.display = "block";

                // AQUI: Forçar as fotos a aparecerem mal a página Sim abre
                atualizarVisualCarrossel();

                // Preparar o ponto novo para a animação de entrada
                const pontoNovo = pagSim.querySelector(".ponto-espiritual");
                const balaoFotos = document.getElementById("balao-comentario-id");

                if (balaoFotos) {
                    balaoFotos.style.display = "none";
                    balaoFotos.style.opacity = "0";
                }

                // Reset técnico para o browser reconhecer a nova animação
                pontoNovo.classList.remove("animar-chegada-ponto", "flutuar-suave");
                void pontoNovo.offsetWidth;

                // Iniciar animação de entrada do ponto nas fotos
                pontoNovo.classList.add("animar-chegada-ponto");

                // Esperar o ponto chegar (3s) para mostrar o balão de comentário
                setTimeout(() => {
                    pontoNovo.classList.remove("animar-chegada-ponto");
                    pontoNovo.classList.add("flutuar-suave");

                    if (balaoFotos) {
                        balaoFotos.style.display = "block";
                        setTimeout(() => {
                            balaoFotos.style.opacity = "1";
                            atualizarComentario(); // Escreve o texto da foto
                        }, 50);
                    }
                }, 3000);
            }, 2000); // Tempo que o ponto demora a sair da P3
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
    dispararConfetis();
    atualizarVisualCarrossel();
}

function dispararConfetis() {
    // Configuração de um disparo lateral (estilo canhão)
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // Dispara de dois pontos diferentes
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

const listaFotos = [
    "images/IMG-20250921-WA0030.jpg", "images/IMG-20251005-WA0006.jpg",
    "images/IMG-20251101-WA0008.jpg", "images/IMG_20251010_235107_172.jpg",
    "images/IMG_20260105_231718_265.jpg", "images/IMG_20251107_200129_414.jpg",
    "images/IMG-20250921-WA0005.jpg", "images/20251229_200000.jpg",
    "images/2ad72b06735cbc74a7f1015697b57127.jpg", "images/asdasd.jpg",
    "images/20251211_161246.jpg", "images/IMG-20250921-WA0004.jpg",
    "images/IMG-20250921-WA0028.jpg", "images/IMG-20251005-WA0008.jpg", "images/IMG-20251101-WA0029.jpg",
    "images/IMG-20251109-WA0018.jpg", "images/IMG-20251101-WA0031.jpg",
    "images/IMG_20251109_193223_611.jpg", "images/IMG_20260115_214513_204.jpg"
];

const comentariosFotos = [
    "Aqui estavas radiante! 😍",           // Foto 0
    "Este dia foi inesquecível...",       // Foto 1
    "Olha só esse sorriso! ✨",            // Foto 2
    "O meu dono adora esta foto.",        // Foto 3
    "Ficam tão bem juntos! ♥",            // Foto 4
];

let fotoAtual = 0;

function mudarFoto(direcao) {
    fotoAtual += direcao;

    if (fotoAtual >= listaFotos.length) {
        fotoAtual = 0;
    }
    if (fotoAtual < 0) {
        fotoAtual = listaFotos.length - 1;
    }
    atualizarVisualCarrossel();
    atualizarComentario();
}

function atualizarVisualCarrossel() {
    const imgMeio = document.querySelector("#foto-meio img");
    const imgEsq = document.querySelector("#foto-esq img");
    const imgDir = document.querySelector("#foto-dir img");

    // Verificação de segurança: se as imagens não existirem no DOM, para aqui
    if (!imgMeio || !imgEsq || !imgDir) return;

    // Calcular índices vizinhos
    let indiceEsq = fotoAtual - 1;
    if (indiceEsq < 0) indiceEsq = listaFotos.length - 1;

    let indiceDir = fotoAtual + 1;
    if (indiceDir >= listaFotos.length) indiceDir = 0;

    // Aplicar os caminhos das imagens
    imgMeio.src = listaFotos[fotoAtual];
    imgEsq.src = listaFotos[indiceEsq];
    imgDir.src = listaFotos[indiceDir];

    // Log para debugging (podes ver na consola F12 se o caminho está certo)
    console.log("A carregar foto atual:", listaFotos[fotoAtual]);
}

let intervaloComentario = null;

function atualizarComentario() {
    const elementoTexto = document.getElementById("texto-comentario");
    const textoCompleto = comentariosFotos[fotoAtual] || "Que memória incrível! ♥";

    if (intervaloComentario) {
        clearInterval(intervaloComentario);
    }

    elementoTexto.textContent = "";
    let i = 0;

    intervaloComentario = setInterval(() => {
        elementoTexto.textContent += textoCompleto[i];
        i++;

        if (i >= textoCompleto.length) {
            clearInterval(intervaloComentario);
            intervaloComentario = null;
        }
    }, 40);
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
    iniciarMinijogo();
}

let score = 0;
let jogoAtivo = false;

function irParaMenuJogos() {
    const menu = document.getElementById("menuInicial");
    const paginaJogos = document.getElementById("paginaMenuJogos");

    // Esconde o menu inicial
    if (menu) menu.style.display = "none";

    // Mostra a página dos botões de jogos
    if (paginaJogos) {
        paginaJogos.style.display = "flex";
        // Garante que o scroll volta ao topo
        window.scrollTo(0, 0);
    }
}

function irParaJogo(numero) {
    document.getElementById("paginaMenuJogos").style.display = "none";

    if (numero === 1) {
        document.getElementById("paginaVideoJogo").style.display = "flex";
        iniciarMinijogo(); // Teu jogo dos corações
    } else if (numero === 2) {
        iniciarJogoPesca(); // Teu jogo da pesca
    } else if (numero === 3) {
        document.getElementById('paginaLoveClicker').style.display = "flex";
        configurarCliquesCoracao();
    }
}

function ganharJogo(numero) {
    // Esta função deve ser chamada quando o score atingir o limite ou o tempo acabar

    let presenteOriginal = "";
    if(numero === 1) presenteOriginal = "um Jantar Romântico! 🍝";
    if(numero === 2) presenteOriginal = "aquela Camisola que querias! 👕";
    if(numero === 3) presenteOriginal = "uma Viagem surpresa! ✈️";

    // Efeito de vitória
    alert("PARABÉNS! ✨\nDesbloqueaste o Presente #" + numero + ":\n" + presenteOriginal);

    // Volta ao menu para ela escolher o próximo
    irParaMenuJogos();
}

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

        const margemErro = 15;
        if (
            cRect.bottom >= baldeRect.top &&
            cRect.right >= baldeRect.left + 30 &&
            cRect.left <= baldeRect.right + 10 &&
            cRect.top <= baldeRect.bottom - 10
        ) {
            score++;
            scoreElement.innerHTML = `Corações: ${score}`;
            coracao.remove();
            clearInterval(queda);

            if (score === 20) {
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
        if (tesouro && detectarColisao(anzolRect, tesouro.getBoundingClientRect())) {
            clearInterval(loopColisao);
            presenteCapturado = true;

            tesouro.style.transition = "none";

            // Loop para o presente subir "colado" ao anzol
            const subirComTesouro = setInterval(() => {
                const novoAnzolRect = anzol.getBoundingClientRect();
                const linhaAltura = parseFloat(window.getComputedStyle(linha).height);

                // Faz o presente seguir o anzol
                tesouro.style.top = (novoAnzolRect.top) + "px";
                tesouro.style.left = (novoAnzolRect.left) + "px";

                // Quando a linha chega quase ao topo (5px)
                if (linhaAltura <= 5) {
                    clearInterval(subirComTesouro);
                    tesouro.style.display = "none"; // Remove o tesouro do mar

                    // IMPORTANTE: Adicionados os parênteses para executar a função!
                    ganharJogoPesca();
                }
            }, 10);

            linha.style.height = "0px";
        }
    }, 20);

    // Timeout de segurança caso não pesque nada
    setTimeout(() => {
        if (pescando && !presenteCapturado) {
            resetarCana(loopColisao);
        }
    }, 1200); // Um pouco mais que o tempo da transição CSS
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

function ganharJogoPesca() {
    const containerPesca = document.querySelector('.container-pesca');
    containerPesca.style.transition = "opacity 1s";
    containerPesca.style.opacity = "0";

    setTimeout(() => {
        containerPesca.style.display = "none";

        const clicker = document.getElementById('paginaLoveClicker');
        clicker.style.display = "flex";
        clicker.style.opacity = "0";

        // --- ATIVA OS CLIQUES AQUI ---
        configurarCliquesCoracao();

        setTimeout(() => {
            clicker.style.transition = "opacity 1s";
            clicker.style.opacity = "1";
        }, 50);
    }, 1000);
}

// --- 1. VARIÁVEIS DE CONTROLO ---
let clickScore = 0;
let clickTimeLeft = 10;
let clickGameActive = false;
let clickTimerId;

// --- 2. NOVA FUNÇÃO PARA CONFIGURAR OS CLIQUES ---
// Chamamos isto apenas uma vez para garantir que o contador funciona
function configurarCliquesCoracao() {
    const clickHeartBtn = document.getElementById('heart-btn');
    const clickScoreEl = document.getElementById('score-clicker');

    if (clickHeartBtn && !clickHeartBtn.dataset.configurado) {

        clickHeartBtn.addEventListener('pointerdown', (e) => {
            if (!clickGameActive) return;

            // Bloqueia TUDO o que o browser queira fazer (menu, seleção, etc)
            e.preventDefault();
            e.stopPropagation();

            clickScore++;
            clickScoreEl.innerText = clickScore;

            // Efeito visual
            const heart = document.createElement('span');
            heart.innerText = '💖';
            heart.className = 'floating-heart';
            heart.style.left = e.pageX + 'px';
            heart.style.top = e.pageY + 'px';
            heart.style.position = 'absolute';
            heart.style.zIndex = '10000';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 800);
        });

        clickHeartBtn.dataset.configurado = "true";
    }
}

function iniciarContagemClicker() {
    clickScore = 0;
    clickTimeLeft = 10;
    clickGameActive = true;

    document.getElementById('score-clicker').innerText = "0";
    document.getElementById('timer').innerText = "10";
    document.getElementById('message-clicker').innerText = "DÁ-LHE!";
    document.getElementById('start-clicker-btn').style.visibility = 'hidden';

    clearInterval(clickTimerId);
    clickTimerId = setInterval(() => {
        clickTimeLeft--;
        document.getElementById('timer').innerText = clickTimeLeft;
        if (clickTimeLeft <= 0) endClickGame();
    }, 1000);
}

// Atualiza a função de fim de jogo para mostrar o botão novamente
function endClickGame() {
    clearInterval(clickTimerId);
    clickGameActive = false;

    const clickStartBtn = document.getElementById('start-clicker-btn');
    const clickMessageEl = document.getElementById('message-clicker');

    if(clickStartBtn) {
        clickStartBtn.style.visibility = 'visible';
        clickStartBtn.innerText = "Tentar de novo?";
    }

    if (clickMessageEl) {
        if (clickScore > 50) {
            clickMessageEl.innerText = `INCRÍVEL! ${clickScore} cliques! ❤️`;
        } else {
            clickMessageEl.innerText = `Fim! Fizeste ${clickScore} cliques!`;
        }
    }
}

// Bloqueio Global do Menu de Contexto (Botão Direito) em toda a página
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloqueio extra para garantir que cliques do meio/direito não ativem nada nativo
document.addEventListener('auxclick', event => event.preventDefault());