const publicarContainer = document.getElementById('publicar');
const mostrarContainer = document.getElementById('mostrar');

const publicarNav = document.getElementById('publicar-nav');
const mostrarNav = document.getElementById('mostrar-nav');

publicarContainer.style = 'display: block';
publicarNav.addEventListener('click', (e) => {
    e.preventDefault();

    publicarContainer.style = 'display: block';
    mostrarContainer.style = 'display: none';
});

mostrarNav.addEventListener('click', (e) => {
    e.preventDefault();
    
    publicarContainer.style = 'display: none';
    mostrarContainer.style = 'display: block';
});