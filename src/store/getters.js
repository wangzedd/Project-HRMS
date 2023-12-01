const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto,
  userName: state => state.user.userInfo.username
}
export default getters
