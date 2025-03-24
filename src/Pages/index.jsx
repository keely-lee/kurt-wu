import react from 'react';

const nav = () => {
  return (
    <nav>
      <h1>Kurt Wu Photography</h1>
      <ul>
        <li>Photos</li>
        <li>Videos</li>
        <li>Bio</li>
      </ul>

      <div>
        <FontAwesomeIcon icon="fa-brands fa-twitter" />
        <a>twitter</a>
        <FontAwesomeIcon icon="fa-brands fa-facebook" />
        <a>fb</a>
        <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
        <a>ig</a>
        <FontAwesomeIcon icon="fa-solid fa-envelope" />
        <a>email</a>
      </div>
    </nav>
  )
}

export default nav;