import actionType from '../action-type';

export const addUser = ({id, name, age}) => ({
  type: actionType.user.ADD_USER,
  payload: {
    name,
    age,
    id,
  }
})

export const deleteUser = id => ({
  type: actionType.user.DELETE_USER,
  payload: {
    id,
  }
})