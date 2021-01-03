import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import {useForm} from '../utils/hooks'

function Login () {
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    })


    //loginUser function name is created by me, we create it here and we need to trigger it in the onSubmit
    // its a mutation you need to give it some variables
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
      update(_, result){
        //   console.log(result)
        history.push('/')
      },
      onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors)
      },
      variables: values
    })

    function loginUserCallback() {
        loginUser()
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
         error={errors.username ? true : false}
         />
     
         <Form.Input
         label="Password"
         placeholder="Password"
         name="password"
         value={values.password}
         onChange={onChange}
         type="password"
         error={errors.password ? true : false}
         />

         <Button type="submit" primary>
         Login
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
// triggers the login mutation
// login  is triggered then we need to get a couple of things back
const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
      login(
        username:$username
        password: $password 
      ) {
          id
          email
          username
          createdAt
          token
      }
  }
`

export default Login;