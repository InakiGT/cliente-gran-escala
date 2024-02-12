const editForm = document.getElementById('edit-form');
const titleInput = document.getElementById('form-title');
const contentInput = document.getElementById('form-content');
const imgInput = document.getElementById('form-img');

const url = location.href;
const idStartIndex = url.lastIndexOf('=');
const id = url.slice(idStartIndex + 1);
const cuaApi = new Api('http://localhost:3000/api/v1/cua');

const getInfo = async () => {
    const data = await cuaApi.Get(id);
    titleInput.value = data.data.title;
    contentInput.value = data.data.content;
    imgInput.value = data.data.imgurl;
}

getInfo();

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        console.log('LOS CAMPOS NO PUEDEN IR VACIOS');
        return;
    }

    if (contentInput.value.split(/\s+/).length > 50) {
        console.error('EL MÁXIMO DE PALABRAS ES 50');
        return;
    }

    const data = await cuaApi.Put(id, {
        title: titleInput.value,
        content: contentInput.value,
        imgUrl: imgInput.value,
        author: parseInt(decodeToken(localStorage.getItem('token'))),
    });

    if (data.status === 200) {
        window.location = './index.html';
    } else {
        console.error('ERROR EN LA ACTUALIZACIÓN');
    }
});