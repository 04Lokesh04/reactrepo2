import './index.css'

import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
    filteredList: [],
    count: 0,
    passwordList: [],
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()

    const {username, password, website} = this.state

    const newPasswordItem = {
      id: uuidV4(),
      user: username,
      web: website,
      pswd: password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordItem],
      count: prevState.count + 1,
      username: '',
      website: '',
      password: '',
    }))
  }

  checkValue = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  searchPassword = event => {
    this.setState({
      searchInput: event.target.value,
    })
    this.filterlist(event.target.value)
  }

  filterlist = searchInput => {
    const {passwordList} = this.state
    const newlist = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({filteredList: newlist})
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const newfilteredList = passwordList.filter(each => each.id !== id)
    this.setState(prevState => ({
      count: prevState.count - 1,
      passwordList: newfilteredList,
    }))
  }

  render() {
    const {
      username,
      password,
      website,
      passwordList,
      filteredList,
      searchInput,
      showPassword,
      count,
    } = this.state

    const listToDisplay = filteredList.length ? filteredList : passwordList
    return (
      <div className="main">
        <img
          className="image1"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="section1">
          <form className="Userform" onSubmit={this.submitForm}>
            <h1 className="heading1">Add New Password</h1>
            <div className="inputstyle">
              <img
                className="miniImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                placeholder="Enter Website"
                className="input"
                type="text"
                value={website}
                onChange={this.changeWebsite}
              />
            </div>
            <div className="inputstyle">
              <img
                className="miniImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                placeholder="Enter Username"
                className="input"
                type="text"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="inputstyle">
              <img
                className="miniImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                placeholder="Enter Password"
                className="input"
                type="password"
                value={password}
                onChange={this.changePassword}
              />
            </div>

            <button type="submit" className="button1">
              Add
            </button>
          </form>
          <img
            className="image2"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="section2">
          <div className="part1">
            <p className="heading2">Your Passwords {count}</p>
            <div className="searchstyle">
              <img
                className="miniImage2"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                placeholder="search"
                className="input1"
                type="search"
                value={searchInput}
                onChange={this.searchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox">
            <input
              className="input2"
              type="checkbox"
              checked={showPassword}
              onChange={this.checkValue}
              id="inputCheck"
            />
            <label className="label" htmlFor="inputCheck">
              Show Passwords
            </label>
          </div>
          {passwordList.length > 0 ? (
            <ul className="list">
              {listToDisplay.map(each => (
                <PasswordItem
                  details={each}
                  key={each.id}
                  deleteList={this.deletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="nopassword">
              <img
                className="image3"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="para2">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
