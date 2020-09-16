import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// class App extends React.Component {
//   render() {

//   }
// }
// function App() {
//   return (
//     <div className="App">
//       <h1>hello world</h1>
//     </div>
//   );
// }
// const header = <h1>wow</h1>;
const App = () => {
  // const nameStuff = useState('mumi');
  // const name=nameStuff [0]
  // const setName=nameStuff [1]
  const [NewTodo, setNewTodo] = useState('');
  const [Todo, setTodos] = useState([]);
  const onChangeNewTodo = useCallback(
    (event) => {
      setNewTodo(event.target.value)
    }
  )
  const formSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!NewTodo.trim()) return;
      setTodos([
        ...Todo, {
          id: Todo.length ? Todo.length + 1 : 1,
          content: NewTodo,
          done: false,
        }
      ]); setNewTodo('');
    }, [NewTodo, Todo]
  )
  useEffect(() => {
    console.log('Todo', Todo);
  }, [Todo])
  const addTodo = useCallback(
    (todo, index) => (event) => {
      const newTodos = [...Todo]
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      }); setTodos(newTodos);
    }, [Todo]
  )
  const removeTodo = useCallback(
    (todo) => (event) => {
      setTodos(Todo.filter(otherTodo => otherTodo !== todo))
    }, [Todo]
  )
  //hooks!!
  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <label for="newTodo">Enter new Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={NewTodo}
          onChange={onChangeNewTodo}
        />
        <button type="submit"> 送出</button>
      </form>
      <h1>{NewTodo}</h1>
      <ul>
        {
          Todo.map((todo, index) => (
            <li key={todo.id} >
              <input type="checkbox"
                checked={todo.done}
                onChange={addTodo(todo, index)} />
              <span className={todo.done ? 'done' : ''}>
                {todo.content}</span>
              <button onClick={removeTodo(todo)}>Remove Todo</button>
            </li>

          ))
        }
      </ul>
    </div >);
}
export default App;
