import React from 'react'
import Hpcard from '../card/Hpcard'
import {Row} from 'react-bootstrap'
import {IoSparklesSharp, IoRocket} from 'react-icons/io5'
import {FaChartLine} from 'react-icons/fa'
import './innercontent.css'
export default function Hpinnercontent() {
    const cardContent = [
        {
            title: "Clean up your brand",
            description: "Make your brand more appealing to the eyes of the consumers by shortening it using URL shortener.",
            icon: <IoSparklesSharp color="#FF6148" fontSize={40}/>
        },
        {
            title: "Boost your results",
            description: "Shortening your URLs will boost your links performace as it will make it more appealing.",
            icon: <IoRocket color="#FF6148" fontSize={40}/>
        },
        {
            title: "Monitor your links",
            description: "Track and analyze your links performance by signing up and shorteinig your URLs.",
            icon: <FaChartLine color="#FF6148" fontSize={40}/>
        }
    ]

    return (
        <div className="hp-sec" id="about">
            <h1 className="fw-bold hp-title">Our Services</h1>
            <Row  xs={1} md={3} className="g-4">
            {
                cardContent.map(content => 
                <Hpcard title={content.title} description={content.description} icon={content.icon}/> 
                )
            }
            </Row>
        </div>
    )
}
