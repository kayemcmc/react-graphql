import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import { Container } from 'semantic-ui-react'
import Home from './pages/home.js'
import Login from './pages/login.js'
import Register from './pages/register.js'
import MenuBar from './components/menu.js'

function App() {
  return (
   <Router>
   <MenuBar />
   <Container>
   <Route exact path="/" component={Home} />
   <Route exact path="/login" component={Login} />
   <Route exact path="/register" component={Register} />
   </Container>
   </Router>
  );
}

export default App