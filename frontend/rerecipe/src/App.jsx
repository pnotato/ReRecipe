import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import loading from './assets/loading.svg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'

const InputBox = ({input, handleInputChange, handleSubmit}) => {
  return (
    <div>
      <input
        type = "text"
        placeholder = "text-box"
        value = {input}
        onChange = {handleInputChange}
        className="search-bar"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  )
} //Input box

const SearchButton = ({onClick}) => {
  return (

    <button onClick={onClick} className="search-button">
    </button>
  )
}



function App() {
  const [input, setInput] = useState("");
  const [springs, setSpring] = useSpring(() => ({from:{width:0}}))
  const [percent, setPercent] = useSpring(() => ({from:{x:0}}))
  const [transparent, setOpacity] = useState({background:'transparent'});
  const [description, setDescription] = useState("");
  const [barPercent, setBarPercent] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  const handleColor = (v) => {
    
  }

  const handleClick = () => {
    setSpring.start({
      from: {width: 0},
      to: {width: 1000},
    })
    setPercent.start({
      from: {x:0},
      to: {x:100},
    })
    setOpacity({background:'#ffffff'});
    setDescription("Description");
    setBarPercent(100);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/parse_recipe', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });
      const result = await response.json();
      console.log(result);
    } catch(error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div>
      <div className="wrapper"></div>
      <div className="container" id="left">
        <InputBox
            input = {input}
            handleInputChange={handleInputChange}
            handleSubmit={handleClick}
        />
      </div>
      <div className="container" id="center"></div>
      <div className="container" id="right"></div>
      <animated.div
      style={{
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
      }}>
      </animated.div>
      <animated.div>
        {percent.x.to(x => x.toFixed(0))}
      </animated.div>
      <div
        style={{
          height:80,
          width:80,
          ...transparent,
        }}></div>
      <img className = 'loading'
      src={loading} />
      <h1>{description}</h1>
      <animated.div style={{ width: 200, height: 200}}>
        <CircularProgressbar 
          circleRatio={0.7}
          value= {barPercent}
          styles={{
            trail: {
              strokeLineCap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
            },
            path: {
              strokeLineCap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
              stroke: '#CDFFCA'
            }
          }}></CircularProgressbar>
      </animated.div>
    </div>
  )
}

export default App
