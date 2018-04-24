import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default class InputComentario extends Component {

    constructor() {
        super()
        this.state = {
            valorComentario: '',
        }
    }

    render() {

        return (

            <View style={styles.novoComentario}>
                <TextInput style={styles.input}
                    placeholder="Adicione um comentário..."
                    underlineColorAndroid="transparent"
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({ valorComentario: texto })} />

                <TouchableOpacity onPress={() => {
                    this.props.comentarioCallback(this.state.valorComentario, this.inputComentario)
                    this.setState({ valorComentario: '' })
                    this.inputComentario.clear()
                }}>
                    <Image style={styles.botaoComentario}
                        source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        flex: 1,
        height: 40,
    },

    botaoComentario: {
        height: 20,
        width: 20,
    },

    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }

})