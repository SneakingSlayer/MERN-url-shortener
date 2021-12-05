import React, {useEffect, useRef, useContext, useState} from 'react'
import axios from 'axios'
import {Form, Row, Col, Container} from 'react-bootstrap'
import './auth.css'
import {Context} from '../../context/Context'
import {BASE_URL, config} from '../../globals/globals'
import { useNavigate, Navigate} from 'react-router-dom'
export default function LoginPage() {
    const [error, setError] = useState(false)
    const emailRef = useRef()
    const passRef = useRef()
    const {user, dispatch, isFetching} = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({
            email:emailRef.current.value,
            password: passRef.current.value
            })
        dispatch({type:"LOGIN_START"})
        await axios.post(`${BASE_URL}/auth/signin`, 
            {
            email:emailRef.current.value,
            password: passRef.current.value
            },
            {
            headers:config
            }
        )
        .then(res=> {
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
            setError(false)
            return <Navigate to="/dashboard"/>
        })
        .catch(err =>{
            dispatch({type:"LOGIN_FAILED"})
            setError(true)
            console.log(err)
        })
    }
    useEffect(() => {
        document.title ="Gooly - Sign In" 
    },[]) 

    if(user !== null)
        return <Navigate to="/dashboard"/>
    
    return (
        <>
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="d-flex justify-content-center text-center auth-group">
                <div>
                    <h1><a className="brand" href="/">gooly.</a></h1>
                    <p className="small text-muted">Sign in to your account.</p>
                    {error? <p className="text-danger">Incorrect email/password.</p> : null}
                </div>
                <Col md={10}>
                    <Form onSubmit={handleSubmit} className="text-center">
                        <div className="form-group">
                            <input ref={emailRef} className="form-input" type="email" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <input ref={passRef} className="form-input" type="password" placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                            <button className="form-btn">Sign In</button>
                        </div>
                        <span >Don't have an account? <a href="/register">Sign Up here</a></span>
                    </Form>
                </Col>
            </Row>
        </Container>

        </>
    )
}
