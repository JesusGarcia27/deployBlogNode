const PostService = require('../services/post.service');

class Sockets {
  constructor(io) {
    this.io = io;
    this.postService = new PostService();
    this.socketsEvents();
  }
  socketsEvents() {
    this.io.on('connection', (socket) => {
      socket.on('new-post', async ({ id }) => {
        try {
          const post = await this.postService.findPost(id);

          const newPost = await this.postService.downloadImgsPost(post);

          socket.broadcast.emit('render-new-post', newPost);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
    //! Escuchar todos los eventos
    //? Escuchar un evento "new-post" en el callback ({id})
    //* Llamar al servicio de los post para buscar el findPost
    //  Llamar el servicio de los post para resolver las imagenes
    //! Emitir a todos los clientes EXCEPTO AL CLIENTE QUE ENVIA EL EVENTO, el nuevo post
  }
}

module.exports = Sockets;
