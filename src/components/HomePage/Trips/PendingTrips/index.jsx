import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import pendingTrips from '../../../../actions/pendingTripsActions';
import showTrip from '../../../../actions/showTripAction';
import tripCreator from '../../../../actions/tripCreatorAction';
import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';
import updateStatus from '../../../../actions/tripStatusAction';


const queryTrips = gql`
query queryTrips($id: Int!) {
  getUser(id: $id) {
    id
    username
    trips {
      id
      title
      description
      publicId
      date_start
      date_end
      gender
      age_start
      age_end
      relationship
      cost
      trip_status
      user_type
      users{
        id
        username
        user_type
        gender
        age
      }
    }
  }
}`;

class PendingTrips extends React.Component {
  constructor(props) {
    super(props);
    this.setTripAndTravelers = this.setTripAndTravelers.bind(this);
    this.displayListofTrips = this.displayListofTrips.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.getUser && !prevProps.data.getUser) {
      console.log('QUERY', this.props.data);
      this.props.userTrips(this.props.data.getUser.trips);
      this.props.pendingTrips(this.props.data.getUser.trips);
    }
  }


  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.users);
    this.props.tripTravelers(trip.users);
    this.props.tripInterested(trip.users);
    this.props.updateStatus(trip.trip_status);
  }

  displayListofTrips() {
    let tripRender;

    if (!this.props.data.loading) {
      if (this.props.pendtrips.length > 0) {
        tripRender = (
        <div>
          {this.props.pendtrips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="/homepage/trips/tripinfo" href="/homepage/trips/tripinfo" className="nav-item nav-link">
                  {trip.title}
                </Link>
              </h3>
        </div>))}
        </div>)
      } else {
        tripRender = (<div>
          <h3>Currently No Trips!</h3>
        </div>);
      }
    }

    return tripRender;
  }

  render() {
    return (
      <div>
        <h1>Pending Trips</h1>
        {this.displayListofTrips()}
        <button onClick={() => console.log(this.props)}>
              button
        </button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    mytrips: state.mytrips,
    pendtrips: state.pendtrips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
    tripstat: state.tripstat,    
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    userTrips, pendingTrips, showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
  }, dispatch);
}

const Pend = graphql(queryTrips, {
  options: props => ({
    variables: {
      id: props.auth.user.id,
    },
  }),
})(PendingTrips);

export default connect(mapStateToProps, matchDispatchToProps)(Pend);

