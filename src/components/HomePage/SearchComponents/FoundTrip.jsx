import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Switch, Route } from 'react-router-dom';
import SearchEntry from './SearchEntry';
import SearchTrip from '../SearchTrip';
import searchTrip  from '../../../actions/searchTripAction';

class FoundTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      trips: [],
    };
  }
  componentWillMount() {
    console.log('these are the props ', this.props)
  }
  componentDidUpdate(prevProps) {
    if (this.props.data.searchTrip && !prevProps.data.searchTrip) {
      console.log('QUERY', this.props.data);
      this.props.searchTrip(this.props.data.searchTrip);
 
    }
  }


  render() {
    console.log('searched at foundtrip', this.props.data)
    console.log('this.props= ', this.props)
   
  
    return (
      <div className="text-center">
      {/* <div>
      <Switch>
        <Route path="/homepage/searchtrip" component={SearchTrip} />
      </Switch>
    </div>  */}
    <div> 
      <h1>Here's what we found:</h1>
      </div>
      <div>
       {
          this.props.search.map((trip, i) => (
            // <div>{trip.title}</div>
            <SearchEntry trip={ trip }/>
            )
          )
        } 
        
      </div>
      {/* <Link to="/homepage/searchtrip" href="/homepage/searchtrip">
            <button >New Search</button>
          </Link> */}
      </div>
    )
  
}
}

function mapStateToProps(state) {
  console.log('state= ', state)
  return {
    auth: state.auth,
    search: state.search,
    found: state.found,
    
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ searchTrip }, dispatch);
}


const foundTrip = gql`
query searchTrip(
  $cost_start: Int,
  $cost_end: Int,
  $date_start: String, 
  $date_end: String, 
  $gender: String, 
  $age: Int,  
  $relationship: String,  

  ){
    searchTrip(
      cost_start: $cost_start,
      cost_end: $cost_end,
      date_start: $date_start, 
      date_end: $date_end,  
      gender: $gender, 
      age: $age, 
      relationship: $relationship, 
     
      ){
        id
        title
        description
        date_start
        date_end
        gender
        age_start
        age_end
        relationship
        cost
        publicId
        trip_status
        users{
          id
          username
          user_type
          gender
          age
        }
      }
}`;

// const searchTrip = gql`
// query searchTrip(
//   $cost_start: Int,
//   $cost_end: Int 
//   $date_start: String, 
//   $date_end: String, 
//   $gender: String, 
//   $age: Int, 
//   $body_type: String, 
//   $relationship: String,  
//   $keys: String){
//     searchTrip(
//       cost_start: $cost_start,
//       cost_end: $cost_end 
//       date_start: $date_start, 
//       date_end: $date_end, 
//       gender: $gender, 
//       age: $age, 
//       body_type: $body_type, 
//       relationship: $relationship,  
//       keys: $keys){
//         id
//         title
//         description
//         cost
//         date_start
//         date_end
//       }
// }`;

const QueriedTrips = graphql(foundTrip,
  {
    options: props => ({
      
      variables: {
        date_start: props.found.dateStart, 
        date_end: props.found.dateEnd,
        cost_start: props.found.costStart || 0,
        cost_end: props.found.costEnd || 10000, 
        gender: props.auth.user.gender, 
        age: props.auth.user.age, 
        relationship: props.auth.user.relationship,  
        
       
      },
    }),
  },
)(FoundTrips);

// const QueriedTrips = graphql(foundTrip,
//   {
//     options: props => {
//       console.log('props at query= ', props.auth)
//       return ({
//       variables: {
//         date_start: props.found.dateStart, 
//         date_end: props.found.dateEnd,
//         cost_start: props.found.costStart || 0,
//         cost_end: props.found.costEnd || 10000, 
//         gender: 'F', 
//         age: 25, 
//         relationship: 'single',  

       
//       },
//     })},
//   },
// )(FoundTrips);

export default connect(mapStateToProps, matchDispatchToProps)(QueriedTrips);
// export default connect(mapStateToProps, matchDispatchToProps)(FoundTrips);
// export default QueriedTrips;
