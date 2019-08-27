import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered successfully...");
    });
};

export const login = user => {
  return axios.post("users/login", {
    email: user.email,
    password: user.password
  });
};

// export const register = newUser => {
//   console.log(newUser.first_name + " registered..");
// };

// export const login = user => {
//   console.log(user.email + " logged in.");
// };
