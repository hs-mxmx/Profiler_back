export default class APIService {
    // Insert an user
    static Register(body) {
        return fetch(`http://localhost:5000/auth/register`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else {
                    console.log(response)
                }
            })
            .catch(error => console.log(error))
    }

    // Login
    static Login(body) {
        return fetch(`http://localhost:5000/auth/signin`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else {
                    console.log(response)
                }
            })
            .catch(error => console.log(error))
    }

}
