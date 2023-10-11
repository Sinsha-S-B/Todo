import "./App.css";
import { useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];

  const handleDelete = (id) => {
    const updatedToDos = toDos.filter((todo) => todo.id !== id);
    setToDos(updatedToDos);
  };

  const handleAddToDo = () => {
    if (toDo.trim() !== "") {
      const existingTodo = toDos.find((todo) => todo.text === toDo.trim());
      if (existingTodo) {
        alert("This todo already exists!");
      } else {
        setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
        setToDo(""); // Clear the text from the first text box
      }
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddToDo} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className={`todo ${obj.status ? "completed" : ""}`} key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setToDos((prevToDos) =>
                      prevToDos.map((todo) => {
                        if (todo.id === obj.id) {
                          todo.status = checked;
                        }
                        return todo;
                      })
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.text}</p>
                {obj.status && <h1 style={{ color: "green" }}>✔</h1>}
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={() => handleDelete(obj.id)}></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
