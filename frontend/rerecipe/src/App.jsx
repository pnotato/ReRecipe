import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/parse-recipe', {
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
    </div>
  )
}

export default App
