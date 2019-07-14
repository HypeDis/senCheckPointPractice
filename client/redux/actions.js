const INCREMENT = 'INCREMENT';
const SET_HEALTH = 'SET_HEALTH';
const SET_COUNT = 'SET_COUNT';

const incrementCount = () => ({
  type: INCREMENT,
});

const setCount = count => ({
  type: SET_COUNT,
  count,
});

const setHealth = health => ({
  type: SET_HEALTH,
  data: health,
});

const getAndSetHealth = () => dispatch => {
  window
    .fetch('/health')
    .then(res => res.json())
    .then(({ message }) => {
      dispatch(setHealth(message));
    })
    .catch(e => console.error(e));
};

const actions = {
  types: {
    INCREMENT,
    SET_HEALTH,
    SET_COUNT,
  },
  creators: {
    incrementCount,
    getAndSetHealth,
    setHealth,
    setCount,
  },
};

export default actions;
