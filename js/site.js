// Evento de scroll da página
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50)
        navbar.classList.add('scrolled')
    else
        navbar.classList.remove('scrolled');
})

// Opções de acesso da API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2U1MGUyM2RlODU0MTEzNzJmY2IwYWI3Yzg2MjIxOCIsIm5iZiI6MTczMjIwNzczMi44NTU0ODk3LCJzdWIiOiI2NzNjZGQ0MTYwYjdiM2JjOTRhMGQzZTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Flyoh8xDoqYKZCGSk1bg4ZIZSLOzX3Ab6sVcsN2w2U4'
    }
};


// Formatação de Datas
function formatarData(data) {
    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();
    mes = mes.length < 2 ? '0' + mes : mes;
    dia = dia.length < 2 ? '0' + dia : dia;
    return [dia, mes, ano].join('/');
}


// Exibir e esconder Loading
function toggleLoading() {
    let loader = document.querySelector('.loader');
    loader.style.display = loader.style.display == 'none' ? 'block' : 'none';
}