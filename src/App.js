import React, { Component } from 'react';
// import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

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

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>

        <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Routes>    
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </div>

      </MuiThemeProvider>
    )
  }
}

export default App;
