const initState = {
  currentUser: {},
  allUsers: [],
};
const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload.current,
      };
    case "FETCH_USERS":
      return { ...state };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;
