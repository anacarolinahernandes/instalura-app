import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage,
} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService'
import Notificacao from '../api/Notificacao'

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    InstaluraFetchService.get('/fotos')
      .then(json => this.setState({ fotos: json }))
  }

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({ fotos })

  }

  like = (idFoto) => {
    const listaOriginal = this.state.fotos
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

    InstaluraFetchService.post(`/fotos/${idFoto}/like` )
      
  }


  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if (valorComentario === '')
      return

    const foto = this.buscaPorId(idFoto)
      
    const comentario = {
      texto: valorComentario
    }
    
    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
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