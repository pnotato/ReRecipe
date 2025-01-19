import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import loading from './assets/loading.svg'
import { CircularProgressbar } from 'react-circular-progressbar';
import { updateText } from './utils';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'


const InputBox = ({input, handleInputChange, handleSubmit}) => {
  return (
    <div>
      <input
        type = "text"
        placeholder = "Enter a recipe or ingredients list..."
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
  const [calories, setCalorie] = useSpring(() => ({from:{width:0}}))
  const [sugar, setSugar] = useSpring(() => ({from:{width:0}}))
  const [fat, setFat] = useSpring(() => ({from:{width:0}}))
  const [salt, setSalt] = useSpring(() => ({from:{width:0}}))
  const [fibre, setFibre] = useSpring(() => ({from:{width:0}}))
  const [protein, setProtein] = useSpring(() => ({from:{width:0}}))
  const [greens, setGreens] = useSpring(() => ({from:{width:0}}))
  const [caloriesCol, setCalorieCol] = useState('#ff6d6d')
  const [sugarCol, setSugarCol] = useState('#ff6d6d')
  const [fatCol, setFatCol] = useState('#ff6d6d')
  const [saltCol, setSaltCol] = useState('#ff6d6d')
  const [fibreCol, setFibreCol] = useState('#ff6d6d')
  const [proteinCol, setProteinCol] = useState('#ff6d6d')
  const [greensCol, setGreensCol] = useState('#ff6d6d')

  const [ref, { width }] = useMeasure()
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [percent, setPercent] = useSpring(() => ({from:{x:0}}))
  const [transparent, setOpacity] = useState({background:'transparent'});
  const [description, setDescription] = useState("");
  const [barPercent, setBarPercent] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  function handleBars (v1, v2, v3, v4, v5, v6, v7) {
    setCalorie.start({
      from: {width: 0},
      to: {width: v1},
    })
    setCalorieCol('#ff6d6d');
    setSugar.start({
      from: {width: 0},
      to: {width: v2},
    })
    setSugarCol('#ff6d6d');
    setFat.start({
      from: {width: 0},
      to: {width: v3},
    })
    setFatCol('#ff6d6d');
    setSalt.start({
      from: {width: 0},
      to: {width: v4},
    })
    setSaltCol('#ff6d6d');
    setFibre.start({
      from: {width: 0},
      to: {width: v5},
    })
    setFibreCol('#ff6d6d');
    setProtein.start({
      from: {width: 0},
      to: {width: v6},
    })
    setProteinCol('#ff6d6d');
    setGreens.start({
      from: {width: 0},
      to: {width: v7},
    })
    setGreensCol('#ff6d6d');
  }

  function handleScore(v1) {
    setPercent.start({
      from: {x:0},
      to: {x:v1},
    })
  }
  const handleClick = () => {
    handleBars(50, 100, 150, 200, 250, 300, 350);
    handleScore(100);
    setLoadingVisible(true);
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
      <InputBox
          input = {input}
          handleInputChange={handleInputChange}
          handleSubmit={handleClick}/>
      
      <div>
        <div className = "bar"> 
          <animated.div //calories
          className = "bar-anim"
            style={{
            background: caloriesCol,
            ...calories}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //sugar
            className = "bar-anim"
            style={{
            background: sugarCol,
            ...sugar}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //fat
            className = "bar-anim"
            style={{ 
            background: fatCol,
            ...fat}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //Salt
            className = "bar-anim"
            style={{
            background: saltCol,
            ...salt}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //Fibre
            className = "bar-anim"
            style={{
            background: fibreCol,
            ...fibre}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //Protein
            className = "bar-anim"
            style={{
            background: proteinCol,
            ...protein}}>
          </animated.div>
        </div>
        <div className = "bar">
          <animated.div //Protein
            className = "bar-anim"
            style={{
            background: greensCol,
            ...greens}}>
          </animated.div>
        </div>
      </div>
      
      <div
        style={{
          height:80,
          width:80,
          ...transparent,
        }}></div>

      <h1>{description}</h1>
      <div className = 'score-container'>
        <div ref = {ref} className='main'>
          <animated.div className = 'score'>
            {percent.x.to(x => x.toFixed(0))}
          </animated.div>
          <CircularProgressbar className='.score-bar'
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
        </div>
      </div>


      <div>
        {loadingVisible && <img className = 'loading'
          src={loading} />}
      </div>
    </div>
  )
}

export default App
