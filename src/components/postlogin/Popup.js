import React, { useState } from 'react';
import { connect } from 'react-redux'
import { POPUP } from '../../validator';
import { addCard } from '../../redux/Action';
import '../../assets/css/addcard.css'

function Popup(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [titleErrorMsg, setTitleErrorMsg] = useState('')
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")
    
    function handleAddChange(e) {
        if (e.target.name === "title")
            setTitle(e.target.value)
        if (e.target.name === "description")
            setDescription(e.target.value)
    }
        function addCards() {
            console.log("inside POP UP ADDCARD")
            var selected = props.select
            var userLog = localStorage.getItem("currentUsername")
            const data = { Title: title, Description: description, category: props.select, currentUsername: userLog }
            console.log("<<<<<DATA ADDDED TO CONDOLE : " , data);
            props.addCard(data)
            props.handleClose()
            console.log("end of POP UP ADDCARD")
        }
        
    return (
        <div className='addCard'>
            <div className='addCards'>
                <div className='heading'>
                    <h4>Add Cards</h4>  {props.select}</div>
                <form className='form'>
                    <br /> <input type='text' placeholder='Title' name='title'
                        onChange={handleAddChange} value={title} required />
                    <br /><span className="error">{titleErrorMsg}</span>
                    <br /><textarea type='text' placeholder='Description' name='description'
                        onChange={handleAddChange} value={description} required /> <br />
                    <span className="error">{descriptionErrorMsg}</span>
                </form>
                // <br /><button onClick={addCards}>Add</button> &nbsp;
                    <button onClick={props.handleClose}>Cancel</button>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        addCard: new_obj => { dispatch (addCard(new_obj)) }
    };
};
export default connect(null, mapDispatchToProps)(Popup);