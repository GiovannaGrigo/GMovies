// Ao carregar a página executa as funções de buscar os dados
document.addEventListener("DOMContentLoaded", async () => {
    toggleLoading();
});

document.getElementById('pesquisar').addEventListener('submit', async function(event) {
    event.preventDefault();
    toggleLoading();
    let texto = this.querySelector('input[type="text"]').value;
    // console.log(texto);

    let resultados;
    await fetch(`https://api.themoviedb.org/3/search/multi?query=${texto}&include_adult=false&language=pt-br`, options)
        .then(res => res.json())
        .then(res => resultados = res.results)
        .catch(err => console.error(err));
    //console.log(resultados);

    let qtdeResultados = document.querySelector("#qtdeResultados");
    let divResultados = document.querySelector("#resultado");

    divResultados.innerHTML = '';
    if (resultados.length > 0) {
        qtdeResultados.innerHTML = `Resultados Encontrados (${resultados.length})`;
        resultados.forEach(resultado => {
            let poster = resultado.poster_path ?
                `https://image.tmdb.org/t/p/original/${resultado.poster_path}` :
                'img/no-poster.png';
            divResultados.innerHTML += 
                `<div class="col">
                    <a href="detalhes.html?id=${resultado.id}&media=${resultado.media_type}" class="text-decoration-none">
                        <div class="card bg-dark h-100">
                            <img src="${poster}" class="card-img-top" style="height:400px">
                            <div class="card-body text-white">
                                <h5 class="card-title text-center">
                                    ${resultado.title ?? resultado.name}
                                </h5>
                            </div>
                        </div>
                    </a>
                </div>`;
        });
    } else {
        qtdeResultados.innerHTML = `Nenhum Resultado Encontrado`;
    }
    toggleLoading();
})