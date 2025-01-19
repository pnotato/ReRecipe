import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import loading from './assets/loading.svg'
import sugarimg from './assets/sugar.svg'
import fatsimg from './assets/fats.svg'
import plantimg from './assets/plant.svg'
import proteinimg from './assets/protein.svg'
import saltimg from './assets/salt.svg'
import fiberimg from './assets/fiber.svg'
import energyimg from './assets/energy.svg'

import { CircularProgressbar } from 'react-circular-progressbar';
import { updateText } from './utils';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'
import NutritionFacts from './components/NutritionFacts'


const InputBox = ({ input, handleInputChange, handleSubmit }) => {
  return (
    <div className="input-container">
      <button className="submit-button" onClick={handleSubmit} c>
        Submit
      </button>
      <textarea className="small-input-box"
        type="text"
        placeholder="Enter a recipe or ingredients list..."
        value={input}
        onChange={handleInputChange} />
    </div>
  )
} //Input box




function App() {
  const [input, setInput] = useState("");
  const [calories, setCalorie] = useSpring(() => ({ from: { width: 0 } }))
  const [sugar, setSugar] = useSpring(() => ({ from: { width: 0 } }))
  const [fat, setFat] = useSpring(() => ({ from: { width: 0 } }))
  const [salt, setSalt] = useSpring(() => ({ from: { width: 0 } }))
  const [fibre, setFibre] = useSpring(() => ({ from: { width: 0 } }))
  const [protein, setProtein] = useSpring(() => ({ from: { width: 0 } }))
  const [greens, setGreens] = useSpring(() => ({ from: { width: 0 } }))
  const [caloriesCol, setCalorieCol] = useState('#ff6d6d')
  const [sugarCol, setSugarCol] = useState('#ff6d6d')
  const [fatCol, setFatCol] = useState('#ff6d6d')
  const [saltCol, setSaltCol] = useState('#ff6d6d')
  const [fibreCol, setFibreCol] = useState('#ff6d6d')
  const [proteinCol, setProteinCol] = useState('#ff6d6d')
  const [greensCol, setGreensCol] = useState('#ff6d6d')
  const [strokeCol, setstrokeCol] = useState('#ff6d6d')

  const [ref, { width }] = useMeasure()
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(true);
  const [percent, setPercent] = useSpring(() => ({ from: { x: 0 } }))
  const [transparent, setOpacity] = useState({ background: 'transparent' });
  const [barPercent, setBarPercent] = useState(0);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }
  const [NutriFacts, setNutriFacts] = useState({})

  function matchPercentColor(percent) {
    if (percent < 20) {
      return "#FF0000";
    } else if (percent >= 20 && percent < 40) {
      return "#FF6600";
    } else if (percent >= 40 && percent < 60) {
      return "#FFEF00";
    } else if (percent >= 60 && percent < 80) {
      return "#9AFF00";
    } else if (percent >= 80) {
      return "#00FF00";
    }
  }

  function matchPercentColorReverse(percent) {
    if (percent < 20) {
      return "#00FF00";
    } else if (percent >= 20 && percent < 40) {
      return "#9AFF00";
    } else if (percent >= 40 && percent < 60) {
      return "#FFEF00";
    } else if (percent >= 60 && percent < 80) {
      return "#FF6600";
    } else if (percent >= 80) {
      return "#FF0000";
    }
  }

  function normalizeNutriscore(score) {
    return 100 - ((score + 15) * 100 / (40 - (-15)));
  }
  function handleBars(v1, v2, v3, v4, v5, v6, v7) {
    let wid = document.getElementsByClassName("bar")[0].clientWidth;
    setCalorie.start({
      from: { width: 0 },
      to: { width: ((1 - (v1 / 100)) * wid) },
    })
    setCalorieCol(matchPercentColorReverse(v1));
    setSugar.start({
      from: { width: 0 },
      to: { width: ((1 - (v2 / 100)) * wid) },
    })
    setSugarCol(matchPercentColorReverse(v2));
    setFat.start({
      from: { width: 0 },
      to: { width: ((1 - (v3 / 100)) * wid) },
    })
    setFatCol(matchPercentColorReverse(v3));
    setSalt.start({
      from: { width: 0 },
      to: { width: ((1 - (v4 / 100)) * wid) },
    })
    setSaltCol(matchPercentColorReverse(v4));
    setFibre.start({
      from: { width: 0 },
      to: { width: (v5 / 100 * wid) },
    })
    setFibreCol(matchPercentColor(v5));
    setProtein.start({
      from: { width: 0 },
      to: { width: (v6 / 100 * wid) },
    })
    setProteinCol(matchPercentColor(v6));
    setGreens.start({
      from: { width: 0 },
      to: { width: (v7 / 100 * wid) },
    })
    setGreensCol(matchPercentColor(v7));
  }

  function handleScore(v1) {
    setPercent.start({
      from: { x: 0 },
      to: { x: v1 },
    })
    setBarPercent(v1);
  }
  const handleClick = () => {
    handleBars(10, 20, 60, 70, 80, 90, 100);
    handleScore(40);
    setLoadingVisible(false);
    setOpacity({ background: '#ffffff' });
    setScoreVisible(true);
  }

  const handleSubmit = async () => {
    setLoadingVisible(true);
    setScoreVisible(false);
    setBarPercent(0);
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
      let n = result["nutri_score"]
      console.log(n)

      handleBars((n["energy_density"] / 10) * 100, (n["sugar"] / 10) * 100, (n["saturated_fat"] / 10) * 100, (n["salt"] / 10) * 100, (n["fibre"] / 5) * 100, (n["protein"] / 5) * 100, (n["fruit_veg"] / 5) * 100);
      handleScore(normalizeNutriscore(n["total_score"]));
      setstrokeCol(matchPercentColor(normalizeNutriscore(n["total_score"])));
      setLoadingVisible(false);
      setOpacity({ background: '#ffffff' });

      setNutriFacts(result["total_nutrients"])

      setScoreVisible(true);

    } catch (error) {
      console.error('Error: ', error);
    }
  }
  

  return (
    <div>
      <div className="top-right-text" />
      <div className="dividers">
        <div className="divider small-divider" style={{ paddingLeft: '30px' }}>
          <div className="small-content-box">
            <InputBox className="small-input-box"
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit} />
          </div>
        </div>
        <div className="divider large-divider">
          <div className="inner-container">
            <div className="containerA">
            <p unselectable="on"></p>
            <div className="text">Recipe NutriScore</div>
            <div className='score-container'>
              <div ref={ref} className='main'>
                <div className="loading-container">
                  {loadingVisible && <img className='loading'
                    src={loading} />}
                </div>
                <animated.div className='score'>
                  {scoreVisible && percent.x.to(x => x.toFixed(0))}
                </animated.div>
                <CircularProgressbar className='.score-bar'
                  circleRatio={0.7}
                  value={barPercent}
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
                      stroke: strokeCol,
                    }
                  }}>
                </CircularProgressbar>
              </div>
            </div>
            </div>
   
            <div className="bars">
              <div className="bar-container">
              <div className="bar-text">Calorie Density</div>
                <div className="box">
                  <img src={energyimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Calories 
                    style={{
                      background: caloriesCol,
                      ...calories
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
                <div className="bar-text">Sugar</div>
                <div className="box">
                  <img src={sugarimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Sugar
                    style={{
                      background: sugarCol,
                      ...sugar
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
                <div className="bar-text">Saturated Fats</div>
                <div className="box">
                  <img src={fatsimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Fat
                    style={{
                      background: fatCol,
                      ...fat
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
                <div className="bar-text">Salt</div>
                <div className="box">
                  <img src={saltimg}/></div>
                <div className="bar">
                  <animated.div className="bar-anim" //Salt
                    style={{
                      background: saltCol,
                      ...salt
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
                <div className="bar-text">Fibre</div>
                <div className="box">
                  <img src={fiberimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Fibre
                    style={{
                      background: fibreCol,
                      ...fibre
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
                <div className="bar-text">Protein</div>
                <div className="box">
                  <img src={proteinimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Protein
                    style={{
                      background: proteinCol,
                      ...protein
                    }}>
                  </animated.div>
                </div>
              </div>
              <div className="bar-container">
              <div className="bar-text">Fruits & Vegetables</div>
                <div className="box">
                  <img src={plantimg}/>
                </div>
                <div className="bar">
                  <animated.div className="bar-anim" //Greens
                    style={{
                      background: greensCol,
                      ...greens
                    }}>
                  </animated.div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="divider small-divider" style={{ paddingRight: '30px' }}>
          <div className="small-content-box">
            <NutritionFacts totalNutrients={NutriFacts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
