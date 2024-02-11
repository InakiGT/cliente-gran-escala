const signin = document.getElementById('signin');

const api = new Api('http://localhost:3000/api/v1/user');

signin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const imgUrl = document.getElementById('img-url').value;

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