// import lottie from 'lottie-web';
import { useState, useEffect } from "react";
// import six from './six.json';
import './index.css';

function Cricket() {
  const [bowling, setBowling] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [wicket, setwicket] = useState(0);
  const [batting, setBatting] = useState(0)
  const [bowl, setbowl] = useState(0);
  const [count, setCount] = useState(3);
  const [play, setPlay] = useState(1);
  const [target, setTarget] = useState(0);
  const [miss, setMiss] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [shots, setShots] = useState([]);
  const handlePlay = (num) => {
    setPlay(num);
  }
  function getRandomNumber() {
    return Math.floor(Math.random() * 12) + 1;
  }
  // BOWLING
  const yourNumber = (event) => {
    event.preventDefault();
    setBatting(parseInt(event.target.value));
    if (play === 1) {
      const bowl1 = getRandomNumber();
      setBowling([bowl1]);
    } else if (play === 3) {
      const missValue = getRandomNumber();
      const bowlingValues = [];
      while (bowlingValues.length < 3) {
        const bowlP = getRandomNumber();
        if (!bowlingValues.includes(bowlP) && bowlP !== missValue) {
          bowlingValues.push(bowlP);
        }
      }
      setMiss([missValue]);
      setBowling(bowlingValues);
    } else if (play === 4) {
      const bowlingValues = [];
      while (bowlingValues.length < 4) {
        const bowlP = getRandomNumber();
        if (!bowlingValues.includes(bowlP)) {
          bowlingValues.push(bowlP);
        }
      }
      const missValues = [];
      while (missValues.length < 2) {
        const missP = getRandomNumber();
        if (!missValues.includes(missP) && !bowlingValues.includes(missP)) {
          missValues.push(missP);
        }
      }
      setMiss(missValues);
      setBowling(bowlingValues);
    } else {
      const bowlingValues = [];
      while (bowlingValues.length < 2) {
        const bowlP = getRandomNumber();
        if (!bowlingValues.includes(bowlP)) {
          bowlingValues.push(bowlP);
        }
      }
      setBowling(bowlingValues);
    }
  };
  
 
  // BATTING
  useEffect(() => {
    if (bowling.length !== 0) {
      setCount(3);
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, 1000);
      if (bowling.includes(batting)) {
        setwicket(wicket + 1);
        shots.push('W')
      }
      else if (miss.includes(batting)) {
        setTotalScore(totalScore);
        shots.push(0);
      }
      else {
        if (play === 1) {
          setTotalScore(totalScore + 1);
          shots.push(1);
        }
        else if (play === 2) {
          setTotalScore(totalScore + 2);
          shots.push(2);
        }
        else if (play === 3) {
          setTotalScore(totalScore + 4);
          shots.push(4);
        }
        else {
          setTotalScore(totalScore + 6);
          shots.push(6);
        }
      }
      setbowl(bowl + 1);
    }
  }, [bowling, batting]);
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count - 1);
    }, 1000);
  }, [bowl]);
  console.log(miss, bowling, shots);
  function Overlay() {
    return <div className="overlay gelatine">Next Turn</div>;
  }
  const genrateTarget = () => {
    setTarget(Math.floor(Math.random() * (90 - 40 + 1)) + 40);
  }
  // const animationData = shots[shots.length - 1] === 6 ? six : '';
  // useEffect(() => {
  //   const container = document.getElementById('lottie-container');
  //   // Initialize Lottie
  //   const animation = lottie.loadAnimation({
  //     container: container,
  //     animationData: animationData,
  //     renderer: 'svg', // Choose the renderer (svg, canvas, html)
  //     loop: true, // Set to true for looping animation
  //     autoplay: true, // Set to true to autoplay the animation
  //   });
  //   return () => {
  //     animation.destroy();
  //   };
  // }, []);
  return (
    <div className="Stadium">
      <div className="pitch">
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={1} onClick={yourNumber} >1</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={2} onClick={yourNumber} >2</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={3} onClick={yourNumber} >3</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={4} onClick={yourNumber} >4</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={5} onClick={yourNumber} >5</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={6} onClick={yourNumber} >6</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={7} onClick={yourNumber} >7</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={8} onClick={yourNumber} >8</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={9} onClick={yourNumber} >9</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={10} onClick={yourNumber} >10</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={11} onClick={yourNumber} >11</button>
        <button disabled={bowl === 30 || wicket === 7} className='bat' value={12} onClick={yourNumber} >12</button>
      </div>
      <div>
        <button onClick={() => handlePlay(1)} style={{ backgroundColor: play === 1 ? 'cadetblue' : '' }} className='bat select'>Defend</button>
        <button onClick={() => handlePlay(2)} style={{ backgroundColor: play === 2 ? 'cadetblue' : '' }} className='bat select'>Normal</button>
        <button onClick={() => handlePlay(3)} style={{ backgroundColor: play === 3 ? 'cadetblue' : '' }} className='bat select'>Attack</button>
        <button onClick={() => handlePlay(4)} style={{ backgroundColor: play === 4 ? 'cadetblue' : '' }} className='bat select'>Loft</button>
        {target !== 0 && target - totalScore <= 0 ? <div className="win">WIN!!</div> : ''}
        {/* <div id="lottie-container" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
          
        </div> */}
        <div>
          {bowling.includes(batting) && bowl !== 0 ?<p className="out"> OUT !!</p> : ''}
          {play && bowling.length !== 0 && <p className={animate ? 'last-bowl' : ''} style={{ color: 'green', fontSize: '48px', fontWeight: 600, marginTop: '10px' }}>
            {shots[shots.length - 1] === 0 ? 'MISS!' : shots[shots.length - 1]}
          </p>}
          <p style={{ color: 'blue', fontSize: '22px' }}>this is your total score {totalScore}/{wicket}</p>
          <p className="see">opposite bowling: <span>
            {bowling.map((item,index) => (
              <span style={{ color: 'red', fontSize: '28px', marginRight: '5px'}} key={index}>{item},</span>
            ))}
          </span> 
          || what you played: <span style={{ color: 'green', fontSize: '28px' }}>{batting}</span></p>
          <p> {wicket === 7 ? 'All out !!' : ''} </p>
          {target !== 0 ? <p>Need {target - totalScore} runs in {30 - bowl} ball</p> : <p>balls played {bowl}</p>}
          {target !== 0 ? <p>Required Runrate:- {((target - totalScore)/((30 - bowl)))}</p> : ''}
          <p> {bowl === 30 ? 'Overs End, well played !!' : ''} </p> {target === 0 && bowl <= 0 ? <button onClick={genrateTarget}>Target</button> : ''}
          <div className="shotmap">
            {shots.map((item, index) => (
              <span key={index} style={{ backgroundColor: item === 'W' ? 'red' : item === 4 ? 'blue' : item === 6 ? 'green' : '' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      {count >= 3 ? <Overlay /> : ''}
    </div>
  );
}

export default Cricket;
