import { ICommunicationBus, IModule } from 'kornel';
import React, { useState, KeyboardEvent  } from 'react';

import './style.css';

// dirty demo code
// grab an id to create piece of rendering
// update rendering whenever an event goes through the bus

interface ITodo {
  key: string,
  status: boolean;
  description: string;
}

type ITodoProps = {
  todo: ITodo;
  bus: ICommunicationBus
};

type WidgetProps = {
  bus: ICommunicationBus,
  style?:Record<string,string|number>,
  properties?:{
    title?:string,
    defaultTodos?:string[]
  }
}

const TodoItem: React.FC<ITodoProps> = ({todo, bus}:ITodoProps) => {

  let [checked, setChecked] = useState(todo.status);
  
  const handleCheckboxChange = () => {
    setChecked(!checked); 
    bus.emit('TODO', {payload:{description:todo.description, action:checked ? 'uncheck':'check'}});
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checked}
        />
        {todo.description}
      </label>
    </li>
  );
}

const Todo:React.FC<{bus:ICommunicationBus, defaultTodos:string[]}> = ({bus, defaultTodos}) => {
  console.log('default todos', defaultTodos)
  let [todoInput, setTodoInput] = useState<string>('');
  let [todos, setTodo] = useState<ITodo[]>(defaultTodos.map((todo, index)=>{return {key:index.toString(), status:false, description:todo}}));
  let [count, setCount] = useState<number>(defaultTodos.length);

  const onClick = ():void => {
    if (todoInput === ''){
      return;
    }
    setCount(count+1);
    setTodo((currentValue)=>[{key:Number(count++).toString(), status:false, description:todoInput}, ...currentValue]);
    setTodoInput('');
    bus.emit('TODO', {payload:{description:todoInput, action:'add'}});
  }

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }
  
  return (
    <div className="todo-container" style={{}}>
      <input 
        type="text" 
        value={todoInput} 
        placeholder='add task' 
        onChange={e => setTodoInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onClick}>Add todo</button>
      <ul>
        {todos.map((todo)=><TodoItem todo={todo} key={todo.key} bus={bus}/>)}
      </ul>
    </div>
  )
}

export const TodoModule = function():IModule{
  let communicationBus:ICommunicationBus; 

  const TodoDashboardTile: React.FC<WidgetProps> = ({style, properties}) => {
    const title = properties?.title || 'Todo'; 
    console.log('props',properties)
    return (
      <div className="todo-tile" style={style}>
        <h4>{title}</h4>
        <Todo bus={communicationBus} defaultTodos={properties?.defaultTodos? properties.defaultTodos:[]}/>
      </div>
    )
  }

  return {
      initialize:function(bus):void {
        communicationBus = bus;
        bus.emit('REGISTER_DASHBOARD_WIDGET', {
            payload:{
              id:'todo-dashboard-tile', 
              widget:TodoDashboardTile, 
              bus:bus
            }
          }
        )
      },
      start(){
        // nop
      }
    }
  } 