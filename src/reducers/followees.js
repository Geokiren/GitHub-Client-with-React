const followeesReducer = (state = [], action) => {
  switch(action.type) {
    case 'follow':
      action.user.selected = true;
      return [...state, action.user]
    case 'unfollow':
      action.user.selected = false;
      const newArray = state.filter(item => item.id !== action.user.id);
      return newArray;
    default:
      return state;
  }
}

export default followeesReducer;