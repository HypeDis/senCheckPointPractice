import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import redux from '../../redux/index';

const {
  actions: {
    creators: { incrementCount, getAndSetHealth, setCount: acSetCount },
  },
} = redux;

class Index extends Component {
  componentDidMount() {
    console.log(this.props);
    const {
      match: {
        params: { count: currentCount },
      },
      setCount,
      getHealth,
    } = this.props;

    const parsedCount = parseInt(currentCount);

    getHealth();
    if (!isNaN(parsedCount)) setCount(parsedCount);
  }

  render() {
    const { health, count, incCount } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.circle} onClick={() => incCount(count)}>
          <span>{health}</span>
          <span>{count}</span>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  getHealth: PropTypes.func.isRequired,
  incCount: PropTypes.func.isRequired,
  health: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      count: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  count: state.count,
  health: state.health,
});
const mapDispatchToProps = (dispatch, { history: { push } }) => ({
  incCount: c => {
    push(`/${c + 1}`);
    return dispatch(incrementCount());
  },
  getHealth: () => dispatch(getAndSetHealth()),
  setCount: c => {
    push(`/${c}`);
    return dispatch(acSetCount(c));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Index),
);
