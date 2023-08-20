import { size } from "lodash";
import { useState, useEffect } from "react";
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
  const handlePlay = (num) => {
    setPlay(num);
  }
  function getRandomNumber() {
    return Math.floor(Math.random() * 12) + 1;
  }
  const yourNumber = (event) => {
    event.preventDefault();
    setBatting(parseInt(event.target.value));
    if (play === 1) {
      const bowl1 = getRandomNumber();
      setBowling([bowl1]);
    }
    else if (play === 2) {
      const dummyBowl = [];
      let bowl1, bowl2;
      bowl1 = getRandomNumber();
      dummyBowl.push(bowl1);
      do {
        bowl2 = getRandomNumber();
      } while (bowl2 === bowl1);
      dummyBowl.push(bowl2);
      setBowling(dummyBowl);
    }
    else if (play === 3) {
      const dummyBowl = [];
      let bowl1, bowl2, bowl3;
      bowl1 = getRandomNumber();
      dummyBowl.push(bowl1);
      do {
        bowl2 = getRandomNumber();
      } while (bowl2 === bowl1);
      dummyBowl.push(bowl2);
      do {
        bowl3 = getRandomNumber();
      } while (bowl3 === bowl1 || bowl3 === bowl2);
      dummyBowl.push(bowl3);
      setBowling(dummyBowl);
    }
    else {
      const dummyBowl = [];
      let bowl1, bowl2, bowl3, bowl4;
      bowl1 = getRandomNumber();
      dummyBowl.push(bowl1);
      do {
        bowl2 = getRandomNumber();
      } while (bowl2 === bowl1);
      dummyBowl.push(bowl2);
      do {
        bowl3 = getRandomNumber();
      } while (bowl3 === bowl1 || bowl3 === bowl2);
      dummyBowl.push(bowl3);
      do {
        bowl4 = getRandomNumber();
      } while (bowl4 === bowl1 || bowl4 === bowl2 || bowl4 === bowl3);
      dummyBowl.push(bowl4);
      setBowling(dummyBowl);
    }
  }
  console.log(bowling)
  useEffect(() => {
    if (bowling.length !== 0) {
      setCount(3);
      if (bowling.includes(batting)) {
        setwicket(wicket + 1);
      }
      else {
        if (play === 1) {
          setTotalScore(totalScore + 1);
        }
        else if (play === 2) {
          setTotalScore(totalScore + 2);
        }
        else if (play === 3) {
          setTotalScore(totalScore + 4);
        }
        else {
          setTotalScore(totalScore + 6);
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

  function Overlay() {
    return <div className="overlay gelatine">Next Turn</div>;
  }
  const genrateTarget = () => {
    setTarget(Math.floor(Math.random() * (100 - 40 + 1)) + 40);
  }
  return (
    <div className="Stadium">
      <div className="pitch">
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={1} onClick={yourNumber} >1</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={2} onClick={yourNumber} >2</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={3} onClick={yourNumber} >3</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={4} onClick={yourNumber} >4</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={5} onClick={yourNumber} >5</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={6} onClick={yourNumber} >6</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={7} onClick={yourNumber} >7</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={8} onClick={yourNumber} >8</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={9} onClick={yourNumber} >9</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={10} onClick={yourNumber} >10</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={11} onClick={yourNumber} >11</button>
        <button disabled={bowl === 30 || wicket === 8} className='bat' value={12} onClick={yourNumber} >12</button>
      </div>
      <div>
        <button onClick={() => handlePlay(1)} style={{ backgroundColor: play === 1 ? 'cadetblue' : '' }} className='bat select'>Defend</button>
        <button onClick={() => handlePlay(2)} style={{ backgroundColor: play === 2 ? 'cadetblue' : '' }} className='bat select'>Normal</button>
        <button onClick={() => handlePlay(3)} style={{ backgroundColor: play === 3 ? 'cadetblue' : '' }} className='bat select'>Attack</button>
        <button onClick={() => handlePlay(4)} style={{ backgroundColor: play === 4 ? 'cadetblue' : '' }} className='bat select'>Loft</button>
        {target !== 0 && target - totalScore <= 0 ? <div className="win">WIN!!</div> : ''}
        <div>
          {bowling.includes(batting) && bowl !== 0 ?<p className="out"> OUT !!</p> : ''}
          {play && bowling.length !== 0 && <p style={{ color: 'green', fontSize: '48px', fontWeight: 600, marginTop: '10px' }}>
            {play === 1 ? '1' : play === 2 ? '2' : play === 3 ? '4' : '6'}
          </p>}
          <p style={{ color: 'blue', fontSize: '22px' }}>this is your total score {totalScore}/{wicket}</p>
          <p className="see">opposite bowling: <span>
            {bowling.map((item,index) => (
              <span style={{ color: 'red', fontSize: '28px', marginRight: '5px'}} key={index}>{item},</span>
            ))}
          </span> 
          || what you played: <span style={{ color: 'green', fontSize: '28px' }}>{batting}</span></p>
          <p> {wicket === 8 ? 'All out !!' : ''} </p>
          {target !== 0 ? <p>Need {target - totalScore} runs in {30 - bowl} ball</p> : <p>balls played {bowl}</p>}
          {target !== 0 ? <p>Required Runrate:- {((target - totalScore)/((30 - bowl)))}</p> : ''}
          <p> {bowl === 30 ? 'Overs End, well played !!' : ''} </p> {target === 0 && bowl <= 0 ? <button onClick={genrateTarget}>Target</button> : ''}
        </div>
      </div>
      {count >= 3 ? <Overlay /> : ''}
    </div>
  );
}

export default Cricket;
