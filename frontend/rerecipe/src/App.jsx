import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const InputBox = ({input, handleInputChange}) => {
  return (
    <div>
      <input
        type = "text"
        placeholder = "text-box"
        value = {input}
        onChange = {handleInputChange}
        className="search-bar"
      />
    </div>
  )
} //Input box


function App() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  return (
    <div>
      <InputBox
          input = {input}
          handleInputChange={handleInputChange}
      />
    </div>
  )
}

export default App
