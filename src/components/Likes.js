import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


export default class Likes extends Component {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') :
            require('../../resources/img/s2.png')
    }

    exibeLikes(likers) {
        return likers.length > 0 &&
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
    }

    render() {
        const { foto, likeCallback } = this.props

        return (
            <View>
                <TouchableOpacity onPress={likeCallback}>
                    <Image style={styles.botaoDeLike}
                        source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    botaoDeLike: {
        height: 20,
        width: 20,
    },

    likes: {
        fontWeight: 'bold',
        marginBottom: 5,
    },

})

