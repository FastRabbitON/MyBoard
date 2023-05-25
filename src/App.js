import './App.css';

import BoardContainer from "./BoardContainer"
import NoteContainer from "./NoteContainer";

function App() {

  const Contact = () => {
    window.open("https://github.com/FastRabbitON", '_blank').focus();
  }

  return (

    <div>

      <div className='AUTOR' onClick={() => Contact()}>@FastRabbinON</div>

      <BoardContainer />
      <NoteContainer />

    </div>
  );




}

export default App;
