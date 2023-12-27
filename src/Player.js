import React from 'react';
export default function Player({name,symbol,isActive,onChangeName}){
    const [isEditing, setIsEditing]=React.useState(false)
    const [newName,setNewName]=React.useState(name)
    function Editing(){
        setIsEditing((editing)=>!editing);
        if(isEditing){
        onChangeName(symbol,newName)
        }
    }
    let buttonCap="edit"
    var inputField=<span className="player-name">{newName}</span>
    if (isEditing){
        inputField=<input type="text"  value={newName} required onChange={(e)=>{setNewName(e.target.value)}}/>
        buttonCap='save'
    }
    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
              {inputField}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={Editing}>{buttonCap}</button>
        </li>
    )
}