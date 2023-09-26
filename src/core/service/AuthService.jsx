import axios from "axios"

export const SignIn = (email, password) => {
    return axios.post(
        "https://cugusainventory.onrender.com/api/superAdmin/signin",
        {
          email,
          password,
        }
      );
}

export const Logout = () => {
    localStorage.removeItem("token")
}