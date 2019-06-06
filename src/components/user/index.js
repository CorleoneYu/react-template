import { connect } from 'react-redux';
import { addUser, deleteUser } from 'actions/user';
import user from './user';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addUser: (user) => dispatch(addUser(user)),
  deleteUser: (userId) => dispatch(deleteUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(user);