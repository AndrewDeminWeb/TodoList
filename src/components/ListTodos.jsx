import { useEffect, useLayoutEffect, useState } from "react"
import s from '../css/style.module.css'

const ListTodos = ({ todos, setTodos, changeCompleteTodo, deleteTodo, listRef, editTodo, changeEditableTodo }) => {
    const [filterTodos, setFilterTodos] = useState(todos)
    const [textFilter, setTextFilter] = useState('all')
    const [leftTodos, setLeftTodos] = useState([])
    const [checkedTodos, setCheckedTodos] = useState([])

    const lengthLeftTodos = leftTodos.length ?? filterTodos.length
    const lengthCheckedTodos = checkedTodos.length ?? 0
    
    useEffect(() => {
        setTextFilter(textFilter)
    }, [textFilter])

    useLayoutEffect(() => {
        setFilterTodos(todos)
        setCheckedTodos(todos.filter(todo => todo.isComplete === true))
        setLeftTodos(todos.filter(todo => todo.isComplete === false))
        handleFilterTodo(textFilter)
    }, [todos, textFilter])

    const handleFilterTodo = (filter) => {
        switch(filter) {
            case "completed":
                setFilterTodos(todos.filter(todo => todo.isComplete === true))
                break
            case "active":
                setFilterTodos(todos.filter(todo => todo.isComplete === false))
                break
            default: 
                setFilterTodos(todos)
        }
    }

    const selectAllTodos = () => {
        setTodos(todos.map(todo => ({ ...todo, isComplete: true })))
    }

    const clearAllSelectedTodo = () => {
        setTodos(todos.filter(todo => todo.isComplete !== true))
    }

    const handleChangeText = (id, e) => {
        let { target: { textContent } } = e
        setTodos(todos.map(todo => {
            if(todo.id !== id) return todo

            return {
                ...todo,
                textTodo: textContent
            }
        }))
    }

    return (
        <>
            <button className={s.selectAll} onClick={selectAllTodos}>Select all</button>
            {lengthCheckedTodos !== 0 &&
                <button className={s.clearAllSelected} onClick={clearAllSelectedTodo}>Clear completed todo ({lengthCheckedTodos})</button>
            }
            <ul>
                {filterTodos && filterTodos.map((todo, i) => (
                    <li key={todo.id} ref={el => listRef.current[i] = el}>
                        <input type="checkbox" checked={todo.isComplete} onChange={() => changeCompleteTodo(todo.id)}/>
                        <span className={s.todo_text} onInput={(e) => handleChangeText(todo.id, e)}>{todo.textTodo}</span>
                        {!todo.isEditable ?
                            <span className={s.edit} onClick={() => {
                                editTodo(i)
                                changeEditableTodo(todo.id)
                            }}></span>
                            :
                            <span className={s.save} onClick={() => {
                                editTodo(i)
                                changeEditableTodo(todo.id)
                            }}></span>
                        }
                        <span className={s.delete} onClick={() => deleteTodo(todo.id)}></span>
                    </li>
                ))}
            </ul>

            <p className={s.change_filter}>{lengthLeftTodos} items left</p>
            
            <div className={s.change_filter}>
                <input type="radio" name="filtered" id="active" onChange={() => handleFilterTodo(setTextFilter("active"))} />
                <label htmlFor="active">ACTIVE</label>

                <input type="radio" name="filtered" id="completed" onChange={() => handleFilterTodo(setTextFilter("completed"))} />
                <label htmlFor="completed">COMPLETED</label>

                <input type="radio" name="filtered" id="all" onChange={() => handleFilterTodo(setTextFilter("all"))} defaultChecked />
                <label htmlFor="all">ALL</label>
            </div>
        </>
    )
}

export { ListTodos }