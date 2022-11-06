import React,{Component} from "react";
export default class Footer extends Component{
    render(){
        let {todoDatas,todoNum,view,todoFilter,clearCompleted}=this.props;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted){
                return true;
            }
            return false;
        })
        return(
            <footer className="footer">
                <span className="todo-count">
                    <strong> {todoNum} </strong>
                    <span> {todoNum<2?"item":"items"} left</span>
                </span>
                <ul className="filters">
                    <li><a href="#/all" className={view==="all"?"selected":""} onClick={()=>todoFilter("all")}>All</a></li>
                    <li><a href="#/active" className={view==="active"?"selected":""} onClick={()=>todoFilter("active")}>Active</a></li>
                    <li><a href="#/complete" className={view==="complete"?"selected":""} onClick={()=>todoFilter("complete")}>Complete</a></li>
                </ul>
                {todoDatas.length>0?<button className="clear-completed" onClick={clearCompleted}>Clear Completed</button>:null}
            </footer>
        )
    }
}