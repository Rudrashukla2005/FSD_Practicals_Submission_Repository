import { useEffect, useState } from "react"


const GymRepCounter = () => {
    const[count, setCount] = useState(0);

    useEffect(() => {
        const savedCount = localStorage.getItem("gymrep");
        if(savedCount){
            setCount(Number(savedCount))
        }
    }, []);

    useEffect(()=> {
        localStorage.setItem("gymrep", count);
    }, [count]);

    return(
        <div>
            <h1>Gym Rep Counter</h1>
            <h2>Rep Count: {count}</h2>
            <button onClick={()=> setCount(count+1)}>Increment</button>
            <button onClick={()=> setCount(count-1)}>Decrement</button>
            <button onClick={()=> setCount(0)}>Reset</button>
        </div>
    )
}

export default GymRepCounter
