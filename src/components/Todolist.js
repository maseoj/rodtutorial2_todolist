import React, { useRef } from 'react'
import { useState } from 'react'

import TodoItem from './TodoItem'

const Todolist = () => {
    const todoNameRef = useRef()
    const [ state, setState ] = useState({// declaration ng state

        todo: '', //array
        todolist: []// array
    })

    const [edit, setEdit] = useState ({
        editTodo: '',
        editIndex: ''
    })

    const [isUpdate, setIsUpdate] = useState(false)
        
    const {todo, todolist } = state // declaration ng storage/ handler
    const { editTodo, editIndex } = edit

    const handleOnChangeEdit = (e) => {// button function
        const {name, value } = e.target // storage ng todolist

        setEdit ({...edit, [name]: value})//handler ng inputs
    }

    const handleOnClickEdit =(index, value) => {
        setIsUpdate(true)
        setEdit({editTodo: value, editIndex : index })
    }

    const handleOnClickCancel =() => {
        setIsUpdate(false)
    }

    const handleOnChange = (e) => {// button function
        const {name, value } = e.target // storage ng todolist

        setState ({...state, [name]: value})//handler ng inputs
    }

    /* Create todolist */

    const createTodo = () => {
        const name = todoNameRef.current.value
        if(name === '') return
        const list = todolist// [] current
        list.push(todo) //[] current + current todo

        setState({todo: '', todolist: list}) 
    }

    /* Delete */

    const deleteTodo = (index) => {
        const list = todolist //[] - current
        list.splice(index, 1) // [] - current - index

        setState ({todo: '', todolist: list})
    }

    /* Update */
    const updateTodo = (index) => {
        const list = todolist // current
        list[index] = editTodo // [] - current updated value

        setState ({...state, todolist: list})
        setIsUpdate(false)
        setEdit({editTodo: '', editIndex: ''})
    }
 
    return (
        <>
        <div className = "todolist-main">
            <div className = "form-wrapper">
                <input ref = {todoNameRef}
                type = "text" 
                name = "todo"
                placeholder = "Create todolist"
                value = {todo}
                onChange = {handleOnChange}/>
                <button onClick = { createTodo }>Add</button>
            </div>
            <div className = "table-main">
                <div className = "header-wrapper">
                    <span>To Do</span>
                    <span>Action</span>
                </div>
                {
                todolist.length ?
                todolist.map((value, index) => (
                    <TodoItem
                        key = {index}
                        index = {index}
                        value = {value}
                        deleteTodo = {deleteTodo}    
                        handleOnClickEdit = {handleOnClickEdit}
                    />
                )): <span>No record found!</span>
            }    
            {
                isUpdate ?
                <div className="form-wrapper">
                    <input 
                        type = "type"
                        name = "editTodo"
                        placeholder = " Update todolist"
                        value = {editTodo}
                        onChange = {handleOnChangeEdit}
                    />
                    <button onClick = { () => updateTodo(editIndex) }>Update</button>
                    <button onClick = { handleOnClickCancel }>Cancel</button>
                    </div> :''
            }      
            </div>
        </div>
        </>
    )
}

export default Todolist