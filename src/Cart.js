import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

function Cart(props) {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            props.state.map((item, index) => {
              return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{props.state[index].name}</td>
                      <td>{props.state[index].quan}</td>
                      <td>@mdo</td>
                    </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

function Tr() {
  return (
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>@mdo</td>
    </tr>
  )
}

function storeData(state) {
  return {
    state : state
  }
}

export default connect(storeData)(Cart)
//export default Cart