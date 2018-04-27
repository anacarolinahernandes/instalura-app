import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage,
} from 'react-native';
import Post from './Post';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {

    const uri = //'http://192.168.0.137:8080/api/fotos'
    'https://instalura-api.herokuapp.com/api/fotos'

    AsyncStorage.getItem('token')
      .then(token => {

        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }
      })

      .then(request => fetch(uri, request))
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))
  }

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({ fotos })

  }

  like(idFoto) {
    const foto = this.buscaPorId(idFoto)

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {

        let novaLista = []
        if (!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuarioLogado }
          ]
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado
          })
        }

        return novaLista
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        this.atualizaFotos(fotoAtualizada)
      })

    const uri = //`http://192.168.0.137:8080/api/fotos/${idFoto}/like`
    `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`
    AsyncStorage.getItem(token)
      .then(token => {
        return {
          method: 'POST',
          headers: newHeaders({
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(request => fetch(uri, request))
  }


  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if (valorComentario === '')
      return

    const foto = this.buscaPorId(idFoto)

    const uri = //`http://192.168.0.137:8080/api/fotos/${idFoto}/comment`
    `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`

    AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: 'POST',
          body: JSON.stringify({
            texto: valorComentario
          }),
          headers: new Headers({
            "Content-type": "application/json",
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(request => fetch(uri, request))
      .then(response => response.json())
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.atualizaFotos(fotoAtualizada)
        inputComentario.clear()
      })
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like}
            comentarioCallback={this.adicionaComentario} />
        } />
    )
  }

}


const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },

})