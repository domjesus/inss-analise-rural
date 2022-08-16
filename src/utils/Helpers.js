import storage from "./../store/store";

function saveUserToLocalStorage(user) {
  //   console.log("User: ", user);
  Object.keys(user).forEach((u) => localStorage.setItem("user_" + u, user[u]));
}

function getUserFromLocalStorage() {
  let user = {};
  user.siape = localStorage.getItem("user_siape");
  user.name = localStorage.getItem("user_name");
  user.gex = localStorage.getItem("user_gex");
  user.cidade = localStorage.getItem("user_cidade");
  user.cargo = localStorage.getItem("user_cargo");
  user.ol_nome = localStorage.getItem("user_ol_nome");
  user.ol_numero = localStorage.getItem("user_ol_numero");

  return user;
}

function clearUserInfos() {
  localStorage.removeItem("user_siape");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_gex");
  localStorage.removeItem("user_cidade");
  localStorage.removeItem("user_cargo");
  localStorage.removeItem("user_ol_nome");
  localStorage.removeItem("user_ol_numero");

  storage.commit("SETUSER", {});
}

function formatDateWithMoment(date) {
  return moment(date).format("DD/MM/Y");
}

export { saveUserToLocalStorage, getUserFromLocalStorage, clearUserInfos, formatDateWithMoment };
