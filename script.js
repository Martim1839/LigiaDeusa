let premiosGanhos = []; // <--- ADICIONA ESTA LINHA NO TOPO DO SCRIPT

const somPonto = new Audio('sounds/PontoFlutuanteFala.mp3');
somPonto.volume = 0.4;

let intervaloMenuJogos = null;

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
     "Heeeeey, nem reparei que estavas aí!",
     "Sabes, é que eu tenho andado com a cabeça cheia...",
     "Esta missão que o meu dono deu-me não me sai da cabeça",
     "Aiiii, mas que falta de educação a minha",
     "Ainda nem me apresentei",
     "Eu sou o BIP, o animal espiritual do meu dono: Martim Andrade de Sá",
     "E tu, como te chamas?"
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

            if (textoCompleto[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.1;
                somCurto.play().catch(e => {});
            }

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
    "Lígia?!",
    "Era mesmo de ti que eu estava á procura",
    "És mesmo deslumbrante, tal como o meu dono tinha descrito...",
    "Ele falou-me MUITO de ti e dos momentos que vocês passaram juntos",
    "4 meses já não é nenhuma brincadeira",
    "Vamos relembrar em conjunto algumas dessas memórias"
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

            if (textoCompleto[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.1;
                somCurto.play().catch(e => {});
            }

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
    "PORFAVOR QUERIDA EU FAÇO QUALQUER COISA POR TI...",
    "PLS AMOR"
];

let indiceNao = 0;

let deslocamentoTitulo = 0; // Variável para controlar a subida do título

function clicarButaoNao() {
    const noButton = document.querySelector(".butaoNao");
    const yesButton = document.querySelector(".butaoSim");
    const titulo = document.getElementById("mensagem3");

    // 1. Mudar o texto do botão No
    noButton.textContent = mensagensNo[indiceNao];
    if (indiceNao < mensagensNo.length - 1) {
        indiceNao++;
    }

    // 2. Aumentar o tamanho do botão Yes
    const tamanhoAtual = parseFloat(window.getComputedStyle(yesButton).fontSize);
    const novoTamanho = tamanhoAtual * 1.4;
    yesButton.style.fontSize = novoTamanho + "px";

    // 3. MOVER O TÍTULO PARA CIMA
    // À medida que o botão cresce, empurramos o título proporcionalmente
    deslocamentoTitulo -= 3.7;
    titulo.style.transform = `translateY(${deslocamentoTitulo}px)`;
    titulo.style.transition = "transform 0.3s ease-out";
}

function clicarButaoSim() {
    document.getElementById("paginaPergunta").style.display = "none";
    dispararConfetis();
    const paginaDespedida = document.getElementById("paginaDespedida");
    if (paginaDespedida) {
        paginaDespedida.style.display = "flex";
    } else {
        console.log("Página de despedida não encontrada. A criar fluxo...");
    }
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
    "images/1000046671.jpg", "images/1000046672.jpg",
    "images/1000046673.jpg", "images/1000046674.jpg",
    "images/1000046675.jpg", "images/1000046676.jpg", "images/1000046677.jpg",
    "images/IMG-20250921-WA0030.jpg", "images/IMG-20251005-WA0006.jpg",
    "images/IMG-20251101-WA0008.jpg", "images/IMG_20251010_235107_172.jpg",
    "images/IMG_20260105_231718_265.jpg", "images/IMG_20251107_200129_414.jpg",
    "images/IMG-20250921-WA0005.jpg", "images/20251229_200000.jpg",
    "images/2ad72b06735cbc74a7f1015697b57127.jpg", "images/asdasd.jpg",
    "images/20251211_161246.jpg", "images/IMG-20250921-WA0004.jpg",
    "images/IMG-20250921-WA0028.jpg", "images/IMG-20251005-WA0008.jpg", "images/IMG-20251101-WA0029.jpg",
    "images/IMG-20251109-WA0018.jpg",
    "images/IMG_20251109_193223_611.jpg", "images/IMG_20260115_214513_204.jpg"
];

const comentariosFotos = [
    "Vocês já pintaram uma caneca juntos",
    "Compraram pulseiras a combinar",
    "Já foram jantar sushi juntos (mais que uma vez)",
    "Experimentaram bebidas do Starbucks juntos",
    "E deste dia, lembraste?!",
    "Já fizeram vasos de flores e versões de vocês em plasticina",
    "Fizeram abóboras personalizadas",
    "Passaram muito tempo na praia durante o verão",
    "Esta foto foi num dia super especial...",
    "Foram disfarçados a combinar no Halloween",
    "Ficam tão bem juntos! ♥",
    "O meu dono adora esta foto",
    "Ele disse-me que adorava descansar contigo",
    "122 dias juntos",
    "Hahahhaa que foto fofinha",
    "Foram dadas muitas rosas",
    "Vocês foram feitos um para o outro",
    "Que flores bonitas",
    "O Andrade disse que ama sair contigo",
    "Ouvi falar também imenso sobre os teus beijinhos",
    "Que anel LINDOOOOOOOOO",
    "Ficas tão bem com essas flores",
    "Incrível como ficas bem em todas as fotos",
    "Sweattt bonitaaaaaaaa <3",
    "Acho que o teu dono precisa de um beijinho agora"
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

        if (textoCompleto[i] !== " " && i % 3 === 0) {
            const somCurto = somPonto.cloneNode(true);
            somCurto.volume = 0.05; // Mais baixinho nas fotos para ser subtil
            somCurto.play().catch(e => {});
        }

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

function iniciarTransicaoCarta() {
    const paginaSim = document.getElementById("paginaSim");
    const paginaTransicao = document.getElementById("paginaTransicaoCarta");

    if (paginaSim) paginaSim.style.display = "none";

    if (paginaTransicao) {
        paginaTransicao.style.display = "flex";
        paginaTransicao.classList.remove("animar-pagina-fade");
        void paginaTransicao.offsetWidth; // Truque para reiniciar a animação
        paginaTransicao.classList.add("animar-pagina-fade");
    }

    const textoElemento = document.getElementById("texto-transicao");
    const balao = document.getElementById("balao-transicao");
    const containerPonto = document.getElementById("container-envelope-ponto");
    const envelope = document.getElementById("envelope-rosa-container");
    const mensagem = "Mas prontos, estou a desenvolver demais, o meu dono tinha-me pedido para te entregar isto, vou te deixar ler sozinha";

    // O resto do teu código continua igual...
    textoElemento.textContent = "";
    balao.style.display = "block";
    balao.classList.add("mostrar-balao");

    envelope.style.display = "none";
    containerPonto.classList.remove("entrega-finalizada");
    containerPonto.classList.add("flutuar-suave");

    let i = 0;
    if (window.intervaloTransicao) clearInterval(window.intervaloTransicao);

    window.intervaloTransicao = setInterval(() => {
        if (i < mensagem.length) {
            textoElemento.textContent += mensagem[i];

            if (mensagem[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.05;
                somCurto.play().catch(e=>{});
            }
            i++;
        } else {
            clearInterval(window.intervaloTransicao);

            // Texto terminou, aparece o envelope pequeno
            envelope.style.display = "block";

            // Espera o clique para "mergulhar"
            setTimeout(() => {
                window.addEventListener('click', function tratarQueda() {
                    window.removeEventListener('click', tratarQueda);

                    // --- O QUE MUDA AQUI ---
                    // Removemos o balão IMEDIATAMENTE antes da animação
                    balao.classList.remove("mostrar-balao");
                    balao.style.display = "none";

                    // Inicia o mergulho do Ponto com a carta
                    containerPonto.classList.remove("flutuar-suave");
                    containerPonto.classList.add("entrega-finalizada");

                    setTimeout(() => {
                        paginaTransicao.style.display = "none";
                        abrirCartaReal();
                    }, 2000);
                }, { once: true });
            }, 500); // Pausa de meio segundo para evitar cliques acidentais
        }
    }, 50);
}

// Função auxiliar para escrever (evita repetir código)
function escreverEfeito(msg, callback) {
    const textoElemento = document.getElementById("texto-transicao");
    textoElemento.textContent = "";
    let i = 0;
    if (window.intervaloTransicao) clearInterval(window.intervaloTransicao);

    window.intervaloTransicao = setInterval(() => {
        if (i < msg.length) {
            textoElemento.textContent += msg[i];
            if (msg[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.1;
                somCurto.play().catch(e => {});
            }
            i++;
        } else {
            clearInterval(window.intervaloTransicao);
            if (callback) callback();
        }
    }, 50);
}

function abrirCartaReal() {
    // 1. Esconde a transição e mostra a página da carta
    document.getElementById("paginaTransicaoCarta").style.display = "none";
    const paginaCarta = document.getElementById("paginaCarta");
    paginaCarta.style.display = "flex";

    window.scrollTo(0, 0);

    // 2. Seleciona o wrapper e adiciona a classe para ele SUBIR
    const wrapper = document.querySelector('.envelope-wrapper-grande');

    // Pequeno delay para o browser processar o display: flex antes da animação
    setTimeout(() => {
        wrapper.classList.add('visivel');
    }, 100);

    // 3. Espera o envelope acabar de subir (1.5s) para depois abrir
    // Usamos 1800ms para dar uma pequena pausa dramática no topo
    setTimeout(() => {
        abrirEnvelope();
    }, 1800);
}

function abrirEnvelope() {
    const envelope = document.querySelector('.envelope-grande');
    if (envelope) {
        envelope.classList.add('open');
    }
}

function clicarButaoCartaP2() {
    document.getElementById("paginaCarta").style.display = "none";

    // Mostra a transição
    const pag = document.getElementById("paginaTransicaoJogos");
    pag.style.display = "flex";

    // Mostra o balão e inicia o texto
    document.getElementById("balao-transicao-jogos").classList.add("mostrar-balao");
    iniciarFalaTransicaoJogos();
}

function irParaTransicaoJogos() {
    executarTransicaoPixel(() => {
        // 1. Esconde a carta
        document.getElementById("paginaCarta").style.display = "none";

        // 2. Mostra a página de transição
        const pag = document.getElementById("paginaTransicaoJogos");
        pag.style.display = "flex";

        // 3. Aplica o Fade In ao Ponto
        const ponto = pag.querySelector(".ponto-espiritual");
        ponto.classList.add("fade-in-suave");

        // 4. Mostra o balão e começa a falar
        const balao = document.getElementById("balao-transicao-jogos");
        balao.classList.add("mostrar-balao");

        iniciarFalaTransicaoJogos();
    });
}

function iniciarFalaTransicaoJogos() {
    const textoEl = document.getElementById("texto-transicao-jogos");
    const mensagem = "O Carlitos pensa que manda nisto tudo... mas eu estou aqui para te ajudar! Vamos logo recuperar os teus presentes";

    textoEl.textContent = "";
    let i = 0;
    if (window.intervaloTransJogos) clearInterval(window.intervaloTransJogos);

    window.intervaloTransJogos = setInterval(() => {
        if (i < mensagem.length) {
            textoEl.textContent += mensagem[i];

            if (mensagem[i] !== " " && i % 3 === 0) {
                if (typeof somPonto !== 'undefined') {
                    const somCurto = somPonto.cloneNode(true);
                    somCurto.volume = 0.1;
                    somCurto.play().catch(e => {});
                }
            }
            i++;
        } else {
            clearInterval(window.intervaloTransJogos);

            const dica = document.createElement("p");
            dica.style.fontSize = "10px";
            dica.style.marginTop = "8px";
            dica.style.opacity = "0.6";
            textoEl.appendChild(dica);

            // Clique para ir para o Menu de Jogos com a transição de pixéis
            window.addEventListener('click', function entrarNosJogos() {
                window.removeEventListener('click', entrarNosJogos);

                // Adicionei a transição de pixéis aqui para não ser um corte seco
                executarTransicaoPixel(() => {
                    document.getElementById("paginaTransicaoJogos").style.display = "none";
                    irParaMenuJogos();
                });
            }, { once: true });
        }
    }, 50);
}

let score = 0;
let jogoAtivo = false;

function irParaMenuJogos() {
    // 1. Esconder todas as secções
    const seccoes = [
        "menuInicial", "pagina1", "pagina2", "pagina3", "paginaPergunta",
        "paginaSim", "paginaCarta", "paginaTutorial", "paginaVideoJogo",
        "paginaVideoJogo2", "paginaLoveClicker", "paginaMenuJogos",
        "paginaPremio1", "paginaPremio2", "paginaPremio3"
    ];
    seccoes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    const containerPesca = document.querySelector(".container-pesca");
    if (containerPesca) containerPesca.style.display = "none";

    // 2. Mostrar o Menu de Jogos com Fade In
    const paginaJogos = document.getElementById("paginaMenuJogos");
    if (paginaJogos) {
        paginaJogos.style.display = "flex";

        // --- NOVO: Aplicar Efeito de Fade In ---
        paginaJogos.classList.remove("animar-pagina-fade"); // Remove se já existia
        void paginaJogos.offsetWidth;                // Truque para resetar animação
        paginaJogos.classList.add("animar-pagina-fade");    // Adiciona a animação

        window.scrollTo(0, 0);

        const ganhos = premiosGanhos.length;
        const contagemEl = document.getElementById("contagem");
        if (contagemEl) contagemEl.innerText = ganhos;

        // Determinar qual frase o Ponto vai dizer
        let textoParaEscrever = "";
        if (ganhos === 0) textoParaEscrever = "Escolhe um presente para recuperar-mos primeiro! ✨";
        else if (ganhos === 1) textoParaEscrever = "Boa! Já temos um. Qual vai ser o próximo? 🤔";
        else if (ganhos === 2) textoParaEscrever = "Só falta um! Quase lá Crominha! 💪";
        else if (ganhos === 3) textoParaEscrever = "CONSEGUISTE TUDO! ❤️ Clica no botão ali em baixo!";

        // --- EFEITO DE ESCREVER (Mantido com pequeno delay para o fade in) ---
        const textoPonto = document.getElementById("texto-ponto-menu");
        if (window.intervaloMenuJogos) clearInterval(window.intervaloMenuJogos);

        textoPonto.textContent = "";
        let i = 0;

        // Esperamos 500ms do fade-in antes de começar a escrever o texto
        setTimeout(() => {
            window.intervaloMenuJogos = setInterval(() => {
                if (i < textoParaEscrever.length) {
                    textoPonto.textContent += textoParaEscrever[i];
                    if (textoParaEscrever[i] !== " " && i % 3 === 0) {
                        const somCurto = somPonto.cloneNode(true);
                        somCurto.volume = 0.1;
                        somCurto.play().catch(e => {});
                    }
                    i++;
                } else {
                    clearInterval(window.intervaloMenuJogos);
                }
            }, 50);
        }, 500);

        // Atualizar visual dos botões
        for (let i = 1; i <= 3; i++) {
            const btn = document.getElementById(`btn-jogo${i}`);
            if (btn && premiosGanhos.includes(i)) {
                btn.classList.add("botao-ganho");
                btn.onclick = null;
            }
        }

        // Lógica do botão final (Mantida conforme o teu código)
        const btnFinal = document.getElementById("btn-final");
        if (ganhos === 3 && btnFinal) {
            btnFinal.disabled = false;
            btnFinal.classList.add("desbloqueado");
            btnFinal.innerText = "VER SURPRESA FINAL! ✨";
            btnFinal.onclick = () => {
                document.getElementById("paginaMenuJogos").style.display = "none";
                const pagTrans = document.getElementById("paginaTransicaoPedido");
                pagTrans.style.display = "flex";
                pagTrans.classList.add("animar-pagina-fade");
                const balao = document.getElementById("balao-transicao-final");
                setTimeout(() => {
                    balao.classList.add("mostrar-balao");
                    iniciarFalaTransicao();
                }, 1000);
            };
        }
    }
}

function iniciarFalaTransicao() {
    const textoEl = document.getElementById("texto-transicao-ponto");
    const balao = document.getElementById("balao-transicao-final");

    // A frase que ele vai dizer
    const mensagem = "Ia-me esquecendo de dizer, o meu dono tinha uma pergunta para te fazer neste dia tão especial...";

    // Garante que o balão aparece
    balao.classList.add("mostrar-balao");
    textoEl.textContent = "";

    let i = 0;
    // Limpa qualquer intervalo anterior para não duplicar letras
    if (window.intervaloTransicao) clearInterval(window.intervaloTransicao);

    window.intervaloTransicao = setInterval(() => {
        if (i < mensagem.length) {
            textoEl.textContent += mensagem[i];

            // Som do ponto a cada 3 letras
            if (mensagem[i] !== " " && i % 3 === 0) {
                if (typeof somPonto !== 'undefined') {
                    const somCurto = somPonto.cloneNode(true);
                    somCurto.volume = 0.1;
                    somCurto.play().catch(e => {});
                }
            }
            i++;
        } else {
            // QUANDO TERMINA DE ESCREVER:
            clearInterval(window.intervaloTransicao);

            // Adiciona uma pequena indicação visual para a Lígia saber que pode clicar
            const instrucao = document.createElement("p");
            instrucao.style.fontSize = "10px";
            instrucao.style.marginTop = "10px";
            instrucao.style.opacity = "0.6";
            instrucao.style.fontFamily = "Arial, sans-serif";
            textoEl.appendChild(instrucao);

            window.addEventListener('click', function avancarParaPergunta() {
                // Remove o evento para não disparar várias vezes
                window.removeEventListener('click', avancarParaPergunta);

                // Transição final para a pergunta
                executarTransicaoPixel(() => {
                    document.getElementById("paginaTransicaoPedido").style.display = "none";
                    document.getElementById("paginaPergunta").style.display = "flex";
                    window.scrollTo(0, 0);
                });
            }, { once: true });
        }
    }, 50); // Velocidade da escrita
}

let jogoAtualSelecionado = 0;

function irParaJogo(numero) {
    if (premiosGanhos.includes(numero)) return;

    if (intervaloMenuJogos) clearInterval(intervaloMenuJogos);

    document.getElementById("paginaMenuJogos").style.display = "none";
    const tutorial = document.getElementById("paginaTutorial");
    tutorial.style.display = "flex";

    const titulo = document.getElementById("titulo-tutorial");
    const textoTutorial = document.getElementById("texto-tutorial");
    const instrucoes = document.getElementById("instrucoes-detalhadas");
    const btnComecar = document.getElementById("btn-comecar-jogo");

    // Configura o conteúdo com base no jogo
    if (numero === 1) {
        textoTutorial.innerText = "Oh não! Precisamos de reunir algumas coisas para conseguir o teu presente";
        titulo.innerText = "Apanha os Corações";
        instrucoes.innerText = "Usa o rato para mover o balde 🪣 e apanhar 30 coisas boas que caem do céu. Não deixes escapar o nosso amor!";

        // CORRECÇÃO AQUI:
        btnComecar.onclick = () => {
            executarTransicaoPixel(() => {
                document.getElementById("paginaTutorial").style.display = "none";
                document.getElementById("paginaVideoJogo").style.display = "block";
                score = 0;
                document.getElementById('score').innerHTML = `Corações: 0`;
                iniciarMinijogo();
            });
        };
    }
    else if (numero === 2) {
        textoTutorial.innerText = "Nem acredito! O Carlitos mandou um dos teus presentes para o fundo do mar, temos que ir buscá-lo, ajuda-me...";
        titulo.innerText = "Pesca de Tesouros";
        instrucoes.innerText = "Clica e segura para descer o anzol. Desvia-te dos peixes 🐟 e apanha o presente que está na areia!";

        btnComecar.onclick = () => {
            executarTransicaoPixel(() => {
                document.getElementById("paginaTutorial").style.display = "none";
                iniciarJogoPesca();
            });
        };
    }
    else if (numero === 3) {
        textoTutorial.innerText = "Para receberes este presente, precisas de dar muitos miminhos à Lulu! ❤️";
        titulo.innerText = "Love Clicker";
        instrucoes.innerText = "Clica o mais rápido que conseguires! Precisas de pelo menos 50 cliques em 10 segundos para vencer.";

        // Garante que o coração está pronto para receber cliques
        configurarCliquesCoracao();

        // Dentro do if (numero === 3) no irParaJogo:
        btnComecar.onclick = () => {
            executarTransicaoPixel(() => {
                document.getElementById("paginaTutorial").style.display = "none";
                document.getElementById("paginaLoveClicker").style.display = "flex";

                // Reset dos botões
                document.getElementById('start-clicker-btn').style.display = 'block';
                document.getElementById('start-clicker-btn').style.visibility = 'visible';
                document.getElementById('btn-voltar-vitoria').style.display = 'none';

                document.getElementById('message-clicker').innerText = "";
                document.getElementById('score-clicker').innerText = "0";
                document.getElementById('timer').innerText = "10";
            });
        };
    }
}

function ganharJogo(numero) {
    if (premiosGanhos.includes(numero)) {
        irParaMenuJogos();
        return;
    }

    premiosGanhos.push(numero);

    // Esconde todas as páginas de jogo primeiro
    const paginasJogo = ["paginaVideoJogo", "paginaVideoJogo2", "paginaLoveClicker"];
    paginasJogo.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    // Encaminha para a página específica do prémio
    if (numero === 1) {
        const pag1 = document.getElementById("paginaPremio1");
        pag1.style.display = "flex";
        iniciarFalaPremio1();
    }
    else if (numero === 2) {
        const pag2 = document.getElementById("paginaPremio2");
        pag2.style.display = "flex"; // Importante ser flex para alinhar tudo
        iniciarFalaPremio2();
    }
    else if (numero === 3) {
        const pag3 = document.getElementById("paginaPremio3");
        pag3.style.display = "flex";
        iniciarFalaPremio3(); // Ativa a fala da foto
    }
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
    }, 400); // Cria um coração a cada 0.6 segundos
}

function criarCoracao(player, scoreElement) {
    const itensBons = ['❤️', '💖', '✨', '🌸', '💎', '⭐'];
    const chanceDeCoco = Math.random() < 0.15;

    const itemSorteado = chanceDeCoco ? '💩' : itensBons[Math.floor(Math.random() * itensBons.length)];

    const coracao = document.createElement('div');
    coracao.innerHTML = itemSorteado;
    coracao.className = 'coracao-caindo';
    coracao.style.position = 'fixed';
    coracao.style.left = Math.random() * (window.innerWidth - 60) + 'px';

    // --- ALTERAÇÃO: TAMANHO MAIOR ---
    coracao.style.fontSize = '50px'; // Aumentei de 30px para 50px
    coracao.style.userSelect = 'none'; // Evita que ela selecione o emoji sem querer

    document.body.appendChild(coracao);

    let posicaoTopo = -60;

    // --- ALTERAÇÃO: VELOCIDADE MAIS RÁPIDA ---
    // Aumentei a base de 3 para 6, e a variação de 4 para 6.
    const velocidade = 5 + Math.random() * 6;

    const queda = setInterval(() => {
        if (!jogoAtivo) {
            coracao.remove();
            clearInterval(queda);
            return;
        }

        posicaoTopo += velocidade;
        coracao.style.top = posicaoTopo + 'px';

        const baldeRect = document.getElementById('imagemBalde').getBoundingClientRect();
        const cRect = coracao.getBoundingClientRect();

        // Ajuste fino da colisão para o novo tamanho (mais generoso)
        if (
            cRect.bottom >= baldeRect.top &&
            cRect.right >= baldeRect.left + 10 &&
            cRect.left <= baldeRect.right - 10 &&
            cRect.top <= baldeRect.bottom
        ) {
            if (itemSorteado === '💩') {
                score = Math.max(0, score - 5);
                scoreElement.innerHTML = `Corações: ${score} (CUIDADO! 💩)`;
                scoreElement.style.color = "#8B4513"; // Castanho
                setTimeout(() => { scoreElement.style.color = "white"; }, 500);
            } else {
                score++;
                scoreElement.innerHTML = `Corações: ${score}`;

                // Feedback visual rápido ao apanhar (opcional)
                scoreElement.style.transform = "scale(1.2)";
                setTimeout(() => { scoreElement.style.transform = "scale(1)"; }, 100);
            }

            coracao.remove();
            clearInterval(queda);

            if (score >= 30) {
                jogoAtivo = false;
                finalizarJogo();
            }
        }

        if (posicaoTopo > window.innerHeight) {
            coracao.remove();
            clearInterval(queda);

            if (jogoAtivo && itemSorteado !== '💩') {
                score = Math.max(0, score - 2);
                scoreElement.innerHTML = `Corações: ${score}`;
            }
        }
    }, 20);
}

function finalizarJogo() {
    jogoAtivo = false;

    // 1. Chamar a transição de pixéis
    executarTransicaoPixel(() => {
        // --- TUDO O QUE ACONTECE AQUI DENTRO É FEITO ENQUANTO O ECRÃ ESTÁ COBERTO ---

        // 2. Esconde o jogo
        const paginaVideo = document.getElementById("paginaVideoJogo");
        if (paginaVideo) paginaVideo.style.display = "none";

        // 3. Limpa os corações restantes
        document.querySelectorAll('.coracao-caindo').forEach(c => c.remove());

        // 4. Mostra a página de prémio
        const paginaPremio = document.getElementById("paginaPremio1");
        if (paginaPremio) {
            paginaPremio.style.display = "flex";
            // Removemos o fade in para não haver conflito de animações
            paginaPremio.style.opacity = "1";
        }

        // 5. Executa a lógica de vitória (sons, falas do Ponto, etc.)
        ganharJogo(1);
    });
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

        if (presenteCapturado) {
            clearInterval(loopColisao);
            return;
        }

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

            // Criamos uma variável local para garantir que a vitória só dispara 1 vez
            let vitoriaDisparada = false;

            const subirComTesouro = setInterval(() => {
                const novoAnzolRect = anzol.getBoundingClientRect();
                const linhaAltura = parseFloat(window.getComputedStyle(linha).height);

                tesouro.style.top = (novoAnzolRect.top) + "px";
                tesouro.style.left = (novoAnzolRect.left) + "px";

                if (linhaAltura <= 5) {
                    clearInterval(subirComTesouro);

                    if (!vitoriaDisparada) {
                        vitoriaDisparada = true;
                        tesouro.style.display = "none";
                        ganharJogoPesca(); // AGORA SÓ CHAMA UMA VEZ
                    }
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
    }, 1000); // Um pouco mais que o tempo da transição CSS
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

function ganharJogoPesca() {
    pescando = false;

    // 1. Inicia a transição de pixéis
    executarTransicaoPixel(() => {
        // --- TUDO AQUI DENTRO ACONTECE DURANTE O "BLACKOUT" DOS PIXÉIS ---

        // 2. Esconde os containers do jogo 2
        const p2 = document.getElementById("paginaVideoJogo2");
        if (p2) p2.style.display = "none";

        const containerPesca = document.querySelector('.container-pesca');
        if (containerPesca) containerPesca.style.display = "none";

        // 3. Limpeza de peixes e arrays
        document.querySelectorAll('.peixe-obstaculo').forEach(p => p.remove());
        peixes = [];

        // 4. Mostra a página do Prémio #2
        const paginaPremio2 = document.getElementById("paginaPremio2");
        if (paginaPremio2) {
            paginaPremio2.style.display = "flex";
            paginaPremio2.style.opacity = "1"; // Garante que não há fade-in conflituoso
        }

        // 5. CHAMA A LÓGICA DE VITÓRIA (entrega do presente/fala do Ponto)
        ganharJogo(2);
    });
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
    document.getElementById('message-clicker').innerText = "RÁPIDO! CLICA!!!";

    const btn = document.getElementById('start-clicker-btn');
    if (btn) btn.style.visibility = 'hidden';

    clearInterval(clickTimerId);
    clickTimerId = setInterval(() => {
        clickTimeLeft--;
        const timerEl = document.getElementById('timer');
        if (timerEl) timerEl.innerText = clickTimeLeft;
        if (clickTimeLeft <= 0) endClickGame();
    }, 1000);
}

function endClickGame() {
    clearInterval(clickTimerId);
    clickGameActive = false;

    const btnStart = document.getElementById('start-clicker-btn');
    const btnVoltar = document.getElementById('btn-voltar-vitoria');
    const msg = document.getElementById('message-clicker');

    if (clickScore >= 50) {
        msg.innerText = "CONSEGUISTE! A LULU ESTÁ SUPER FELIZ! ❤️";
        if (btnStart) btnStart.style.display = 'none';

        if (btnVoltar) {
            btnVoltar.style.display = 'block';
            btnVoltar.innerText = "Recolher Presente 🎁";

            // Definir o clique para a transição
            btnVoltar.onclick = () => {
                executarTransicaoPixel(() => {
                    // 1. Esconde o jogo 3
                    const jogo3 = document.getElementById("paginaLoveClicker");
                    if (jogo3) jogo3.style.display = "none";

                    // 2. Configura a Página de Prémio 3 para o Fade In
                    const paginaPremio3 = document.getElementById("paginaPremio3");
                    if (paginaPremio3) {
                        paginaPremio3.style.display = "flex";

                        // Reset e disparo da classe de fade
                        paginaPremio3.classList.remove("animar-pagina-fade");
                        void paginaPremio3.offsetWidth; // Força o browser a resetar a animação
                        paginaPremio3.classList.add("animar-pagina-fade");
                    }

                    // 3. Chama a lógica de vitória (falas da Lulu)
                    ganharJogo(3);
                });
            };
        }
    } else {
        msg.innerText = "Faltaram cliques! Tenta de novo.";
        if (btnStart) {
            btnStart.style.visibility = 'visible';
            btnStart.style.display = 'block';
            btnStart.innerText = "Tentar Novamente";
        }
    }
}

function irParaDespedida() {
    // Esconde o menu de jogos
    document.getElementById("paginaMenuJogos").style.display = "none";

    const pDespedida = document.getElementById("paginaDespedida");
    pDespedida.style.display = "flex"; // Usa flex para respeitar o alinhamento do CSS

    if (typeof dispararConfetis === "function") {
        dispararConfetis();
    }
}

function iniciarFalaPremio1() {
    const textoElemento = document.getElementById("texto-premio1");
    const balao = document.getElementById("balao-premio1");
    const ponto = document.getElementById("ponto-premio1");
    const balde = document.getElementById("balde-vitoria");
    const mensagem = "Incrível! Apanhaste tudo o que era preciso para este presente! ❤️";

    textoElemento.textContent = "";
    let i = 0;

    if (window.intervaloPremio) clearInterval(window.intervaloPremio);

    window.intervaloPremio = setInterval(() => {
        if (i < mensagem.length) {
            textoElemento.textContent += mensagem[i];
            if (mensagem[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.1;
                somCurto.play().catch(e => {});
            }
            i++;
        // ... (resto do código igual até ao else)
        } else {
            clearInterval(window.intervaloPremio);

            window.addEventListener('click', function dispararAnimacoes() {
                window.removeEventListener('click', dispararAnimacoes);

                balao.classList.remove("mostrar-balao");
                balao.style.display = "none";
                ponto.classList.add("ponto-subir-vitoria");

                setTimeout(() => {
                    // 3. O Balde entra em cena
                    balde.style.display = "block"; // Garante que o display não é none
                    balde.classList.add("balde-entrar-vitoria");

                    // --- NOVO: Animação do Presente ---
                    setTimeout(() => {
                        const presente = document.getElementById("presente-vitoria");
                        presente.classList.add("animar-presente");

                        // 4. Só depois do presente saltar é que o próximo clique volta ao menu
                        setTimeout(() => {
                            window.addEventListener('click', () => {
                                irParaMenuJogos();
                            }, { once: true });
                        }, 1200);
                    }, 1000); // Espera o balde terminar de subir para o presente saltar

                }, 800);
            }, { once: true });
        }
    }, 50);
}

function iniciarFalaPremio2() {
    const textoElemento = document.getElementById("texto-premio2");
    const mensagem = "Olha só o que conseguiste resgatar das profundezas! É lindo! ✨";

    textoElemento.textContent = "";
    let i = 0;

    if (window.intervaloPremio) clearInterval(window.intervaloPremio);

    window.intervaloPremio = setInterval(() => {
        if (i < mensagem.length) {
            textoElemento.textContent += mensagem[i];

            if (mensagem[i] !== " " && i % 3 === 0) {
                const somCurto = somPonto.cloneNode(true);
                somCurto.volume = 0.1;
                somCurto.play().catch(e => {});
            }
            i++;
        } else {
            clearInterval(window.intervaloPremio);

            // Clique para voltar ao menu
            window.addEventListener('click', function voltarAoMenu() {
                irParaMenuJogos();
                window.removeEventListener('click', voltarAoMenu);
            }, { once: true });
        }
    }, 50);
}

function iniciarFalaPremio3() {
    const textoElemento = document.getElementById("texto-premio3");
    const containerLulu = document.getElementById("lulu-voa-container");
    const presente = document.getElementById("presente-final-3");

    const msg1 = "Obrigada pelas festinhas! Estava mesmo a precisar de carinho... ❤️";
    const msg2 = "O Carlitos pediu-me para esconder isto, mas já que me trataste tão bem, eu vou-to dar!";

    let i = 0;
    let mensagemAtual = msg1;

    function escreverTexto(texto, callback) {
        textoElemento.textContent = "";
        i = 0;
        if (window.intervaloPremio) clearInterval(window.intervaloPremio);

        window.intervaloPremio = setInterval(() => {
            if (i < texto.length) {
                textoElemento.textContent += texto[i];
                if (texto[i] !== " " && i % 3 === 0) {
                    const somCurto = somPonto.cloneNode(true);
                    somCurto.volume = 0.1;
                    somCurto.play().catch(e => {});
                }
                i++;
            } else {
                clearInterval(window.intervaloPremio);
                if (callback) callback();
            }
        }, 50);
    }

    // Inicia a primeira fala
    escreverTexto(msg1, () => {
        // Espera clique para a segunda fala
        window.addEventListener('click', function proximaFala() {
            window.removeEventListener('click', proximaFala);

            // Inicia a segunda fala
            escreverTexto(msg2, () => {
                // Espera clique para a animação final
                window.addEventListener('click', function dispararEntrega() {
                    window.removeEventListener('click', dispararEntrega);

                    containerLulu.classList.add("lulu-subir-vitoria");

                    setTimeout(() => {
                        presente.classList.add("presente-entrar-vitoria");

                        setTimeout(() => {
                            window.addEventListener('click', () => {
                                irParaMenuJogos();
                            }, { once: true });
                        }, 1000);
                    }, 800);
                }, { once: true });
            });
        }, { once: true });
    });
}

function executarTransicaoPixel(acaoNoMeio) {
    const transitionContainer = document.getElementById("pixel-transition");
    transitionContainer.innerHTML = ''; // Limpa blocos antigos

    const colunas = 10;
    const linhas = Math.ceil(window.innerHeight / (window.innerWidth / colunas));
    const totalBlocks = colunas * linhas;

    // Criar os blocos
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.className = "pixel-block";
        block.style.width = `10vw`;
        block.style.height = `10vw`;
        transitionContainer.appendChild(block);
    }

    const blocks = document.querySelectorAll(".pixel-block");

    // 1. Pixels aparecem (Escurece tudo)
    blocks.forEach((block) => {
        setTimeout(() => { block.style.opacity = "1"; }, Math.random() * 600);
    });

    // 2. No meio da animação (quando está tudo preto)
    setTimeout(() => {
        acaoNoMeio(); // EXECUTAR A MUDANÇA DE PÁGINA AQUI

        // 3. Pixels desaparecem (Revela o jogo)
        blocks.forEach((block) => {
            setTimeout(() => { block.style.opacity = "0"; }, Math.random() * 600);
        });
    }, 800); // Espera 800ms para garantir que está tudo tapado
}


// Bloqueio Global do Menu de Contexto (Botão Direito) em toda a página
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloqueio extra para garantir que cliques do meio/direito não ativem nada nativo
document.addEventListener('auxclick', event => event.preventDefault());