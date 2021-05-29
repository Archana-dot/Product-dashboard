import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../../redux/Action';
import Popup from './Popup';
import '../../assets/css/dashboard.css';
import { BrowserRouter, Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';



function Dashboard(props) {

    const [toDo, setToDo] = useState([])
    const [tested, setTested] = useState([])
    const [completed, setCompleted] = useState([])
    const [progressing, setProgressing] = useState([])

    const [show, setShow] = useState('')
    const [userLog, setuserLog] = useState('')
    const [addPopup, setaddPopup] = useState(false);
    const [task, setTask] = useState([])

    useEffect(() => {
        var user = localStorage.getItem("currentUsername")
        setuserLog(user)
        const data = JSON.parse(localStorage.getItem('USER_TASKS'));
        setTask(data);

        if(data){
            var resullt = data.filter(item => item.category === 'Todo' && item.currentUsername === user);
            setToDo(resullt)
            setCompleted(data.filter(item => item.category === 'Complete' && item.currentUsername === user))
            setTested(data.filter(item => item.category === 'Tested' && item.currentUsername === user))
            setProgressing(data.filter(item => item.category === 'Progressing' && item.currentUsername === user))
        }
    }, []);

    useEffect(() => {
        if (props.task && props.task !== {}) {
            var user = localStorage.getItem("currentUsername")
            setuserLog(user)            
            var details = JSON.parse(localStorage.getItem("USER_TASKS"))
            if (details === null) {
                details = [];
                details.push(props.task)
                setTask(details)
                window.localStorage.setItem('USER_TASKS', JSON.stringify(details))
            }
            else {
                details.push(props.task)
                setTask(details)
                window.localStorage.setItem('USER_TASKS', JSON.stringify(details))
            }
            setToDo(details.filter(item => item.category === 'Todo' && item.currentUsername === userLog))
            setProgressing(details.filter(item => item.category === 'Progressing' && item.currentUsername === userLog))
            setCompleted(details.filter(item => item.category === 'Complete' && item.currentUsername === userLog))
            setTested(details.filter(item => item.category === 'Tested' && item.currentUsername === userLog))
            props.addCard(null)
        }
    }, [props.task]);
     
    function handleDrag(e, item) {
        e.dataTransfer.setData("item", JSON.stringify(item))
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onDrop(e, selectedTask) {
        let item = JSON.parse(e.dataTransfer.getData("item"))
        const data = task;
        let index = task.findIndex(tasks => (tasks.Title === item.Title && tasks.Description === item.Description && tasks.category === item.category))
        item.category = selectedTask
        data[index] = item
        setTask(data)
        const dataUpdatedBefore = JSON.parse(localStorage.getItem('USER_TASKS'));

        console.log("Before the  LOCAL STORAGE updation ",dataUpdatedBefore)

        window.localStorage.setItem('USER_TASKS', JSON.stringify(task))
        const dataUpdated = JSON.parse(localStorage.getItem('USER_TASKS'));

        console.log("Update the task values inside LOCAL STORAGE ",dataUpdated)
        
        setToDo(data.filter(item => item.category === 'Todo' && item.currentUsername === userLog))
        setCompleted(data.filter(item => item.category === 'Complete' && item.currentUsername === userLog))
        setTested(data.filter(item => item.category === 'Tested' && item.currentUsername === userLog))
        setProgressing(data.filter(item => item.category === 'Progressing' && item.currentUsername === userLog))

    }

    function popUp(selectedTask) {
        setShow(selectedTask)
        setaddPopup(!addPopup)
    }

          
    return (
        <div className="dashboard">
            <div className='task' onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'Todo')}>
                <div class="task-status">To Do</div>
                <div className="task-item">
                {toDo.map((item) => (
                    <div className="box">
                        <div 
                            draggable
                            onDragStart={(e) => handleDrag(e, item)}>
                            <span className="heading">
                                {item.Title}
                            </span>
                            <div className='description'>{item.Description}</div><br />
                        </div>
                    </div>
                ))}
                </div>
                <button onClick={() => popUp("Todo")}>Add a card</button>
                {addPopup && <Popup select={show} handleClose={popUp} />}
            </div>

            <div className='task' onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, 'Tested')}>
                <div class="task-status">Tested</div>
                <div className="task-item">
                    {tested.map((item) => (
                        <div className="box">
                            <div className='item' draggable
                                onDragStart={(e) => handleDrag(e, item)}>
                                <span className="heading">
                                    {item.Title}
                                </span>
                                <div className='description'>{item.Description}</div><br />
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => popUp("Tested")}>Add a card</button>
                { addPopup  && <Popup select={show} handleClose={popUp} />}
            </div>

            <div className='task' onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, 'Progressing')}>
                <div class="task-status">Progressing</div>
                <div className="task-item">
                    {progressing.map((item) => (
                        <div className="box">
                            <div className='item' draggable
                                onDragStart={(e) => handleDrag(e, item)}>
                                <span className="heading">
                                    {item.Title}
                                </span>
                                <div className='description'>{item.Description}</div><br />
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => popUp("Progressing")}>Add a card</button>
                {addPopup && <Popup select={show} handleClose={popUp} />}
            </div>
            
            <div className='task' onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, 'Complete')}>
                <div class="task-status">Completed</div>
                <div className="task-item">
                    {completed.map((item) => (
                        <div className="box">
                            <div className='item' draggable
                                onDragStart={(e) => handleDrag(e, item)}>
                                <span className="heading">
                                    {item.Title}
                                </span>
                                <div className='description'>{item.Description}</div><br />
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => popUp("Complete")}>Add a card</button>
                {addPopup && <Popup select={show} handleClose={popUp} />}
            </div>
        </div>
    )
}
const mapStateToProps = ({ addCard }) => {
    return {
        task: addCard.objects
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (new_obj) => { dispatch(addCard(new_obj)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);