import React, { Component } from 'react';
import './css/index';
import Item from './Item';
import Footer from './Footer';
export default class App extends Component {
    constructor(){
        super();
        this.state={
            todoDatas:[],//存储所有todo的数组
            todoNum:0,
            view:"all",
            flag:false
        }
        this.check=React.createRef();
    } 
    //添加todo
    addTodo=(e)=>{
        if(e.key!=="Enter")return;
        if(e.target.value.trim()===""){
            e.target.value="";
            return;
        }
        let{todoDatas,todoNum}=this.state;
        let todo={};
        todo.id=Date.now();
        todo.title=e.target.value.trim();
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
    }
    //编辑todo
    changeCompleted=(todo)=>{
        let{todoDatas,todoNum}=this.state;
        
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
        
        this.setState({todoDatas,todoNum});
        if(todoNum===0){
            this.check.current.checked=true;
        }else{
            this.check.current.checked=false;
        }
    }
    editTodo=(todo)=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.map(value=>{
            if(todo.id===value.id){
                value.title=todo.title;
            }
            return value;
        })
        this.setState({todoDatas});
    }
    //过滤
    changeView=(view)=>{
        this.setState({view});
    }
    //清除所有已完成的todo
    clearCompleted=()=>{
        let{todoDatas}=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted===true){
                return false;
            }
            return true;
        })
        this.setState({todoDatas});
    }
    //全选，全不选
    isAll=()=>{
        let{flag,todoDatas,todoNum}=this.state;
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
    render() {
        let {todoDatas,todoNum,view}=this.state;
        let {addTodo,delTodo,changeCompleted,editTodo,changeView,isAll,clearCompleted}=this;
        let filterTodo=todoDatas.filter(value=>{
            switch (view){
                case 'all':
                    return true;
                case 'active':
                    return !value.hasCompleted;
                case 'completed':
                    return value.hasCompleted;
                default :
                return true;
            }
        })
        let items=filterTodo.map(todo=>{
            return(
                <Item todo={todo} key={todo.id} delTodo={delTodo} changeCompleted={changeCompleted} 
                editTodo={editTodo}/>
            )
        })
        return (
            <div>
                <section className='todoapp'>
                    <header className='header'>
                        <h1>Todos</h1>
                        <input type="text" className='new-todo' placeholder='What needs to be done? '
                        onKeyUp={addTodo}/>
                    </header>
                    <section className='main'>
                        <input type="checkbox" className="toggle-all" id="toggle-all" 
                        ref={this.check} />
                        <label htmlFor="toggle-all" onClick={isAll}></label>
                        <ul className='todo-list'>
                            {items}
                        </ul>
                        <Footer todoDatas={todoDatas} todoNum={todoNum} changeView={changeView} view={view} clearCompleted={clearCompleted}/>
                    </section>
                </section>
            </div>
        )
    }
}
