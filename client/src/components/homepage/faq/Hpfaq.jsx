import React from 'react'
import { Accordion } from 'react-bootstrap'
export default function Hpfaq() {
    return (
        <div className="hp-sec pt-0" id="faq">
            <h1 className="hp-title fw-bold">Frequently Asked Questions</h1>
            <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What is a URL Shortener?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                    URL shortening is a technique that uses a shorter URL or IP address to redirect to the same website as the longer one. URL shortening makes use of the HTTP diversion method, which works with different URL accessibility for explicit Web sites.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>What are the benfits of URL shortening?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                    Most of your audience is undoubtedly used to seeing material shared in the form of subtly reduced links. Because this method is so common, they may be able to detect if you share a URL that hasn't been compressed, for all intents and purposes demonstrating how for all intents and purposes your audience is probably used to seeing content shared in the form of shortened links, which is significant. 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>What are gooly's features?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                    URL shortening and link monitoring
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>How does URL shortener work?</Accordion.Header>
                    <Accordion.Body className="text-muted small">
                    The URL shortener service makes use of the URL redirect function, which is a standard web server function. Your short URL will be redirected to your original URL (i.e long URL). It makes an HTTP request to the web server, which is then sent to the original page.
                    </Accordion.Body>
                </Accordion.Item>
 
            </Accordion>
        </div>
    )
}
