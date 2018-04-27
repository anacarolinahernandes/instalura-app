import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    Button,
    Text,
    Image,
    AsyncStorage,
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: '',
        }
    }

    efetuaLogin = () => {
        
        const uri = //'http://192.168.0.137:8080/api/public/login'
        'https://instalura-api.herokuapp.com/api/login'

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        
        fetch(uri, request)
            .then(response => {
                if (!response.ok)
                    throw new Error('Não foi possível efetuar login.')

                return response.text()
            })
            .then(token => {
                //AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('usuario', this.state.usuario)
                //AsyncStorage.setItem('usuario', JSON.stringify(usuario))

                this.props.navigator.resetTo({
                    screen: 'Feed',
                    title: 'Instalura',
                })
            })

            .catch(error => {this.setState({ validacao: error.message })})
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../resources/img/s2-checked.png')} />
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        placeholder="Usuário"
                        onChangeText={texto => this.setState({ usuario: texto })} />
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Senha"
                        onChangeText={texto => this.setState({ senha: texto })} />
                    <Button title="Login"
                        onPress={this.efetuaLogin} />
                </View>

                <Text style={styles.validacao}>
                    {this.state.validacao}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontWeight: 'bold',
        fontSize: 40,

    },

    form: {
        width: Dimensions.get('screen').width * 0.8,
    },

    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },

    validacao: {
        marginTop: 15,
        color: '#e74c3c'
    },
})
