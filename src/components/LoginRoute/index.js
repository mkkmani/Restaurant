import {useHistory, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginRoute = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrorMsg] = useState('')
  const [showErr, setShowErr] = useState(false)
  const history = useHistory()

  //   const onClickLogin = async e => {
  //     e.preventDefault()

  //     if (username === '') {
  //       setErrorMsg('* Please enter username')
  //       setShowErr(true)
  //     } else if (password === '') {
  //       setErrorMsg('* Please enter password')
  //       setShowErr(true)
  //     } else if (username !== 'Mani') {
  //       setErrorMsg('* Invalid username')
  //       setShowErr(true)
  //     } else if (password !== 'Mani@123') {
  //       setErrorMsg('* Invalid password')
  //       setShowErr(true)
  //     } else {
  //       const details = {username: 'rahul', password: 'rahul@2021'}
  //       const api = 'https://apis.ccbp.in/login'
  //       const options = {
  //         method: 'POST',
  //         body: JSON.stringify(details),
  //       }

  //       const response = await fetch(api, options)
  //       const data = await response.json()

  //       Cookies.set('jwt_token', data.jwt_token, {expires: 30})
  //       history.push('/')
  //     }
  //   }

  const onClickLogin = async e => {
    e.preventDefault()
    const details = {username, password}
    const api = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.push('/')
    } else {
      setErrorMsg(data.error_msg)
      setShowErr(true)
    }
  }

  const LoginForm = () => (
    <div className="login-div">
      <h1>UNI Resto Cafe</h1>
      <form className="login-form" onSubmit={onClickLogin}>
        <div className="input-label">
          <label htmlFor="username" className="label-login">
            USERNAME
          </label>
          <input
            type="text"
            className="input-login"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-label">
          <label htmlFor="password" className="label-login">
            PASSWORD
          </label>
          <input
            type="password"
            className="input-login"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <div>{showErr && <p className="err-msg">{errMsg}</p>}</div>
      </form>
    </div>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return <div>{LoginForm()}</div>
}

export default LoginRoute
