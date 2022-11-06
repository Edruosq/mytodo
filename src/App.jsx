import React,{Component} from "react";
import "@/css/index";
import Item from "./Item";
import Footer from "./Footer";
export default class App extends Component{
    constructor(){
        super();
        this.state={
            todoDatas:[],
            todoNum:0,
            view:"all",
            flag:false
        }
        this.check=React.createRef();
    }
    //添加todo
    addTodo=(e)=>{
        if(e.key!=="Enter") return ;
        if(e.target.value.trim()===""){
            e.target.value="";
            return ;
        }
        let {todoDatas,todoNum}=this.state;
        let todo={};
        todo.id=Date.now();
        todo.value=e.target.value.trim();
        todo.hasCompleted=false;
        todoDatas.push(todo);
        todoNum++;
        this.setState({todoDatas,todoNum});
        e.target.value="";
    }
    //删除todo
    delTodo=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(todo.id===value.id){
                if(!todo.hasCompleted){
                    todoNum--;
                }
                return false;
            }
            return true;
        })
        if(todoDatas.length===0){
            this.check.current.checked=false;
        }
        this.setState({todoDatas,todoNum});
    }
    //改变hasCompleted状态
    changeCompleted=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.map(value=>{
            if(todo.id===value.id){
                value.hasCompleted=!todo.hasCompleted;
                if(todo.hasCompleted){
                    todoNum--;
                }else{
                    todoNum++;
                }
            }
            return value;
        })
       this.check.current.checked=todoNum===0?true:false;
        this.setState({todoDatas,todoNum});
    }
    //编辑todo
    editTodo=(todo)=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.map(value=>{
            if(todo.id===value.id){
                value.value=todo.value;
            }
            return value;
        })
        this.setState({todoDatas});
    }
    //清除已完成
    clearCompleted=()=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted){
                return false;
            }
            return true;
        })
        if(todoDatas.length===0){
            this.check.current.checked=false;
        }
        this.setState({todoDatas});
    }
    //过滤
    todoFilter=(view)=>{
        this.setState({view});
    }
    //全选全不选
    isAll=()=>{
        let {todoDatas,todoNum,flag}=this.state;
        flag=!flag;
        if(flag){
        todoDatas=todoDatas.map(value=>{
           
                value.hasCompleted=true;
                return value;
        })
               todoNum=0; 
            }else{
                todoDatas=todoDatas.map(value=>{
           
                    value.hasCompleted=false;
                    return value;
            })
                   todoNum=todoDatas.length; 
            }
      this.setState({todoDatas,todoNum,flag});
    }
    render(){
        let {addTodo,delTodo,changeCompleted,check,editTodo,todoFilter,clearCompleted,isAll}=this;
        let {todoDatas,todoNum,view}=this.state;
        let filterTodo=todoDatas.filter(value=>{
            switch(view){
                case "all":
                    return true;
                case "active":
                    return !value.hasCompleted;
                case "complete":
                    return value.hasCompleted;
                default:
                    return true;
            }
        })
        let items=filterTodo.map(todo=>{
             return (
             <Item todo={todo} key={todo.id} delTodo={delTodo} changeCompleted={changeCompleted} editTodo={editTodo}/>
             )
        })
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyUp={addTodo}/>
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all"  id="toggle-all" ref={check}/>
                    <label htmlFor="toggle-all" onClick={isAll}></label>
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
                <Footer todoDatas={todoDatas} todoNum={todoNum} view={view} todoFilter={todoFilter} clearCompleted={clearCompleted}></Footer>
            </section>
        )
    }
}