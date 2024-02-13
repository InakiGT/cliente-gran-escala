

class Api {
    constructor(url) {
        this.baseUrl = url;
        this.url = url;
    }

    async Get(id) {
        try {
            this.url = id ? this.baseUrl + `/${id}` : this.baseUrl;
            const response = await axios.get(this.url);

            return response;
        } catch(err) {
            console.log('Error al hacer la solicitud');
        }
    }

    async Post(data) {
        try {
            this.url = this.baseUrl;
            const response = await axios.post(this.url, data);

            return response;
        } catch(err) {
            console.log('Error al hacer la solicitud', err);
        }
    }

    async Put(id, data) {
        try {
            this.url = this.baseUrl + `/${id}`;
            const response = await axios.put(this.url, data);

            return response;
        } catch(err) {
            console.log('Error al hacer la solicitud');
        }
    }

    async Delete(id, author) {
        try {
            this.url = this.baseUrl + `/${id}`;
            const data = {
                author,
            }
            const response = await axios.delete(this.url, { data });

            return response;
        } catch(err) {
            console.log('Error al hacer la solicitud');
        }
    }
}