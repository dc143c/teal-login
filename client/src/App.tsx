import React, {useState} from 'react';
import './App.css'
import Navbar from "./components/Navbar";
import LoginForm from "./components/Form";
import Greetings from "./components/Greetings";

function App() {
    const [isLogged, setIsLogged] = useState((localStorage.getItem("logged") === "true"));

    function handleLogin(situation: boolean){
        setIsLogged(situation);
        localStorage.setItem("logged", String(situation));
    }

  return (
      <>
          <Navbar logged={isLogged} handler={handleLogin}/>
          {isLogged ? (
              <Greetings />
          ) : (<LoginForm logged={isLogged} handler={handleLogin}/>)}
      </>
  );
}

export default App;
