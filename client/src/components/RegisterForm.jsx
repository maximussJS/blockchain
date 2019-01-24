import React from 'react'
import {Container,Button,Form,FormGroup,Label,Input} from 'reactstrap'

const RegisterForm = ({
    onSubmit,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmChange,
    onAgeChange,
    onCountryChange,
    loading,
    error,
    limit
}) =>
    <Container className='const-container'>
        { loading ? <h1>Loading...</h1> :
            <div>
                <h2 className='text-center headline'>
                   Register , please
                </h2>
                <div className='login-form col-4'>
                <Form>
                   <FormGroup>
                      <Label for="name">
                        Name :
                      </Label>
                   <Input type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          onChange={onNameChange}/>
                   </FormGroup>
                   <FormGroup>
                     <Label for="email">
                         Email :
                     </Label>
                     <Input type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={onEmailChange}/>
                   </FormGroup>
                   <FormGroup>
                      <Label for="password">
                         Password :
                      </Label>
                      <Input type="password"
                             name="password"
                             id="password"
                             placeholder="Enter your password"
                             onChange={onPasswordChange}/>
                   </FormGroup>
                   <FormGroup>
                      <Label for="confirm">
                          Repeat password :
                      </Label>
                      <Input type="password"
                             name="confirm"
                             id="confirm"
                             placeholder="Password"
                             onChange={onConfirmChange}/>
                   </FormGroup>
                   <FormGroup>
                      <Label for="country">
                          Country :
                      </Label>
                      <Input type="text"
                             name="country"
                             id="country"
                             placeholder="Enter your country"
                             onChange={onCountryChange}/>
                   </FormGroup>
                   <FormGroup>
                       <Label for="age">
                           Chose your age :
                       </Label>
                       <Input type="select"
                              name="select"
                              id="age"
                              onChange={onAgeChange}>
                          {limit ? limit.map((key, i) => <option>{limit[i]}</option> ) : ''}
                       </Input>
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


export default RegisterForm