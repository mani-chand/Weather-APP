import React from 'react';
import './../App.css'
import { AiFillDelete } from "react-icons/ai";
const List = props => {
  console.log(props);
    return ( 
        <li key={props.data.id.toString()}>
 <div className='list__item'>
     <div className='item-outer'>
            <div className="item-inner">
            <div>City:{props.data.city}</div>
            <div>Temperature:{props.data.temperature}°C</div>
            <div><button onClick={()=>props.del(props.data.id)} ><AiFillDelete size={35}/></button></div>
            </div>
     </div>
     </div>
        </li>
     );
}
 
export default List;