
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '1234',  // Asegúrate de usar el puerto correcto si es diferente
          pathname: '/img/**',  // Ruta donde se encuentran las imágenes
        },
        {
          protocol: 'https',
          hostname: 'api-priv.onrender.com',
          port: '',  // Asegúrate de usar el puerto correcto si es diferente
          pathname: '/img/**',  // Ruta donde se encuentran las imágenes
        }
      ],
    },
  };
