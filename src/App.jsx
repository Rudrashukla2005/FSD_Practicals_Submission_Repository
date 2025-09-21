import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Practical3 from './components/Practical3'
// import Greet from './components/greetings'
import { Component } from 'react'
import Greet from './components/greetings'
import Practical4 from './components/Practical4'
// import Welcome from './components/welcome'


function App() {


  return (
    <>
      <Practical3 />
      {/* <Greet /> */}
      <Practical4 /> 
    </>
  )
}

// class App extends Component{
//   render(){
//     return(
//       <div>
//         <Greet name="CSE" institute="CSPIT"/>
//         <Greet name="IT" institute="DEPSTAR"/>
//       </div>
//     )
//   }
// }

export default App
