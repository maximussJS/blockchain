import React from 'react'
import {Container} from "reactstrap";


const Balance = ({
    loading,
    error,
    balance
}) =>
    <Container className='const-container'>
        {loading ? <h1>Loading...</h1> :
            <div className='text-center balance'>
                <h1>
                    You have {balance} $
                </h1>
            </div>
        }
        {error ? <span>{error}</span> : ''}
    </Container>

export default Balance