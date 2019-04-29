

let mutations =  {
  addUserData(state, data,flag) {
    if( (typeof data) === 'object') {
      for (const props in data) {
        state.userData[props] = data[props];
      }
    }else {
      state.userData = {}
    }
    if(flag) {
      try {
        localStorage.userData = JSON.stringify(state.userData)
      } catch (e) {
        console.log(e)
      }
    }else {
      sessionStorage.userData = JSON.stringify(state.userData)
    }
  },
  deleteUserData(state) {
    state.userData = '';
    try {
      localStorage.userData = ''
      sessionStorage.userData = ''
    } catch(e) {

    }

  }
}
export default  mutations
