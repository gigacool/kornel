import { BusInterface, ModuleInterface } from 'kornel';
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
  bus: BusInterface
};

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

const Todo:React.FC<{bus:BusInterface}> = ({bus}) => {
  let [todoInput, setTodoInput] = useState<string>('');
  let [todos, setTodo] = useState<ITodo[]>([]);
  let [count, setCount] = useState<number>(0);

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
    <div className="todo-container">
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

export const TodoModule = function():ModuleInterface{
  let communicationBus:BusInterface; 

  const TodoDashboardTile: React.FC<{bus:BusInterface}> = ({bus:BusInterface}) => {
    return (
      <div className="todo-tile">
        <h4>Todo</h4>
        <Todo bus={communicationBus}/>
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