/* eslint-disable */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss'


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

    // DetailPage 등장할때 실행
    useEffect(() => {

        // axios.get() -> DetailPage 가 등장했을때 ajax 요청
        // 끝에 빈 대괄호 써줘야함.

        let timer = setTimeout(()=> {setAlert(false)}, 2000)
        return () => { clearTimeout(timer) }
    }, [alert]) // -> alert 라는 state가 update 할때만 useEffect 실행

    let { id } = useParams()
    let history = useHistory()
    console.log(props.product)
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
                    ? <Info item={props.item}></Info>
                    : <SoldOut></SoldOut>
                }
                
                <button className="btn btn-danger" onClick={() => {
                   let copy = props.item
                   copy = copy - 1
                   props.setItem(copy)

                   if (copy === 0) {
                        setSoldOut(false)
                   }
                }}>주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    history.push('/')
                }}>뒤로가기</button> 
                
            </div>
        </div>
    </div>
    )
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



export default DetailPage