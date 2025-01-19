import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import logo from './assets/logo.png'
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App2.css'


function matchPercentColor(percent) {
    if (percent < 20) {
        return "danger";
    } else if (percent >= 20 && percent < 40) {
        return "dark";
    } else if (percent >= 40 && percent < 60) {
        return "warning";
    } else if (percent >= 60 && percent < 80) {
        return "secondary";
    } else if (percent >= 80) {
        return "success";
    }
}

function App2() {
    var calories = matchPercentColor(80);
    var sugarcontent = matchPercentColor(40);
    var saturatedfat = matchPercentColor(40);
    var saltcontent = matchPercentColor(40);
    var fibre = matchPercentColor(40);
    var fruitsvegetables = matchPercentColor(40);
    var protein = matchPercentColor(40);

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
                <div style={{ width: '100%', padding: '10px' }}>
                    <ProgressBar variant={calories} now={40} style={{ height: '20px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca"}} />
                    <ProgressBar variant="dark" now={20} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                    <ProgressBar variant="success" now={60} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                    <ProgressBar variant="danger" now={80} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                    <ProgressBar variant="success" now={20} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                    <ProgressBar variant="danger" now={60} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                    <ProgressBar variant="success" now={60} style={{ height: '20px', marginTop: '10px', width: '60%', boxShadow:"0 6px 18px rgba(0,0,0,0.25)", backgroundColor:"#d0deca" }} />
                </div>
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