import React from 'react'
import {Container,Button,Form,FormGroup,Label,Input} from 'reactstrap'

const LoginForm = ({
    onSubmit,
    onPasswordChange,
    onEmailChange,
    error,
    loading
}) =>
    <Container className='const-container'>
        {loading ? <h1>Loading...</h1> :
        <div>
            <h2 className='text-center headline'>
                Log in , please
            </h2>
            <div className='login-form col-4'>
                <Form>
                   <FormGroup>
                       <Label for="email">
                           Email :
                       </Label>
                       <Input type="email"
                              name="email"
                              id="email"
                              placeholder="Input your email"
                              onChange={onEmailChange}/>
                   </FormGroup>
                   <FormGroup>
                       <Label for="password">
                           Password :
                       </Label>
                       <Input type="password"
                              name="password"
                              id="password"
                              placeholder="Input your password"
                              onChange={onPasswordChange}/>
                   </FormGroup>
                    {error ? <span className='text-center red'>{error}</span> : ''}
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


export default LoginForm