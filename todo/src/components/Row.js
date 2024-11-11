import React from 'react';
import "../home.css"

export default function Row({item, deleteTask }) {
    return(
        <li key={item.id}>{item.description} 
        <button className="delBtn" onClick={() => deleteTask(item.id)}>Delete</button>
        </li>
    )
}