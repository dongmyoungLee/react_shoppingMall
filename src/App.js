/* eslint-disable */

import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import ringImg00 from './ring01.png'
import ringImg01 from'./ring02.png'
import ringImg02 from'./ring03.png'
import './App.css';
import Data from './data.js'

function App() {

  let [product, product변경] = useState(Data)
  let [total, setTotal] = useState(0)
  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Jewelry-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
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
      </div>

    </div>
    
  )
}

function ProductDetail(props) {
  return (
    <div className="col-md-4">
            {
              console.log(props.product.img)
            }
            <img src={props.product.img} width="90%" />
            <h4>{props.product.title}</h4>
            <p>{props.product.content}</p>
            <h4>{props.product.price}</h4>
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
