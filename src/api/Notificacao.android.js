import {ToastAndroid} from 'react-native'

export default class Notificacao {

    static exibe(titulo, mensagem) {
       ToastAndroid.alert(mensagem, ToastAndroid.SHORT)
    }
}