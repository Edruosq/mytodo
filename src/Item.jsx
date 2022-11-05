import React, { Component } from 'react'

export default class Item extends Component {
    constructor(){
        super();
        this.state={
            inEdit:false,
        }
        this.inputs=React.createRef();
    }
    handleEdit=()=>{
        let {todo}=this.props;
        this.setState({
            inEdit:true
        },()=>{
            this.inputs.current.value=todo.title;
            this.inputs.current.focus();
        })
    }
    todoUpdate=()=>{
        let {todo,editTodo,delTodo}=this.props;
        todo.title=this.inputs.current.value.trim();
        if(todo.title===""){
            delTodo(todo);
            return;
        }
        editTodo(todo);
        this.setState({
            inEdit:false
        })
    }
    render() {
        let {todo,delTodo,changeCompleted,editTodo}=this.props;
        let {inEdit}=this.state;
        let {inputs,handleEdit,todoUpdate}=this;
        let completed=todo.hasCompleted?"completed":"";
        let editing=inEdit?completed+" editing":completed;
        return (
            <li className={editing}>
                <div className='view'>
                    <input type="checkbox" className="toggle" onChange={()=>{
                        changeCompleted(todo)}} 
                    checked={todo.hasCompleted}/>
                    <label onDoubleClick={handleEdit}>{todo.title}</label>
                    <button className='destroy' onClick={()=>delTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref={inputs} onBlur={inEdit?todoUpdate:null} 
                onKeyUp={(e)=>{
                    if(e.key==="Escape"){
                        this.setState({
                            inEdit:false
                        })
                        return;
                    }
                    if(e.key!=="Enter")return;
                    todoUpdate();
                }}/>
            </li>
        )
    }
}
 