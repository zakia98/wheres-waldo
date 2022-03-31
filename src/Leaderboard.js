import React from 'react';
import './Leaderboard.css'
import { getFirestore, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore'
import { initFirebase } from './firebase-config';
import { useEffect, useState } from 'react';

export default function Leaderboard(props) {
    
    const [leaderboard, setLeaderboard] = useState(null)

    useEffect(() => {
        const getLeaderboard = async function() {
            const docSnap = await getDoc(leaderboardRef)
            const data = await docSnap.data()
            const sortedData = data.leaderboardArray.sort((a, b) => a.time - b.time)
            console.log(sortedData)
            setLeaderboard(prevState => sortedData)
        }
        getLeaderboard()
    }, [])
   

    const app = initFirebase()
    const db = getFirestore(app)
    const leaderboardRef = doc(db, 'stage1', 'leaderboard')

    const submitHighscore = async () => {

        const name = prompt('Please enter your name: ')

        console.log(leaderboardRef)
        await updateDoc(leaderboardRef, {
            leaderboardArray: arrayUnion({name:name, time:props.time/1000})
        })
    }
    
    


    if (props.show) {
        return(
            <div className='leaderboard-container'>
                <h2>You finished in {props.time / 1000} seconds!</h2>
                <button onClick={props.retry}>Retry</button>
                <button onClick={submitHighscore}>Submit highscore to Database!</button>
                <div>
                    {leaderboard.map(highscore => {
                        return <p>Name: {highscore.name} Time: {highscore.time}</p>
                    })}
                </div>
            </div>
        )
    } else return null 
}