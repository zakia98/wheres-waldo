import React, { useState, useEffect } from 'react';
import './SnackBar.css'

export default function SnackBar(props) {
    
    const [showDisplay, setShowDisplay] = useState(true)
    useEffect(() => {
        setTimeout(() => 
            setShowDisplay(false), 15000
        )
    }, [])

    if (props.found) {
        return(
            <div className='snackbar-container' style={showDisplay ? {display:'block'}: {display:'none'}}>
                <p>You found {props.found}!</p>
                <div className='timer'></div>
            </div>
        )
    
    } else {
        return null
    }
}