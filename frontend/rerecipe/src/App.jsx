import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
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
    <button onClick={onClick}>
    </button>
  )
}


function App() {
  const [input, setInput] = useState("");
  const [springs, setSpring] = useSpring(() => ({from:{width:5}}))

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }
  const handleClick = () => {
    setSpring.start({
      from: {width: 5},
      to: {width: 100},
      delay: 100,
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/enter-recipe-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: input }),
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
          handleSubmit={handleSubmit}
      />
      <animated.div
      onClick={handleClick}
      style={{
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
      }}
    />
    </div>
  )
}

export default App
