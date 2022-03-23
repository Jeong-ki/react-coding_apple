import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React, { useContext, useState, lazy, Suspense } from 'react';
import Data from './data.js';

import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Cart from './Cart';
// import Detail from './Detail';
let Detail = lazy(() => import('./Detail.js'));

export let 재고context = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className='jumbo background'>
            <h1>20% Season Off</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae officia facilis est 
              voluptatibus laudantium inventore animi eveniet temporibus sequi cumque,
            </p>
            <p>
              <Button variant="primary">Show More</Button>
            </p>
          </div>

          <div className='container'>

            <재고context.Provider value={재고}>

            <div className="row">
              {
                shoes.map((shoes, index) => {
                  return <Card shoes={shoes} index={index} key={index} />
                })
              }
            </div>

            </재고context.Provider>

            <button className='btn btn-primary' onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => { 
                console.log(result.data);
                shoes변경([...shoes, ...result.data]);
              })
              .catch(() => { 
                console.log('실패했어요');
              })
            }}>더보기</button>
          </div>
          

        </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Suspense fallback={<div>로딩중임</div>}>
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </Suspense>
          </재고context.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주셈</div>
        </Route>
      </Switch>
      

    </div>
  );
}



function Card({shoes, index}) {
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=> { history.push('/detail/' + shoes.id) }}>
      <img src={`https://codingapple1.github.io/shop/shoes${index+1}.jpg`} width='100%' alt="신발" />
      <h4>{shoes.title}</h4>
      <p>{shoes.content} & {shoes.price}</p>
      <Test />
    </div>
  );
}

function Test() {
  let 재고 = useContext(재고context);

  return <p>재고: {재고[0]}</p>
}

export default App;
