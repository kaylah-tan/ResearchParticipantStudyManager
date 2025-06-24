export const logout = (navigate: (path: string) => void) => {

  //logout function removes auth token from local storage and redirects to login page
  // you need to pass the navigate function from react-router-dom to this function
  // (see RoleSelection.tsx for an example of how to do this)
  localStorage.removeItem("authToken");
  navigate("/");
};
