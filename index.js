const publicarContainer = document.getElementById('publicar');
const mostrarContainer = document.getElementById('mostrar');
const createCuaForm = document.getElementById('create-cua');

const publicarNav = document.getElementById('publicar-nav');
const mostrarNav = document.getElementById('mostrar-nav');

const cuaApi = new Api('http://localhost:3000/api/v1/cua');

mostrarContainer.style = 'display: block';
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

createCuaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const author = decodeToken(localStorage.getItem('token'));
    const title = document.getElementById('form-title').value;
    const content = document.getElementById('form-content').value;
    const imgUrl = document.getElementById('form-img').value;

    if (title.trim() === '' || content.trim() === '') {
        console.log('LOS DATOS NO PUEDEN IR VACIOS');
        return;
    }

    const response = await cuaApi.Post({
        author,
        title,
        content,
        imgUrl
    });

    if (response.status === 201) {
        publicarContainer.style = 'display: none';
        mostrarContainer.style = 'display: block';
    } else {
        console.log('ERROR EN LA INSERCIÓN');
    }
});

setInterval(async () => {
    const data = await cuaApi.Get();

    if (data.status !== 200) {
        console.log('NO ESTÁS CONECTADO');
        return;
    }
    mostrarContainer.textContent = '';
    data.data.forEach(element => {
        const div = document.createElement('div');
        const title = document.createElement('p');
        const content = document.createElement('p');
        const img = document.createElement('img');
        let editButton = null;
        let deleteButton = null;
    
        const titleData = document.createTextNode(element.title);
        const contentData = document.createTextNode(element.content);
        img.src = element.imgurl ? element.imgurl : '';

        title.appendChild(titleData);
        content.appendChild(contentData);

        
        div.appendChild(title);
        div.appendChild(content);
        div.appendChild(img);
        mostrarContainer.appendChild(div);
        if (parseInt(element.author) === decodeToken(localStorage.getItem('token'))) {
            editButton = document.createElement('button');
            deleteButton = document.createElement('button');

            editButton.textContent = 'Editar';
            deleteButton.textContent = 'Borrar';

            editButton.addEventListener('click', () => {
                window.location = `./edit.html?id=${element.id}`;
            });

            deleteButton.addEventListener('click', async () => {
                const data = await cuaApi.Delete(element.id, decodeToken(localStorage.getItem('token')));
                console.log(data);
                if (data.status === 200 ) {

                } else {
                    console.log('ERROR EN LA ELIMINACIÓN');
                }
            });

            div.appendChild(editButton);
            div.appendChild(deleteButton);
        }
    });

}, 3000);