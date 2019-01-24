import React from 'react'
import {Container} from 'reactstrap'


const About = () =>
    <Container className='const-container'>
        <div className='text-center'>
            <h1>
                About
            </h1>
            <p>
                <h2>
                    Usage
                </h2>
                <ul>
                    <li>
                        <h4>
                            Front : React
                        </h4>
                    </li>
                    <li>
                        <h4>
                             Back : Aiohttp
                        </h4>
                    </li>
                    <li>
                        <h4>
                            Database : Postgres
                        </h4>
                    </li>
                    <li>
                        <h4>
                            Transfers are BlockChain's blocks
                        </h4>
                    </li>
                </ul>
            </p>
            <h2>
                This site was written by Max Korsun
            </h2>
            <h2>
                KPI FAM 2019
            </h2>
        </div>
    </Container>


export default About