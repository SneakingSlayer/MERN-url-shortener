import React from 'react'
import {Col, Card} from 'react-bootstrap'
import {CgArrowRight} from 'react-icons/cg'
import './card.css'
export default function Hpcard(props) {
   
    return (
        <Col>
            <Card className="hp-card">
                <Card.Body>
                    <div className="card-icon">
                       {props.icon}
                    </div>
                    <Card.Title className="fw-bold mt-3">{props.title}</Card.Title>
                    <Card.Text className="text-muted">
                        {props.description}
                    </Card.Text>
                    <a style={{textDecoration:"none"}} href="/register" className="d-flex align-items-center fw-bold card-cta">Get Started &nbsp; <CgArrowRight fontSize={24}/> </a>
                </Card.Body>
            </Card>
        </Col>
    )
}
