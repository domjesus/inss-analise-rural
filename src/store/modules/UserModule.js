import axios from "axios";
import { saveUserToLocalStorage } from "../../utils/Helpers";
import store from "./../store";

export default {
  state: {
    user: {},
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SETUSER(state, newValue) {
      state.user = newValue;
      if (state.user.usuario_nome) saveUserToLocalStorage(state.user);
    },
  },
  actions: {
    changeUser(context) {
      const api = import.meta.env.VITE_APP_API_ADDRESS;
      const GET_USER_DATA = api + "/user";
      // const user = new URLSearchParams();
      // user.append("siape", store.getters.getUser.siape);
      const user = { siape: store.getters.getUser.siape };
      // headers: { "content-type": "application/x-www-form-urlencoded" },

      axios(GET_USER_DATA, {
        method: "POST",
        data: user,
      })
        .then((r) => {
          // if(r.data.status
          console.log(r.data);
          if (!r.data.not_found) {
            context.commit("SETUSER", r.data);
          } else alert("Não foi possível recuperar suas informações!");
        })
        .catch((err) => console.log("Error fetching user data: ", err));
    },
  },
};
