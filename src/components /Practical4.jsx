import { useState } from "react"
import './Practical4.css'

const Practical4 = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState({firstName: '', lastName: ''});
    const increment5 = () => {
        for(let i=1; i<=5; i++)
            setCount(prevCount=> prevCount+1)
    }
    return(
        <div>
            <h1>Count : {count}</h1>
            <button onClick={() => setCount(count+1)}>Increment</button>
            <button onClick={() => setCount(count-1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => increment5()}>Increment-5</button>
            <br />
            <br />
            First Name: <input type="text" value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})}/>
            <br />
            <br />
            Last Name: <input type="text" value={name.lastName} onChange={e => setName({...name, lastName: e.target.value})}/>
            <h3>First Name: {name.firstName}</h3>
            <h3>Last Name: {name.lastName}</h3>
        </div>
    )
}

export default Practical4