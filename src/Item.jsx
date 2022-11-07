import React, {Component, createRef} from 'react';
export default class Item extends Component{
    constructor() {
        super();
        this.state={
            inEdit:false
        }
        this.inputs = React.createRef();
    }
    handleEdit=()=>{
        let {todo}=this.props;
        this.setState({inEdit:true},()=>{
            this.inputs.current.value = todo.value;
            this.inputs.current.focus();
        });
    }
    updataTodo=(e)=>{
        let {delTodo,editTodo,todo}=this.props;
        todo.value=e.target.value.trim();
        if(e.target.value.trim()===""){
            delTodo(todo);
        }else{
            editTodo(todo);
        }
        this.setState({inEdit:false});

    }
    render(){
        let {todo,delTodo,changeCompleted}=this.props;
        let {handleEdit,inputs,updataTodo}=this;
        let {inEdit}=this.state;
        let completed=todo.hasCompleted?"completed":"";
        let editing=inEdit?completed+" editing":completed;
        return(
            <li className={editing}>
                <div className="view">
                    <input type="checkbox" className="toggle" onChange={()=>changeCompleted(todo)} checked={todo.hasCompleted}/>
                    <label onDoubleClick={handleEdit}>{todo.value}</label>
                    <button className="destroy" onClick={()=>delTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref={inputs} onBlur={inEdit?e=>updataTodo(e):null}
                onKeyUp={e=>{
                if(e.key==="Escape"){
                    this.setState({inEdit:false});
                    return ;
                }
                if(e.key!=="Enter") return;
                updataTodo(e);
                }
                }/>
            </li>
        )
    }
}