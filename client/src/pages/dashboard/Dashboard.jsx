import React, {useEffect, useState} from 'react'
import Upnavbar from '../../components/userpage/navbar/Upnavbar'
import { Container, Row, Col,Card} from 'react-bootstrap'
import axios from 'axios'
import {BASE_URL} from '../../globals/globals'
import {AiOutlineRise, AiOutlineFall} from 'react-icons/ai'
import {CgArrowsExpandLeft} from 'react-icons/cg'
import {HiPlus, HiMinus} from 'react-icons/hi'
import { formatDate } from '../../utils'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

export default function Dashboard() {
    const [URLs, setURLs] = useState([])
    const {firstname} = JSON.parse(localStorage.getItem('user'))
    const {id} = JSON.parse(localStorage.getItem('user'))
    const {token} = JSON.parse(localStorage.getItem('user'))
    const [loading, setLoading] = useState(false)
    const config =  {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    const fetchURLs = async () => {
        setLoading(true)
        await axios.get(`${BASE_URL}/api/user/${id}`, {
            headers:config
        })
        .then(res=> {
           setURLs(res.data)
           setLoading(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const getTopViews = () => {
        if(URLs.length === 0)
            return
        if(URLs.length !== 0){
            const topValue = Math.max.apply(Math, URLs.map((data) => { 
                return data.view_count; 
            }))
            let temp = 0
            const total = URLs.map(data => {
                temp = temp + parseInt(data.view_count)
            })
            const pct = (((topValue/temp)*100).toFixed(2)).toString() + "%"
            return {
                value: topValue,
                pct: topValue === 0? "0%" : pct
            }
        }
    }
    const getLowestViews = () => {
        if(URLs.length === 0)
            return
        if(URLs.length !== 0){
            const lowestValue = Math.min.apply(Math, URLs.map((data) => { 
                return data.view_count; 
            }))
            let temp = 0
            const total = URLs.map(data => {
                temp = temp + parseInt(data.view_count)
            })
            const pct = (((lowestValue/temp)*100).toFixed(2)).toString() + "%"
            return {
                value: lowestValue,
                pct: lowestValue === 0? "0%" : pct
            }
        }
    }
    const getAverageViews = () => {
        if(URLs.length === 0)
            return
        if(URLs.length !== 0){
            let temp = 0
            const total = URLs.map(data => {
                temp = temp + parseInt(data.view_count)
            })
            const average = Math.round(temp/URLs.length)
            const pct = (((average/temp)*100).toFixed(2)).toString() + "%"
            return {
                value: average,
                pct: average === 0? "0%" : pct
            }
        }
    }
    const getTotalViews = () => {
        if(URLs.length === 0)
            return
        if(URLs.length !== 0){
            let temp = 0;
            const total = URLs.map(data => temp = temp + parseInt(data.view_count)) 
            return {
                value: temp,
                pct: "100%"
            }
        }
    }

    const getLabel = () => {
        if(URLs.length === 0)
            return
        if(URLs.length > 0){
            const slice = URLs.slice(0, 30)
            const labels = slice.reverse().map((url) => formatDate(url.date_created))
            return labels
        }
            
    }

    const getData = () => {
        if(URLs.length === 0)
            return
        if(URLs.length > 0){
            const slice = URLs.slice(0, 30)
            const data = slice.reverse().map((url) => parseInt(url.view_count))
            return data
        }
    }

  

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
    const options = {
        responsive: true,
        scales: {
            x: {
                grid:{
                 display:false
                     }
               },
            y: 
               {
             grid:{
              display:true,
              borderDash: [8, 4]
                  }
               }
                   },
        plugins: {
          legend: {
              display: false,
            position: 'top',
          },
        title: {
            display:false,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
    const labels = getLabel()
      
     const data = {
        labels,
        datasets: [
          {
            label: 'View count(s)',
            data: getData(),
            backgroundColor: ['#FF6148', '#323B45'],
          },
        ],
      };
      
    useEffect(() => {
        document.title ="Gooly - Dashboard" 
        fetchURLs()
    },[]) 
    return (
        <>
            <Upnavbar/>
            <Container>
                <Row>
                    <Col md={12} className="mt-4 mb-2">
                        <h2 className="fw-bold hero-title">Welcome back, {firstname}!</h2>
                        <p className="text-muted small">Delighted to see you here again, see what's going on.</p>
                    </Col>
                       
                </Row>
              <Row xs={1} md={4} className="g-4">
                <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-center" xs={4} md={4}>
                                        <div>
                                            <HiPlus color="#FF6148" fontSize={30}/>
                                        </div>
                                        
                                    </Col>   
                                    {URLs.length === 0? 

                                    <Col xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Total views</p>
                                        <h4 className="fw-bold">0 views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}} >0%</h6>
                                    </Col> 
                                    
                                    : 
                                    <Col xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Total views</p>
                                        <h4 className="fw-bold">{getTotalViews().value} views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}} >{getTotalViews().pct}</h6>
                                    </Col> 
                                    }  
                                </Row>
                                
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-center" xs={4} md={4}>
                                        <div>
                                            <AiOutlineRise color="#FF6148" fontSize={32}/>
                                        </div>
                                        
                                    </Col>   
                                    {URLs.length === 0?
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Highest views</p>
                                        <h4 className="fw-bold">0 views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}} >0%</h6>
                                    </Col> 
                                    : 
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Highest views</p>
                                        <h4 className="fw-bold">{getTopViews().value} views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}} >{getTopViews().pct}</h6>
                                    </Col> 
                                    }
                                </Row>
                                
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-center"  xs={4} md={4}>
                                        <div>
                                            <CgArrowsExpandLeft color="#FF6148" fontSize={28}/>
                                        </div>
                                    </Col>
                                    {URLs.length === 0?
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Average views</p>
                                        <h4 className="fw-bold">0 views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}}>0%</h6>
                                    </Col>
                                    :
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Average views</p>
                                        <h4 className="fw-bold">{getAverageViews().value} views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}}>{getAverageViews().pct}</h6>
                                    </Col>
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex align-items-center justify-content-center"  xs={4} md={4}>
                                        <div >
                                            <HiMinus color="#FF6148" fontSize={32}/>
                                        </div>
                                    </Col>
                                    {URLs.length === 0? 
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Lowest views</p>
                                        <h4 className="fw-bold">0 views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}}>0%</h6>
                                    </Col>
                                    : 
                                    <Col  xs={8} md={8}>
                                        <p className="mb-2 text-muted small">Lowest views</p>
                                        <h4 className="fw-bold">{getLowestViews().value} views</h4>
                                        <h6 className="fw-bold" style={{color: "#FF6148"}}>{getLowestViews().pct}</h6>
                                    </Col>
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                            <Row>
                                <Col className="d-flex justify-content-between align-items-center pb-4" md={12}>
                                    <div>
                                        <h2 className="fw-bold hero-title mb-0">Overview</h2>
                                        <p className="mb-0 small text-muted">As of {formatDate(Date.now())}</p>
                                    </div>
                                    <p className="mb-0 text-muted small">Last 30 days</p>
                                </Col>
                                <Col md={12}>
                                    <Bar options={options} data={data} />
                                </Col>
                            </Row>
                    </Col>
                </Row>
            
            </Container>
        </>
    )
}
