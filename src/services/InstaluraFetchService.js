import {
    AsyncStorage
} from 'react-native'

const path = `https://instalura-api.herokuapp.com/api`

export default class InstaluraFetchService {

    static get(recurso) {
        const uri = `${path}${recurso}`

        return AsyncStorage.getItem('token')
            .then(token => {

                return {
                    headers: new Headers({
                        "X-AUTH-TOKEN": token
                    })
                }
            })

            .then(request => fetch(uri, request))
            .then(response => response.json())
    }

    static post(recurso, dados) {
        const uri = `${path}${recurso}`

        return AsyncStorage.getItem('token')
            .then(token => {
                const request = {
                    method: 'POST',
                    body: JSON.stringify(dados),
                    headers: new Headers({
                        "X-AUTH-TOKEN": token,
                        "Content-type": "application/json"
                    })
                }
                return request
            })

            .then(request => fetch(uri, request))
            .then(response => {
                if(!response.ok)
                throw new Error('Não foi possível completar a operação.')

                return response.json()
            })           
    }
}