import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
    }

    this.like = this.like.bind(this)
  }

  exibeLegenda(foto) {
    if (foto.comentario === '')
      return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    )
  }

  like = () => {
    const { foto } = this.state

    let novaLista = []
    if (!this.state.foto.likeada)
      novaLista = [
        ...this.state.foto.likers,
        { login: 'meuUsuario' }
      ]
    else
      novaLista = this.state.foto.likers.filter(liker => liker.login != 'meuUsuario')

    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
      likers: novaLista
    }
    this.setState({ foto: fotoAtualizada })

  }

  adicionaComentario = (valorComentario, inputComentario) => {
    if (valorComentario === '')
      return;

    const novaLista = [...this.state.foto.comentarios, {
      id: Math.random(),
      login: 'meuUsuario',
      texto: valorComentario
    }]

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista,
    }

    this.setState({ foto: fotoAtualizada })
    inputComentario.clear()

  }

  render() {
    const { foto } = this.state

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image style={styles.avatar} source={{ uri: foto.urlPerfil }} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />

        <View style={styles.rodape}>
          <Likes foto={foto} likeCallback={this.like.bind(this)} />
          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <InputComentario
            comentarioCallback={this.adicionaComentario.bind(this)} />
        </View>
      </View>
    )
  }
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({

  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  foto: {
    width: screen.width,
    height: screen.width,
  },

  rodape: {
    margin: 10,
  },

  comentario: {
    flexDirection: 'row',
  },

  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },

});
