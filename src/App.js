/* eslint-disable */

import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import './App.css';
import Data from './data.js'
import DetailPage from './Detail.js'
import axios from 'axios'

import { Link, Route, Switch} from 'react-router-dom'


function App() {

  let [product, product변경] = useState(Data)
  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/">Jewelry-Shop</Link></Navbar.Brand>
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
        <JumboTron></JumboTron>
        <div className="container">
          <div className="row">
            {
              product.map((item, index) => {
                return (
                  <ProductDetail product={product[index]} i={index} key={index}></ProductDetail>
                )
              })
            }
          </div>


          <button className='btn btn-primary' onClick={() => {
            
            //서버로 데이터 보내기
            // axios.post('서버 url', {id : 'papa', pw : 1234})

            axios.get('https://dongmyounglee.github.io/data/data2.json')
            .then((result) => {
              result.data.map((item, index) => {
                product변경([...product, ...result.data])
              })
            })
            .catch(() => {
              console.log('실패')
            })
          }}>더보기</button>
        </div>
      </Route>

      <Route path="/detail/:id">
        <DetailPage product={product}></DetailPage>
      </Route>

      <Route path="/:id">
        <div>아무거나 적음</div>
      </Route>
      
    </Switch>

    </div>    
  )
}

function ProductDetail(props) {
  return (
    <div className="col-md-4 product">
      <div className="product_wrap">
        <img src={'https://dongmyounglee.github.io/img/ring0' + (props.i+1) + '.png'} width="90%" />
        <h4 className="title">{props.product.title}</h4>
        <p>{props.product.content}</p>
        <h4 className="price">{props.product.price}</h4>
      </div>      
    </div>
  )
}

function JumboTron() {
  return (
    <div className="jumbotron">
      <div className='jumbo_wrap'>
        <h1>10% Season Off</h1>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
    </div>
  )
}



export default App;
