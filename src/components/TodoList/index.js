import React from 'react'
import NewTask from '../NewTask'
import ShowList from '../ShowList'
import "./TodoList.scss"
export default function TodoList() {
  return (
    <div className='todoList_Wrapper'>
        <div className="newTask">
            <NewTask/>
        </div>
        <div className="showList">
            <ShowList/>
        </div>
    </div>
  )
}
