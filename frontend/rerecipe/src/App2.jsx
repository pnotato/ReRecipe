import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import logo from './assets/logo.png'

import './App2.css'

function App2() {
    return (
        <>
        <div className="top-right-text">
        </div>
        <div className="dividers">
            <div className="divider small-divider" style={{ paddingLeft: '30px' }}>
                <div className="small-content-box">
                    <input
                        className="small-input-box"
                        type="text"
                        placeholder="Enter text here"
                    />
                </div>
            </div>
            <div className="divider large-divider">
          
            </div>
            <div className="divider small-divider" style={{ paddingRight: '30px' }}>
                <div className="small-content-box">
                    
                </div>
            </div>
        </div>
        </>
    )
}


export default App2