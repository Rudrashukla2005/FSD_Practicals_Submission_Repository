import React from "react";

// function Greet(){
//     return <h1>Hello Rudra Shukla!!!</h1>
// }

// const Greet = () => <h1>Hello Rudra Shukla!!!</h1>;

const Greet = (props) => {
    console.log(props)
    return(
        <h1>Welcome to Charusat!!! {props.name} {props.institute}</h1>
    )
}

export default Greet;