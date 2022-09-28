import TaskList from "./components/TaskList";
import "./styles/style.css";


function App() {
  return (
    <div className="App-container">
      <img
        src="https://cdn2.iconfinder.com/data/icons/social-media-8/512/note3.png"
        className="note"
        alt=""
      />
      <TaskList />
    </div>
  );
}

export default App;
