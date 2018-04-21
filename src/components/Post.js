import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto
    }

    this.like = this.like.bind(this)
  }

  carregaIcone() {
    return this.state.foto.likeada ? require('../../resources/img/s2-checked.png') :
      require('../../resources/img/s2.png')
  }

  like = () => {

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

  exibeLikes(likers) {
    return likers.length > 0 &&
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
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

  render() {
    const { foto } = this.state;
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image style={styles.avatar} source={{ uri: foto.urlPerfil }} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />

        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.botaoDeLike}
              source={this.carregaIcone(foto.likeada)} />
          </TouchableOpacity>                

          {this.exibeLikes(foto.likers)} 
          {this.exibeLegenda(foto)}

        </View>
      </View>

    );
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
    borderRadius: 20
  },

  foto: {
    width: screen.width,
    height: screen.width,
  },

  rodape: {
    margin: 10,
  },

  botaoDeLike: {
    height: 20,
    width: 20,
  },

  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  comentario: {
    flexDirection: 'row',
  },

  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },

});
