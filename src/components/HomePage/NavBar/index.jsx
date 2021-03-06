import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../../../actions/authActions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    this.props.setCurrentUser({});
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Travel With Me</h1>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-center">
          <div className="navbar-nav">
            <Link to="/" href="/" className="nav-item nav-link">Home</Link>
            <Link to="/homepage/plantrip" href="/homepage/plantrip" className="nav-item nav-link">Plan Trip</Link>
            <Link to="/homepage/searchtrip" href="/homepage/searchtrip" className="nav-item nav-link">Search Trip</Link>
  
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Trips
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to="/homepage/trips/mytrips" href="/homepage/trips/mytrips" className="dropdown-item">My Trips</Link>
              <Link to="/homepage/trips/pending" href="/homepage/trips/pending" className="dropdown-item">Pending Trips</Link>
            </div>
            </li>
  
            <Link to="/homepage/profile" href="/homepage/profile" className="nav-item nav-link">Profile</Link>
            <Link to="/login" href="/login" className="nav-item nav-link" onClick={this.logout}>Sign Out</Link>
          </div>
        </nav>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavBar);