
const mostrarContainer = document.getElementById('mostrar');

const cuaApi = new Api('http://localhost:3000/api/v1/cua');
const url = location.href;
const idStartIndex = url.lastIndexOf('=');
const id = url.slice(idStartIndex + 1);

const getData = async () => {
    const data = await cuaApi.Get(id);
    const element = data.data;
    console.log(data)

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
}

getData();