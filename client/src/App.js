import { Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

//components
import Header from './components/header/Header';
import Home from './components/home/Home';
import DetailView from './components/details/DetailView';
import CreatePost from './components/create/CreatePost';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/login/login';
import Register from './components/register/register';


//var nnname = null;

function App() {
  const [user, setLoginUser] = useState({});
  //nnname=user.name;
  for (let value of Object.values(setLoginUser)) {
    var nnname = value;
    break;
  }

  return (
    <BrowserRouter>
      <Header />
      <Box style={{ marginTop: 64 }}>
        <Switch>
          <Route exact path='/' component={Home}>
            {
              user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
            }
          </Route>

          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route exact path='/details/:id' component={DetailView} />
          <Route exact path='/create' component={CreatePost} >
          {
              user && user._id ? <CreatePost setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
          }
          </Route>

          <Route exact path='/update/:id' component={Update} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}
//export { nnname };
export default App;
