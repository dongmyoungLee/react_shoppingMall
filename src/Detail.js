/* eslint-disable */

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss'
import {ItemContext} from './App.js'
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

let Box = styled.div`
    padding : 20px;
`
let Title = styled.h4`
    font-size : 25px;
    color : ${ props => props.color }
`



function DetailPage(props) {
    
    let [alert, setAlert] = useState(true)
    let [soldOut, setSoldOut] = useState(true)
    // 다른 js 파일로 useContext 실행한 테스트
    let testItem = useContext(ItemContext)

    let [tap, setTap] = useState(0)
    let [swicthBtn, setSwicthBtn] = useState(false)
    let [storageItem, setStorageItem] = useState(JSON.parse(localStorage.getItem('watched')))
    

    // DetailPage 등장할때 실행
    useEffect(() => {

        // axios.get() -> DetailPage 가 등장했을때 ajax 요청
        // 끝에 빈 대괄호 써줘야함.

        let timer = setTimeout(()=> {setAlert(false)}, 2000)
        return () => { clearTimeout(timer) }
    }, [alert]) // -> alert 라는 state가 update 할때만 useEffect 실행

    useEffect(() => {
      let arr = localStorage.getItem('watched')
      if (arr === null) {
        arr = []
      } else {
        arr = JSON.parse(arr)
      }
      arr.push(id)
      arr = new Set(arr)
      arr = [...arr]

      localStorage.setItem('watched', JSON.stringify(arr))
    }, [])


    let { id } = useParams()
    let history = useHistory()
    let c_pro = props.product.find(item => item.id == id)
    
    return (
        <div className="container">
        <Box>
            <Title className='red'>제품 상세</Title>
            {/* <Title color='blue'>제품 상세</Title>
            <Title color='blue'>제품 상세</Title> */}
        </Box>

        {
            alert === true
            ? <InfoMessage></InfoMessage>
            : null
            
        }
        
        <div className="row">
            <div className="col-md-6">
                <img src={"https://dongmyounglee.github.io/img/ring0"+ (c_pro.id+1) +".png"} width="90%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{c_pro.title}</h4>
                <p>{c_pro.content}</p>
                <p>가격 : {c_pro.price}</p>

                {
                    soldOut === true
                    ? <Info item={props.item[c_pro.id]}></Info>
                    : <SoldOut></SoldOut>
                }
                
                <button className="btn btn-danger" onClick={() => {
                    // console.log(testItem)
                    let copy1 = []
                    props.item.map(x => {
                        copy1.push(x - 1)
                    })
                    if (props.item[c_pro.id] === 1) {
                        setSoldOut(false)
                    }
                    
                    props.setItem(copy1)

                    props.dispatch({
                        type : 'cartAdd',
                        payload : {id : c_pro.id, name : c_pro.title, quan : 1}
                    })
                    history.push('/cart')
                }}>장바구니담기</button> 
                <button className="btn btn-danger" onClick={() => {
                    history.push('/')
                }}>뒤로가기</button>
                <div style={{marginTop : '20px', cursor : 'pointer'}}>
                  <p>최근 본 상품이 아래에 표시 됩니다.</p>
                  {
                    storageItem === null
                    ? null
                    : storageItem.map((item, index) => {
                          return (
                            <div key={index} onClick={() => {
                              history.push(item)
                            }}>
                              <img style={{width : '50px'}} src={'https://dongmyounglee.github.io/img/ring0' + (Number(item)+1) + '.png'}></img>
                              <div>{props.product[item].title}</div>
                            </div>
                          ) 
                        })
                      }  
                </div>
            </div>
            
        </div>
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={() => {
                setSwicthBtn(false)
                setTap(0)
              }}>상품설명</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={() => {
                setSwicthBtn(false)
                setTap(1)
              }}>배송정보</Nav.Link>
          </Nav.Item>
        </Nav> 
        
        <CSSTransition in={swicthBtn} classNames="wow" timeout={500}>
          <TapContent tap={tap} setSwicthBtn={setSwicthBtn}/>
        </CSSTransition>
        
    </div>
    )   
}

function TapContent(props) {
  
  useEffect(() => {
    props.setSwicthBtn(true)
  })

  if (props.tap === 0) {
    return <div>0번째 내용</div>
  } else if (props.tap === 1) {
    return <div>1번째 내용</div>
  } else if (props.tap === 2) {
    return <div>2번째 내용</div>
  }
}

function Info(props) {
    return (
        <p>재고 : {props.item} 개</p>
    )
}

function SoldOut() {
    return (
        <p>품절 입니다.</p>
    )
}

function InfoMessage() {
    return (
        <div className="my-alert">
            <p>즉시 출고 가능 재고 2 개 남았습니다.</p>
        </div>
    )
}

// class DetailPage2 extends React.Component {
    
//     // 렌더링 될때
//     componentDidMount() {

//     }

//     // 사라질 때
//     componentWillUnmount() {

//     }
// }


function storeData(state) {
    return {
      stateData : state.reducer,
      alertOpen : state.reducer2
    }
  }
  
export default connect(storeData)(DetailPage)