const getters = {
  nickName: state => state.user.nickName,
  university: state => state.user.university,
  auth: state => state.user.auth,
  openId: state => state.user.openId,
  location: state => state.user.location,
  token: state => state.user.token,
  shareImg: state => state.user.shareImg,
  shareDetail: state => state.user.shareDetail
}
export default getters
