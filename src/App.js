import React, { Component, Fragment } from 'react';
// import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import themeFile from './utils/theme';
import AuthRoute from './utils/authRoute';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
// import store from './redux/store';

//MUI Imports
import { MuiThemeProvider, createTheme } from '@material-ui/core';

// Components
import Navbar from './components/Navbar';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route path="/" component={home} />
//           <Route path="/login" component={login} />
//           <Route path="/signup" component={signup} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

const theme = createTheme(themeFile);

let authenticated;
const token = localStorage.getItem('token');
if(token){
  const decodedToken = jwtDecode(token);
  console.log('decodedToken', decodedToken);
  if((decodedToken.expiryDate * 1000) < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }
}


class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>

        {/* <Provider store={store}> */}
          <div className="App">
          <Router>
            <Fragment>
            <Navbar/>
            <div className="container">
              <Routes>  
                {/* <Route exact path="/" element={<AuthRoute/>}>
                </Route>   */}
                <Route exact path="/" element={<Home/>} /> 
                <Route exact path="/login" element={<Login/>}  />
                <Route exact path="/signup" element={<Signup/>}  />
              </Routes>
            </div>
            </Fragment>
          </Router>
        </div>
        
        {/* </Provider> */}

      </MuiThemeProvider>
    )
  }
}

export default App;
