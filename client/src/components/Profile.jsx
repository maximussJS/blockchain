import React from 'react'
import {Form,Container,FormGroup,Label,Input,Button} from 'reactstrap'


const Profile = ({
    onSubmit,
    onNameChange,
    onEmailChange,
    onAgeChange,
    onCountryChange,
    onDelete,
    loading,
    name,
    email,
    age,
    country,
    balance,
    keyword,
    limit,
    error
}) =>
    <Container className='const-container'>
        { loading ? <h1>Loading...</h1> :
            <div>
                <h2 className='text-center headline'>
                   Here you can change your profile info
                </h2>
                <div className='login-form col-6'>
                <Form>
                    <h4 className='text-center'>
                        Your personal key (Didn't share your key) :
                    </h4>
                    <hr/>
                    <h4 className='text-center'>
                        {keyword}
                    </h4>
                    <hr/>
                    <br/>
                    <h4 className='text-center'>
                        Your balance : {balance} $
                    </h4>
                    <br/>
                   <FormGroup>
                      <Label for="name">
                        Change name :
                      </Label>
                   <Input type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={onNameChange}/>
                   </FormGroup>
                   <FormGroup>
                     <Label for="email">
                         Change email :
                     </Label>
                     <Input type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={onEmailChange}/>
                   </FormGroup>
                   <FormGroup>
                      <Label for="country">
                          Change country :
                      </Label>
                      <Input type="text"
                             name="country"
                             id="country"
                             placeholder="Enter your country"
                             value={country}
                             onChange={onCountryChange}/>
                   </FormGroup>
                   <FormGroup>
                       <Label for="age">
                           Change age :
                       </Label>
                       <Input type="select"
                              name="select"
                              id="age"
                              onChange={onAgeChange}
                              value={age}>
                          {limit ? limit.map((key, i) => <option>{limit[i]}</option> ) : ''}
                       </Input>
                   </FormGroup>
                    {error ? <span className='text-center red'>{error} </span> : '' }
                    <div>
                   <Button onClick={onSubmit}
                           disabled={loading}>
                       Save changes
                   </Button>
                    <Button className='button-2'
                            onClick={onDelete}
                            disabled={loading}>
                        Delete your account
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
        }
    </Container>


export default Profile