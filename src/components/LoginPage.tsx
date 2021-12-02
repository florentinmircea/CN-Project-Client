import { AuthInfo, Login } from "@maruware/material-ui-login";
import { Button } from "@mui/material";
import React, {FC} from "react"

const LoginPage: FC<{}> = props => {
  const signIn = async ({ username, password }: AuthInfo) => {
    console.log(username+' '+password)
    // const client = new ApiClient(false)
    // client
    //   .login({ username, password })
    //   .then((data) => {
    //     console.log('success')
    //   })
    //   .catch(() => {
    //     console.log('failed')
    //   })
  }
  return (
  <Login
    onSubmit={signIn}
    usernameLabel="User ID" // default: User name
    passwordLabel="Your Password" // default: Password
    submitButtonLabel="Sign in" // default: Sign in
    backgroundColor="#ff0000" // default: blueGrey[800]
  />
  );
};

export default LoginPage;
