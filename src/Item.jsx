import React,{Component} from "react";
export default class Item extends Component{
    constructor(){
        super();
        this.state={
            inEdit:false
        }
        this.inputs=React.createRef();
    }
    changeEdit=()=>{
        let {todo}=this.props;
        this.setState({inEdit:true},()=>{
            this.inputs.current.value=todo.value;
            this.inputs.current.focus();
        });
        
        
    }
    updataTodo=(e)=>{
        let {editTodo,todo,delTodo}=this.props;
        todo.value=e.target.value.trim();
        if(e.target.value.trim()===""){
            delTodo(todo);
        }else{
            editTodo(todo);
        }
        this.setState({
            inEdit:false
        })
    }
    render(){
        let {todo,delTodo,changeCompleted}=this.props;
        let {changeEdit,inputs,updataTodo}=this;
        let {inEdit}=this.state;
        let completed=todo.hasCompleted?"completed":"";
        let editing=inEdit?completed+" editing":completed;
        return(
            <li className={editing}>
                <div className="view">
                    <input type="checkbox" className="toggle" onChange={()=>changeCompleted(todo)} checked={todo.hasCompleted}/>
                    <label onDoubleClick={changeEdit}>{todo.value}</label>
                    <button className="destroy" onClick={()=>delTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref={inputs} onBlur={inEdit?updataTodo:null} 
                onKeyUp={(e)=>{
                    if(e.key==="Escape"){
                        this.setState({
                            inEdit:false
                        });
                        return;
                    }
                    else if(e.key!=="Enter")return;
                    updataTodo(e);
                }}/>
            </li>
        )
    }
}
