/* eslint-disable */

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

    // DetailPage 등장할때 실행
    useEffect(() => {
        let timer = setTimeout(()=> {setAlert(false)}, 2000)
        return () => { clearTimeout(timer) }
    }, [alert]) // -> alert 라는 state가 update 할때만 useEffect 실행

    let { id } = useParams()
    let history = useHistory()
    let c_pro = props.product.find(item => item.id == id)

    return (
        <div className="container">
        <Box>
            <Title className='red'>어쩌라고</Title>
            {/* <Title color='blue'>어쩌라고</Title>
            <Title color='blue'>어쩌라고</Title> */}
        </Box>
        
        <input type="text" onChange={(e)=> {setInput(e.target.value)}}/>

        
        <div className="row">
            <div className="col-md-6">
                <img src="https://dongmyounglee.github.io/img/ring01.png" width="90%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{c_pro.title}</h4>
                <p>{c_pro.content}</p>
                <p>{c_pro.price}</p>
                <button className="btn btn-danger">주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    history.goBack()
                }}>뒤로가기</button> 
            </div>
        </div>
    </div>
    )
}

function Info() {
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