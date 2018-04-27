import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import Feed from './components/Feed'
import Login from './screens/Login'

export default () => {
    Navigation.registerComponent('Login', () => Login)
    Navigation.registerComponent('Feed', () => Feed)

    AsyncStorage.getItem('usuario')
    .then(usuario => {

        if(usuario) {
            return {
                screen: 'Feed',
                title: 'Instalura'
            }
        }

        return {
            screen: 'Login',
            title: 'Login',
        }
    })

    .then(screen => Navigation.startSingleScreenApp({screen}))
}



