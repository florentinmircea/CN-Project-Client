import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { AuthInfo, Login } from '@maruware/material-ui-login';
import { useTheme } from '@mui/system';
import MiniDrawer from './components/MiniDrawer';

const App: FC<{}> = props => {
  const [key, setKey] = useState<string | null>(window.sessionStorage.getItem("key"));
  const signIn = async ({ username, password }: AuthInfo) => {
    console.log(username+' '+password)
    window.sessionStorage.setItem("key", password);
    setKey(password);
    // need api call for returning auth token
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {key === null ? 
        <Login
        onSubmit={signIn}
        usernameLabel="Username"
        passwordLabel="Password"
        submitButtonLabel="Log in"
        backgroundColor="#7464bc"
        />: null}
      {key !== null ?
      <MiniDrawer setKey={setKey}/> : null
      }
    </div>
  );
}

export default App;
