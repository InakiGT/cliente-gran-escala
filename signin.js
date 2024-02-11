const signin = document.getElementById('signin');
const womanAvatar = document.getElementById('woman');
const manAvatar = document.getElementById('man');
const img = document.getElementById('img-url');

const api = new Api('http://localhost:3000/api/v1/user');

signin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const imgUrl = img.value;

    if (password !== confirmPassword) {
        console.log('LAS CONTRASEÑAS NO COINCIDEN');
        return;
    }
        
    const response = await api.Post({ username, password, imgUrl });
    if (response.status === 201) {
        console.log(response);

        window.location = './login.html';
    } else {
        console.log('ERROR AL CREAR LA CUENTA');
    }
});

womanAvatar.addEventListener('click', (e) => {
    e.preventDefault();

    img.value = womanAvatar.src;
});

manAvatar.addEventListener('click', (e) => {
    e.preventDefault();
    
    img.value = manAvatar.src;
});