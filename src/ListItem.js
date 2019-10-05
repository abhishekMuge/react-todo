import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item text-muted">
          <button className="btn btn-sm btn-info mr-4" onClick={props.editTodo}>U</button>
          {props.item.name}
          
            <button className="btn btn-sm btn-danger ml-4" onClick={props.deleteTodo}>X</button>
          
          </li>;
}

export default ListItem;