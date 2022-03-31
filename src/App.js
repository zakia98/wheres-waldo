import React, { useState, useEffect } from 'react'
import './App.css';
import image from './images/img2.webp'
import {MDCMenu} from '@material/menu';
import GameImage from './components/GameImage'
import { between } from './helpers'
import { getFirestore, collection } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore'
import { initFirebase } from './firebase-config';
import SnackBar from './components/SnackBar';
import Leaderboard from './components/Leaderboard';

function App() {
  


  async function getAnswers(character) {
    const app = initFirebase()
    const db = getFirestore(app)
    const coordsRef = doc(db, 'stage1', 'map1')
    const coordsSnap = await getDoc(coordsRef)
    let answers = await coordsSnap.data()
    return answers[character]
  }  
  
  const [foundCharacters, setFoundCharacters] = useState({
    Waldo:false,
    Odlaw:false,
    Wizard:false
  })

  const [showLeaderboard, toggleLeaderboard] = useState(false)

  const [latestFoundCharacter, setLatestFoundCharacter] = useState([])

  const [currentSelectedCoords, setCurrentSelectedCoords] = useState([0,0])

  const [snackbar, setSnackBar] = useState(null)
  
  const [time, setTime] = useState(new Date())

  let currentcoords = currentSelectedCoords

  useEffect(()=> {

  }, [latestFoundCharacter])

  useEffect(() => {

  }, [currentSelectedCoords])
  
  useEffect(() => {
    checkIfWin(foundCharacters)
  }, [foundCharacters])

  useEffect(() => {
    
  }, [time])

  const handleClick = (e) => {
    const target = document.querySelector('.target')
    let bounds = e.target.getBoundingClientRect()
    const leftside = bounds.left
    const topside = bounds.top
    target.style.top = `${e.pageY - 50}px`
    target.style.left = `${e.pageX - 50 }px`
    setCurrentSelectedCoords(prevState => [e.pageX - leftside, e.pageY - topside])
  }

  const checkCoordinates = async (character) => {
    const coords = await getAnswers(character)

    if (between(currentSelectedCoords[0], coords[0]- 50, coords[0] + 50) && 
      between(currentSelectedCoords[1], coords[1] - 50, coords[1] + 50)) {
        setFoundCharacters(prevState => ({
          ...prevState,
          [character]:true
        }))
        if (!latestFoundCharacter.includes(character)) {
          setLatestFoundCharacter(prevState => (
            [...prevState, character]
          ))
        }
    } 
  }


  const checkIfWin = function(foundCharacters) {
    if (Object.values(foundCharacters).every(value => value === true)) { 
      setLatestFoundCharacter(prevState => [...prevState, 'them all!'])
      toggleLeaderboard(true)
      setTime(time => new Date() - time)
    } 
  }
  
  const retry = () => {
    toggleLeaderboard(false)
    setFoundCharacters({
      Waldo:false,
      Odlaw:false,
      Wizard:false
    })
    setLatestFoundCharacter([])
    setTime(new Date())
  }


  return (
    <div className="App">
      <h1>Where's Waldo!</h1>
      <p>Click on the image to find Waldo, Odlaw, and the Wizard. 
        When you've found them all, see if you can ride on the leaderboard!
      </p>
      <GameImage handleClick={handleClick} coords={currentSelectedCoords} checkCoords={checkCoordinates} image={image} />
      {latestFoundCharacter.map(item => <SnackBar timer={5000} found={item} key={item}/>)}
      <Leaderboard show={showLeaderboard} time={time} retry={retry}/>
    </div>
  );
}

export default App;
