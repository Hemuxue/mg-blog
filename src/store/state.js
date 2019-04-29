let defaultData = {}
try {
  if(localStorage.userData) {
    defaultData = JSON.parse(localStorage.userData)
  }
}catch (e) {
  console.log(e )
}
let state = {
  userData:defaultData
}


export default state
