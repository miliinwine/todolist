import { useState, useEffect } from "react";
import { Input } from "./components/ui/Input/Input";
import { Button } from "./components/ui/Button/Button";
import { List } from "./components/List/List";
import { Item } from "./components/Item/Item";
import "./assets/styles/global.css";

// TODO : Сделать редактирование текста для выбранной задачи

function App() {
  const [todos, setTodos] = useState([]);
  // ↑ Переменная состояния массива с объектами
  const [value, setValue] = useState("");
  // ↑ Переменная состояния строки для значений Input

  // ↓ Обработчик для введенных значений в Input
  const handlerInput = (event) => {
    setValue(event.target.value);
  };
  // ↓ Обработчик для отправки формы
  const handlerForm = (event) => {
    // Параметр event - это любое допустимое событие, произошедшее на странице
    event.preventDefault(); // Отменяет действия браузера, срабатывающие по умолчанию
    // В данной случае, останавливает автоматическую отправку формы
  };
  // ↓ Обработчик кнопки по добавлению задач
  const handlerButton = () => {
    if (value.trim().length) {
      // Метод trim() удаляет пробелы по краям строки
      addTask();
      setValue("");
    }
  };
  // ↓ Функция для загрузки данных из локального хранилища
  useEffect(() => {
    const task = localStorage.getItem("task");
    if (task) {
      setTodos(JSON.parse(task));
    }
  }, []);
  // ↓ Функция по созданию и добавлению задачи
  const addTask = () => {
    console.log(todos);
    const task = {
      id: Date.now(),
      text: value[0].toUpperCase() + value.slice(1),
      completed: false,
    };
    // Сохранение задачи в локальном хранилище
    setTodos((todo) => {
      const saveTask = [...todo, task];
      localStorage.setItem("task", JSON.stringify(saveTask));
      return saveTask;
    });
  };
  // ↓ Функция по удалению задачи
  const deleteTask = (id) => {
    const deleteTask = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTask);
    // Удаление задачи из локального хранилища
    localStorage.setItem("task", JSON.stringify(deleteTask));
  };
  // ↓ Функция по удалению всех задач
  const deleteAll = () => {
    setTodos([]);
    // Удаление всех задач из локального хранилища
    localStorage.clear();
  };
  // ↓ Функция по переключению выбранных задач из false на true
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // ↓ Функция по удалению выбранных задач
  const deleteSelected = () => {
    const deleteTask = todos.filter((todo) => !todo.completed);
    setTodos(deleteTask);
    // Удаление выбранных задач из локального хранилища
    localStorage.setItem("task", JSON.stringify(deleteTask));
  };
  return (
    <>
      <div className="container">
        <h1 className="title">To Do List</h1>
        <form className="form" onClick={handlerForm}>
          <Input
            className="input"
            onChange={handlerInput}
            value={value}
            type="text"
            placeholder="Введите задачу"
          />
          <Button className="button" onClick={handlerButton} children="Write" />
        </form>
        <div>
          {todos.length === 0 ? (
            ""
          ) : (
            <List className="list">
              {todos.map((todo, index) => (
                <Item
                  key={index}
                  // Не забывать указывать key в компоненте и передавать в нем props "id", без этого checkbox будет работать некорректно
                  onChange={() => toggleCompleted(todo.id)}
                  deleteTask={() => deleteTask(todo.id)}
                  text={todo.text}            />
              ))}
              <div className="buttons">
                <Button
                  className="button"
                  onClick={deleteSelected}
                  children="Delete Selected"
                />
                <Button
                  className="button"
                  onClick={deleteAll}
                  children="Delete All"
                />
              </div>
            </List>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
