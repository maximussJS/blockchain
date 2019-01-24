import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = props => {
    return (
       <div>
           <Header className='header'/>
           {props.children}
           <Footer className='footer'/>
       </div>
    )
}

export default Layout