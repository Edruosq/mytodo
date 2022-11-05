import React, { Component } from 'react'
export default class Footer extends Component {
    render() {
        let {todoDatas,todoNum,changeView,view,clearCompleted}=this.props;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted===true){
                return true;
            }
            return false;
        })
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong> {todoNum} </strong>
                    <span>{todoNum<2?"item":"items"} left</span>{/*显示几条*/}
                </span>
                <ul className='filters'>
                    <li>
                        <a href="#/all" className={view==="all"?"selected":""} onClick={()=>changeView("all")}>All</a>
                    </li>
                    <li>
                        <a href="#/active" className={view==="active"?"selected":""} onClick={()=>changeView("active")}>Active</a>
                    </li>
                    <li>
                        <a href="#/complete" className={view==="completed"?"selected":""} onClick={()=>changeView("completed")}>Complete</a>
                    </li>
                </ul>
                {todoDatas.length>0?<button className='clear-completed' onClick={clearCompleted}>Clear completed</button>:null}
            </footer>
        )
    }
}
