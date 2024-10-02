// Inicializa a variável currentSlide para acompanhar o índice do slide atual
let currentSlide = 0;

// Função para mover o slide do carrossel
function moveSlide() {
    // Seleciona todos os elementos que têm a classe 'carousel-item'
    const slides = document.querySelectorAll('.carousel-item');
    
    // Armazena o total de slides encontrados
    const totalSlides = slides.length;

    // Atualiza o índice do slide atual, incrementando e utilizando o operador módulo
    // Isso garante que o índice volte a 0 quando atingir o total de slides
    currentSlide = (currentSlide + 1) % totalSlides;

    // Calcula a nova posição do carrossel
    // O deslocamento é calculado como -currentSlide * 100, o que move o carrossel
    // para a esquerda com base no índice atual
    const newTranslateX = -currentSlide * 100;

    // Aplica a transformação de translação ao contêiner do carrossel
    // Isso faz com que o carrossel se mova para a nova posição
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTranslateX}%)`;
}

// Define um intervalo que chama a função moveSlide a cada 4000 milissegundos (4 segundos)
// Isso faz com que o carrossel mude automaticamente a cada 4 segundos
setInterval(moveSlide, 4000);
