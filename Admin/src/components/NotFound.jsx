import React from "react";
import notFound from '../Assets/Images/404notFound2.png'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <img src={notFound} style={{ maxWidth: '567px', margin: '0 auto', display: 'block' }} className="not-found-child" />
        </div>
    )
}

export default NotFound