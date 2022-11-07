import React,{Component} from "react";
import '@/css/index';
import Item from "./Item";
import Footer from "./Footer";
export default class App extends Component{
    constructor() {
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
        if (e.key!=="Enter") return;
        if (e.target.value.trim()===""){
            e.target.value="";
            return;
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
        this.setState({todoDatas,todoNum});
        if(todoDatas.length===0){
            this.check.current.checked=false;
        }
    }
    //改变完成状态
    changeCompleted=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.map(value=>{
            if (todo.id === value.id) {
                value.hasCompleted=!todo.hasCompleted;
                if (todo.hasCompleted){
                    todoNum--;
                }else{
                    todoNum++;
                }
            }
            return value;
        })
        this.setState({todoDatas, todoNum});
        this.check.current.checked=todoNum===0?true:false;
    }
    //编辑todo
    editTodo=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.map(value=>{
            if (todo.id === value.id) {
                value.value=todo.value;
            }
            return value;
        })
        this.setState({todoDatas,todoNum});
    }
    //过滤todo
    filterTodo=(view)=>{
        this.setState({view});
    }
    //清除已完成的todo
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
        this.setState({todoDatas})
    }
    //全选全不选
    isAll=()=>{
        let {todoDatas, todoNum, flag}=this.state;
        flag=!flag
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
        let {todoDatas,todoNum,view}=this.state;
        let {addTodo,check,isAll}=this;
        let filterTodos=todoDatas.filter(value=>{
            switch (view){
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
       let items=filterTodos.map(todo=>{
           return(
               <Item todo={todo} key={todo.id} {...this} {...this.state}/>
           )
        })
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyUp={addTodo} />
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" id="toggle-all" ref={check}/>
                    <label htmlFor="toggle-all" onClick={isAll}></label>
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
                <Footer {...this} {...this.state}/>
            </section>
        );
    }
}