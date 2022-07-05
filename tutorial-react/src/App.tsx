import React from "react";
import { GreetingsView } from "./GreetingsView";


const AnotherComponent = (props: {message: string}) => {
  const style = {
    fontSize: props.message === 'Softemy' ? '50px' : '20px'
  }

  return (
    // <h2 style={{
    //   fontSize: "100px",
    // }}>{props.message}</h2>

    <h2 style={style}>{props.message}</h2>
  );
}

function App() {
  return (
    <>
      <AnotherComponent message='Softemy'/>
      <AnotherComponent message='6 cai frumosi'/>
      <div>Hello World</div>
      <GreetingsView/>
    </>    
  );
}

export default App;
