import acionType from '../action-type';

export const addUser = ({userId, name, age}) => ({
  type: acionType.ADD_USER,
  payload: {
    name,
    age,
    id: userId,
  }
})

export const deleteUser = userId => ({
  type: actionType.DELETE_USER,
  payload: {
    id: userId
  }
})