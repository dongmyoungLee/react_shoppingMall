
/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'


function Cart(props) {

  let selectorHook = useSelector((state) => state.reducer)
  let dispatchHook = useDispatch()
  

  // let [count, setCount] = useState(0);
  // let [age, setAge] = useState(20);

  // useEffect(() => {
  //   if(count != 0 && count < 3) {
  //     setAge(age + 1)
  //   }
  // }, [count])
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
            selectorHook.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quan}</td>
                  <td><button onClick={() => {
                    dispatchHook({
                      type : 'quanPlus',
                      payload : index
                    })
                  }}>+</button>
                  <button onClick={() => {
                    dispatchHook({
                      type : 'quanMinus',
                      payload : index
                    })
                  }}>-</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {
        props.alertOpen === true
        ? (<div className="my-alert2">
            <p>지금 구매하시면 신규 할인 20%</p>
            <button onClick={() => {
              dispatchHook({
                type : 'false'
              })
            }}>닫기</button>
          </div>)
        : null 
      }
      
      {
      // state 의 async 와 sync
      /* <div>
        <div>버튼 클릭 수 {count} </div>
        <div>안녕하십니까 전 {age} </div>
        <button onClick={() => {
          setCount(count + 1)
      
        }}>누르면한살먹기</button>
      </div> */}
    </div>
  )
}



// function storeData(state) {
//   return {
//     stateData : state.reducer,
//     alertOpen : state.reducer2
//   }
// }

// export default connect(storeData)(Cart)
export default Cart