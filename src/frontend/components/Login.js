import { Link } from 'react-router-dom';

const Login = () => {


  const logOut=()=>{
    localStorage.removeItem('wallet');
    window.location.href = '/';
  }
  return (
    <div className="card-container">
      <div className="card-column">
        <Link className='link-login' to="/administration">
          <div className="card">Administration Panel</div>
        </Link>
        <Link className='link-login' to="/create-watch">
          <div className="card">Create new watch</div>
        </Link>
      </div>
      <div className="card-column">
        <Link className='link-login' to="/sell-watch">
          <div className="card">Sell watch</div>
        </Link>
        <a className='link-login' style={{cursor : 'pointer'}} onClick={logOut}>
          <div className="card">Log out</div>
        </a>
      </div>
    </div>
  );
};
export default Login;