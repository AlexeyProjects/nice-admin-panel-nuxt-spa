export default function (context) {
  if (context.route.name === 'login') {
    return
  }
  if (!context.store.state.login.authorizated && !localStorage.getItem('token')) {
    return context.redirect('/login')
  }
}