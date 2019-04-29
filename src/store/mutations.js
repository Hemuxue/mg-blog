

let mutations =  {
  addUserData(state, data) {
    for (const props in data) {
      state.userData[props] = data[props];
    }
  }
}
export default  mutations
