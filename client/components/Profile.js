import React, { useEffect } from 'react';
import { getUserProfileFromDb } from '../redux/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = props => {
  const { selectedUser, getUser, match } = props;

  const userId = match.params.userId;
  useEffect(() => {
    getUser(userId);
  }, []);

  console.log(typeof selectedUser.birthday);
  return (
    <div>
      <p>First Name: {selectedUser.firstName}</p>
      <p>Last Name: {selectedUser.lastName}</p>
      <p>Birthday: {selectedUser.birthday}</p>
      <button>
        <Link to={`/profiles/${userId}/update`}>Update</Link>
      </button>
    </div>
  );
};

const mapState = state => ({ selectedUser: state.selectedUser });
const mapDispatch = dispatch => ({
  getUser: userId => {
    dispatch(getUserProfileFromDb(userId));
  },
});

export default connect(
  mapState,
  mapDispatch
)(Profile);
