const user = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          id: payload.id,
          name: payload.name,
          age: payload.age
        }
      ];
    case 'DELETE_USER':
      return state.filter(user => user.id !== payload.id);
    default:
      return state;
  }
}

export default user;