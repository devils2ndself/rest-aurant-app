import './App.css';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import About from './About.js';
import NotFound from './NotFound.js';
import Restaurants from './Restaurants.js';
import Restaurant from './Restaurant.js';

function App() {

  let history = useHistory();
  const [searchString, setSearchString] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  }  

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>RESTaurantApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString}
            onChange={(e) => setSearchString(e.target.value)} />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" render={()=>(<Redirect to="/restaurants" />)} />
              <Route exact path="/about" render={()=>(<About />)} />
              <Route exact path="/restaurants" render={(props)=>(<Restaurants query={props.location.search} />)} />
              <Route path="/restaurant/:id" render={(props)=>(<Restaurant id={props.match.params.id} />)} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default App;
