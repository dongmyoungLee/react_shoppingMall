/* eslint-disable */

import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

let Box = styled.div`
    padding : 20px;
`
let Title = styled.div`
    font-size : 25px;
`

function DetailPage(props) {
    
    let { id } = useParams()
    let history = useHistory()
    let c_pro = props.product.find((item) => {
        return item.id == id
    })

    return (
        <div className="container">
        <Box>
            <Title>어쩌라고</Title>
        </Box>
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

export default DetailPage