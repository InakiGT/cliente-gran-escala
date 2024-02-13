const loginForm = document.getElementById('login');

const api = new Api('http://localhost:3000/api/v1/login');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
        
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await api.Post({ username, password });
    console.log(username, password)
    if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt);
        window.location = './index.html';
    } else {
        console.log('ERROR AL INICIAR SESIÓN');
    }
});