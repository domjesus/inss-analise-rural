const { createVuePlugin } = require("vite-plugin-vue2");

module.exports = {
  plugins: [createVuePlugin()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:5002/api",
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  base: "/rural/",
};
