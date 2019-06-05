const goods = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_GOODS':
      return [
        ...state,
        payload,
      ];
    case 'DELETE_GOODS':
      return state.filter(goods => goods.id !== payload.id);
    default:
      return state;
  }
}

export default goods;