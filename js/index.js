// Comandos executados ao terminar de carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    await banner();
    await getTrendingMovies();
});

async function banner() {
    let trendings = [];4
    await fetch('https://api.themoviedb.org/3/trending/movie/week?language=pt-br', options)
        .then(res => res.json())
        .then(res => res.results.forEach(movie => {
            trendings.push(movie)
        }))
        .catch(err => console.error(err));

    let carousel = document.querySelector('.carousel-inner');
    carousel.innerHTML = '';
    for (let i = 0; i < trendings.length; i++) {
        let active = i == 0 ? 'active' : '';
        carousel.innerHTML += 
            `<div class="carousel-item ${active}">
                <img src="https://image.tmdb.org/t/p/original/${trendings[i].backdrop_path}" class="d-block w-100" alt="">
                <div class="carousel-caption">
                    <h3>${trendings[i].title}</h3>
                    <p class="d-none d-md-block">${trendings[i].overview}</p>
                </div>
            </div>`;
    }
}

async function getTrendingMovies() {
    let trendings = [];
    await fetch('https://api.themoviedb.org/3/trending/movie/day?language=pt-br', options)
        .then(res => res.json())
        .then(res => trendings = res.results)
        .catch(err => console.log(err));

    let trendingContainer = document.getElementById('trendingMovies');
    trendingContainer.innerHTML = '';
    for (let i = 0; i < trendings.length; i++) {
        trendingContainer.innerHTML += 
            `<a href="detalhes.html?id=${trendings[i].id}&media=${trendings[i].media_type}">
                <img class="rowimg" src="https://image.tmdb.org/t/p/original/${trendings[i].poster_path}" alt="">
            </a>`
    }
}

// Trending Movies Scroll
const containerTrendingMovies = document.getElementById("trendingMovies");

let scrollIntervalTrendingMovies; // Controlador para o intervalo de scroll
let scrollDirectionTrendingMovies = 0; // Direção do scroll (0 = parado, 1 = direita, -1 = esquerda)

containerTrendingMovies.addEventListener("mousemove", (e) => {
    const boundingRect = containerTrendingMovies.getBoundingClientRect();
    const mouseX = e.clientX;

    const threshold = 200; // Distância das bordas para ativar o scroll

    if (mouseX < boundingRect.left + threshold) {
        scrollDirectionTrendingMovies = -1; // Scroll para a esquerda
        containerTrendingMovies.style.cursor = "url('/img/arrow-left.png'), auto"; // Cursor para a esquerda
    } else if (mouseX > boundingRect.right - threshold) {
        scrollDirectionTrendingMovies = 1; // Scroll para a direita
        containerTrendingMovies.style.cursor = "url('/img/arrow-right.png'), auto"; // Cursor para a direita
    } else {
        scrollDirectionTrendingMovies = 0; // Parar scroll
        containerTrendingMovies.style.cursor = "pointer"; // Cursor padrão
    }
});

containerTrendingMovies.addEventListener("mouseleave", () => {
    scrollDirectionTrendingMovies = 0; // Parar scroll quando o mouse sai do elemento
    containerTrendingMovies.style.cursor = "default"; // Resetar cursor
});

// Função para scroll contínuo
function autoScrollTrendingMovies() {
    if (scrollDirectionTrendingMovies !== 0) {
        containerTrendingMovies.scrollLeft += scrollDirectionTrendingMovies * 6; // Ajuste a velocidade (5 = rápido)
    }
}

scrollIntervalTrendingMovies = setInterval(autoScrollTrendingMovies, 16); // ~60 FPS
