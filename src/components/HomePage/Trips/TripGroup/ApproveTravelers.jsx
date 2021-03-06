import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';
import updateTravelers from '../../../../actions/tripTravelerUpdateAction';

class ApproveTrav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      decision: ""
    };

    this.checkCreator = this.checkCreator.bind(this);
    this.updateUserTripStatus = this.updateUserTripStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('nameee',event.target.name);
    console.log('appproval', event.target.value);
    const target = event.target;
    const value = target.value
    const name = target.name;

    this.setState({
      [name]: value,
    });

    // if (event.target.name === 'user') {
      //when selected display user info
    // }
  }

  updateUserTripStatus() {
    let travelersup = {};
    console.log('stateeeee', this.state);
    console.log('tripppp', this.props.showtrip);

    this.props.mutate({
      variables: { userId: this.state.user, tripId: this.props.showtrip.id, user_type: this.state.decision },
    })
      .then(({ data }) => {
        travelersup = {
          trips: this.props.mytrips,
          id: this.props.showtrip.id,
          users: data.updateUserRelationshipToTrip.users,
        };
        this.props.updateTravelers(travelersup);
        this.props.tripTravelers(data.updateUserRelationshipToTrip.users);
        this.props.tripInterested(data.updateUserRelationshipToTrip.users);
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });

  }

  checkCreator() {
    let showInterestedUsers;
    if (this.props.creator.id === this.props.auth.user.id) {
      showInterestedUsers = (
        <div>
          <form>
            <div className="d-flex flex-column" id="search-bar">
              <h2>Interested Users: </h2>
              <div>
                <select name="user" onChange={this.handleChange}>
                  <option defaultValue value="Users">Users</option>
                  {this.props.tripint.map( user =>
                    (<option key={user.id} value={user.id}>
                      {user.username}</option>))}
                </select>
              </div>
              <div>
                <select name="decision" onChange={this.handleChange}>
                  <option defaultValue value="Choose">Choose...</option>
                  <option value="J">Approve</option>
                  <option value="D">Decline</option>
                </select>
              </div>
            </div>
          </form>
          <button onClick={this.updateUserTripStatus}>Submit</button>
        </div>);
    }
    return showInterestedUsers;
  }

  render() {
    return (
      <div>
        {this.checkCreator()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    mytrips: state.mytrips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

const interestedInATrip = gql`
mutation updateUserRelationshipToTrip($userId: Int!, $tripId: Int!, $user_type: String!) {
  updateUserRelationshipToTrip(userId: $userId, tripId: $tripId, user_type: $user_type) {
      id
      title
      users {
        id
        username
        user_type
      }
  }
}
`;

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    tripTravelers, tripInterested, updateTravelers,
  }, dispatch);
}

const Approve = graphql(interestedInATrip)(ApproveTrav);

export default connect(mapStateToProps, matchDispatchToProps)(Approve);
