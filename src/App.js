import './App.css';

import BoardContainer from "./BoardContainer"


function App() {

  const Contact = () => {
    window.open("https://github.com/FastRabbitON", '_blank').focus();
  }


  return (

    <div>

      <div className="AutorContainer" onClick={() => Contact()}>
        <div className='AUTOR' >@FastRabbinON</div>
      </div>

      <BoardContainer />

    </div>

  );

}

export default App;
