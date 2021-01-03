import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'

import {useForm} from '../utils/hooks'


function Register () {
    const history = useHistory()
    const [errors, setErrors] = useState({})


    const { onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        email:''
    })
    //addUser function name is created by me, we create it here and we need to trigger it in the onSubmit
    // its a mutation you need to give it some variables
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
      update(_, result){
        //   console.log(result)
        history.push('/')
      },
      onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors)
      },
      variables: values
    })

    function registerUser() {
        addUser()
    }

    return (
        <div>
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input
         label="Username"
         placeholder="Username"
         name="username"
         value={values.username}
         onChange={onChange}
         type="text"
         />
         <Form.Input
         label="Email"
         placeholder="Email"
         name="email"
         value={values.email}
         onChange={onChange}
         type="email"
         />
         <Form.Input
         label="Password"
         placeholder="Password"
         name="password"
         value={values.password}
         onChange={onChange}
         type="password"
         />
         <Form.Input
         label="Confirm Password"
         placeholder="Confirm Password"
         name="confirmPassword"
         value={values.confirmPassword}
         onChange={onChange}
         type="password"
         />

         <Button type="submit" primary>
         Register
         </Button>
        </Form>
     
        {Object.keys(errors).length > 0 && (
            <div className="ui error message">
            <ul className="list">
            {Object.values(errors).map(value => (
                <li ley={value}>{value}</li>
            ))}
            </ul>
            </div>
        )}

    
        </div>
    )
}

//graphQl mutation
// triggers the register mutation
// register and registerInput is triggered then we need to get a couple of things back
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
      register(
        registerInput: {
        username:$username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        }  
      ) {
          id
          email
          username
          createdAt
          token
      }
  }
`

export default Register;