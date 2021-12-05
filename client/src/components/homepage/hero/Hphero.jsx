import React from 'react'
import {Row, Col} from 'react-bootstrap'
import './hphero.css'
import img from '../../../assests/images/hero.svg'
import {CgArrowRight} from 'react-icons/cg'
import {useNavigate} from 'react-router-dom'
export default function Hphero() {
    const navigate = useNavigate
    const redirect = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    return (
        <Row xs={1} md={2} className="hp-sec d-flex align-items-center" id="hero">
            <Col>
                <div>
                    <h1 className="hero-title">We shorten your long and messy links</h1>
                    <p className="text-muted mb-0">Clean your messy links, make your brand more attractive, and get detailed insights on how your links are performing.</p>
                </div>
                <div className="hero-cta-group"> 
                    <a  href="/register" style={{textDecoration:"none"}} className="hero-cta">Get Started</a>
                    <a  href="/register" style={{textDecoration:"none"}} className="ms-4 hero-cta-lm">Learn More  <CgArrowRight fontSize={24}/></a>
                </div>
            </Col>
            <Col >
                <img src={img} width="85%" height="auto" alt="hero"/>
            </Col>
        </Row>
    )
}
