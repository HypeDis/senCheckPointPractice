import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.userProfile;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProfile = this.updateProfile.bind(this);

    // create throttledUpdate and bind it to the class
    this.throttledUpdate = this.throttle(this.updateProfile, 2000);
    this.throttledUpdate = this.throttledUpdate.bind(this);
  }
  /* 
  NOTE: check the profile model definition to see the use of the getter.
        it converts the timestamp to mm/dd/yyyy notation when fetched from the db.
  */
  updateProfile(profileId) {
    const updateObj = this.state;
    // wait 3 seconds before updating to test the throttle func
    setTimeout(() => {
      axios
        .put(`/api/profiles/${profileId}`, updateObj)
        .then(response => {
          console.log(response.data);
          this.props.history.push(`/profiles/${this.state.userId}`);
        })
        .catch(e => console.error(e));
    }, 3000);
  }

  throttle(func, time) {
    let lastPressed = null;
    // ...args allows multiple args to be passed in
    return (...args) => {
      if (!lastPressed || Date.now() - lastPressed >= time) {
        lastPressed = Date.now();
        return func(...args);
      } else {
        console.log('stop clicking, dumbass');
      }
    };
  }

  // code below does not work because you CANNOT set values inside the class, only class methods.
  // to do it properly we have to set it in the constructor
  // const throttledUpdate = this.throttle(this.updateProfile, 3000)

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // this.updateProfile(this.state.id);
    this.throttledUpdate(this.state.id);
  }

  render() {
    const profile = this.state;
    return (
      <div>
        <p>Username: {profile.user.username}</p>
        <p>Email: {profile.user.email}</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={this.handleChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={this.handleChange}
          />
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="text"
            name="birthday"
            value={profile.birthday}
            onChange={this.handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({ userProfile: state.selectedUser });

export default connect(mapState)(UpdateUser);
