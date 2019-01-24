import React from 'react'
import {Button,Container,Form,FormGroup,Input,Label} from 'reactstrap'

const TransferForm = ({
   onSubmit,
   onWhomChange,
   onAmountChange,
   balance,
   error,
   loading
}) =>
    <Container className='const-container'>
        {loading ? <h1>Loading...</h1> :
        <div>
            <h2 className='text-center headline'>
                New Transfer
            </h2>
            <div className='transfer-form col-4'>
                <Form>
                   <FormGroup>
                       <Label for="whom">
                           Destination person
                       </Label>
                       <Input type="text"
                              name="whom"
                              id="whom"
                              placeholder="Input destination email"
                              onChange={onWhomChange}/>
                   </FormGroup>
                   <FormGroup>
                       <Label for="amount">
                           Amount
                       </Label>
                       <Input type="text"
                              name="amount"
                              id="amount"
                              placeholder="Input amount of money"
                              onChange={onAmountChange}/>
                   </FormGroup>
                   <span> Your balance : {balance} $</span>
                    <hr/>
                   {error ? <span className='red'>{error}</span> : ''}
                    <div>
                       <Button onClick={onSubmit}
                               disabled={loading}>
                          Submit
                       </Button>
                    </div>
                </Form>
            </div>
        </div>
        }
    </Container>

export default TransferForm