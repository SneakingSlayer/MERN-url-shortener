import React, {useState, useRef} from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'
import './urlshortener.css'
import axios from 'axios'
import {BASE_URL, config} from '../../../globals/globals'
import { formatDate } from '../../../utils'
import {FaLink} from 'react-icons/fa'
import { isValidURL } from '../../../utils'
export default function Hpurlshortener() {
    const urlRef = useRef()
    const [shortenedURL, setShortenedURL] = useState('')
    const [currentURL, setCurrentURL] = useState('')
    const [expiry, setExpiry] = useState()
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isValidURL(urlRef.current.value)){
            setShortenedURL('')
            setError(true)
            return
        }
            
        if(urlRef.current.value === currentURL){
            return
        }
            
        
        setError(false)    
        try{
            await axios.post(`${BASE_URL}/p`, {url: urlRef.current.value} ,{
                headers:config
            })
            .then(res=> {
                setCurrentURL(urlRef.current.value)
                setShortenedURL(res.data.shortened_url)
                setExpiry(res.data.expiresIn)
            })
            .catch(err => {

            })
        }catch(err){

        }
    } 
    const copyToClipboard = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(shortenedURL)
    }
    return (
        <div className="hp-full" id="shorten">
            <Container className="us-cont">
                <div className="text-center">
                    <h1>Shorten Links</h1>
                    <p>Fill up the field with your URL down below.</p>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row className="d-flex align-items-center">
                        <Col className="pt-2 pd-2" md={10}>
                            <input ref={urlRef} className="hp-input" placeholder="Shorten your Link"/>
                        </Col>
                        <Col className="pt-2 pd-2" md={2}>
                            <button className="hp-btn">Shorten</button>
                        </Col>
                    </Row>
                </Form>
                {error? 
                <div className="d-flex justify-content-center w-100 mt-3">
                    <p className="mb-0 text-center fw-bold" style={{color: "#FF6148", backgroundColor:"#FFEFEB", padding: "1rem 1rem", borderRadius: "15px"}}>This is not a valid URL.</p>
                </div> 
                : null
                }
                {shortenedURL? <div className="pt-2 pd-2 hp-input-wrapper">
                    <input className="hp-input" value={shortenedURL} />
                    <button className="copy-btn" onClick={copyToClipboard}><FaLink/></button>
                    <div className="d-flex justify-content-center w-100">
                        <p className="mt-2 mb-0 text-center fw-bold" style={{color: "#FF6148", backgroundColor:"#FFEFEB", padding: "1rem 1rem", borderRadius: "15px"}}>This URL will expire in {formatDate(expiry)}</p>
                    </div>
                    {/**<a href={shortenedURL} target="_blank">{shortenedURL}</a>*/}
                    
                </div> 
                : null}
            </Container>
        </div>
    )
}
