import "./App.scss";
import { TasksList } from "./components/TasksList/TasksList";

function App() {
  return (
    <div className="App">
      <header className="header">Tasks App</header>
      <TasksList />
    </div>
  );
}

export default App;
