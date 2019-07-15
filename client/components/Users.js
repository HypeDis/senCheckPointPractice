import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersFromDb } from '../redux/store';
import { Link } from 'react-router-dom';

const Users = props => {
  const { users, getUsers } = props;
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link to={`/profiles/${user.id}`}>
                <p>{user.username}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = state => ({ users: state.users });
const mapDispatch = dispatch => ({
  getUsers: () => {
    dispatch(getUsersFromDb());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Users);
