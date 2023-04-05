import { useRef, useState } from "react"
import { ListTodos } from "./ListTodos"
import s from '../css/style.module.css'

function FormTodos() {
    const [todos, setTodos] = useState([])
    const [textTodo, setTextTodo] = useState('')
    const listRef = useRef([])

    const handleSubTodo = () => {
        if(textTodo.trim().length) {
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    textTodo,
                    isComplete: false,
                    isEditable: false
                }
            ])
        }
        setTextTodo('')
    }

    const changeCompleteTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id !== id ? todo : { ...todo, isComplete: !todo.isComplete }))
    }

    const changeEditableTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id !== id ? todo : { ...todo, isEditable: !todo.isEditable }))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = (n) => {
        let todoText = listRef.current[n].querySelector('[class*="todo_text"]')
        if(!todoText.hasAttribute('contentEditable'))
            todoText.contentEditable = true
        else
            todoText.removeAttribute('contentEditable')
    }

    return (
        <>
            <input className={s.type_todo} type="text" placeholder="Type some todo..." value={textTodo} onChange={(e) => setTextTodo(e.target.value)}/>
            <button className={s.btn_enter_todo} onClick={handleSubTodo}>Enter</button>
            {todos.length > 0 && 
                <ListTodos todos={todos} changeCompleteTodo={changeCompleteTodo}
                deleteTodo={deleteTodo} listRef={listRef} editTodo={editTodo}
                setTodos={setTodos} changeEditableTodo={changeEditableTodo}/>
            }
        </>
    )
}

export { FormTodos }