import './index.css'

const PasswordItem = props => {
  const {details, deleteList} = props
  const {id, user, web, pswd, showpassword} = details

  const deleteIt = () => {
    deleteList(id)
  }

  return (
    <li className="list">
      <div className="symbol">{user[0]}</div>
      <div className="section">
        <p className="para1">{web}</p>
        <p className="para2">{user}</p>
        {showpassword && <p className="para3">{pswd}</p>}
        {!showpassword && (
          <img
            className="image4"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        className="button"
        type="button"
        onClick={deleteIt}
        data-testId="delete"
      >
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
