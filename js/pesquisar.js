
document.getElementById('pesquisar').addEventListener('submit', async function(event) {
    event.preventDefault();
    let texto = this.querySelector('input[type="text"]').value;
    // console.log(texto);

    let resultados;
    await fetch(`https://api.themoviedb.org/3/search/multi?query=${texto}&include_adult=false&language=pt-br`, options)
        .then(res => res.json())
        .then(res => resultados = res.results)
        .catch(err => console.error(err));
    // console.log(resultados);

    let qtdeResultados = document.querySelector("#qtdeResultados");
    let divResultados = document.querySelector("#resultado");
    
    divResultados.innerHTML = '';
    if (resultados.length > 0) {
        qtdeResultados.innerHTML = `Resultados Encontrados (${resultados.length})`;
        resultados.forEach(resultado => {
            let poster = resultado.poster_path ? `https://image.tmdb.orgt/t/p/original/${resultado.poster_path}` : 'img/no-poster.png';
            divResultados.innerHTML += ``;
        })
    } else {
        qtdeResultados.innerHTML = `Nenhum resultado Encontrado`;
    }

})