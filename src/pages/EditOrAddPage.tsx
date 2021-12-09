import React,{useState,useContext} from 'react';
import '../style.css';
import {Context} from '../context/context'
import type {editOrAddPageProps} from '../types'

// Img
import {plusLink,postLink,starLink,checkLink} from '../components/images'
import NavPanel from '../components/NavPanel';

function EditOrAddPage({deleteNote,addNote,editNote}:editOrAddPageProps) {
    const ls = window.localStorage
    const {state,dispatch} = useContext(Context)
    const [required,setRequired] = useState(false)
    const [theme,setTheme] = useState<string>(state.note.theme || ls.getItem(state.note.id+'') || '37,100%,72%')
    const [priority,setPriority] = useState<0|1|2>(state.note.priority)
    const [title,setTitle] = useState(state.note.title)
    const [description,setDescription] = useState(state.note.description)
    

    const onSubmit = () => {
        if(title){
            editNote && editNote({id:state.note.id,title,description:description || '',theme,priority,creationTime:state.note.creationTime,changeTime:state.note.changeTime})
            addNote && addNote({id:state.lastIdOfNote+1,title,description:description || '',theme,priority,creationTime:Date.now()})
        } else {
            setRequired(true)
        }
    }
    return (
    <div className="App">
        <NavPanel/>
        <div className="container_edit_add flex" style={{backgroundColor:`hsl(${theme||ls.getItem(state.note.id+'')||'37,100%,72%'})`}}>
            <div className="top_panel flex">
                <div className="container_choice_theme flex ai_c">
                    <h2 className="fs1rem">Тема: </h2>
                    <div className="theme" onClick={()=> setTheme('37,100%,72%')}></div>
                    <div className="theme" onClick={()=> setTheme('17,100%,73%')}></div>
                    <div className="theme" onClick={()=> setTheme('261,100%,78%')}></div>
                    <div className="theme" onClick={()=> setTheme('190,100%,50%')}></div>
                    <div className="theme" onClick={()=> setTheme('66,100%,75%')}></div>
                </div>
                <div className="container_choice_priority flex ai_c">
                    <h2 className="fs1rem">Приоритет: </h2>
                    <div className={`circle_with_img ${priority == 0 ? 'active_circle_with_img' : ''}`} onClick={()=> setPriority(0)}></div>
                    <div 
                    className={`circle_with_img flex ai_c  ${priority == 1 ? 'active_circle_with_img' : ''}`} 
                    onClick={()=> setPriority(1)}>
                        <img src={starLink} alt="priority" />
                    </div>
                    <div 
                    className={`circle_with_img circle_with_2img flex ai_c jc_sb  ${priority == 2 ? 'active_circle_with_img' : ''}`} 
                    onClick={()=> setPriority(2)}>
                        <img src={starLink} alt="priority" />
                        <img src={starLink} alt="priority" />
                    </div>
                </div>
                <div 
                    className="circle_with_img flex ai_c  active_circle_with_img confirm" 
                    onClick={onSubmit}>
                    <img src={editNote ? checkLink : plusLink} alt="priority" />
                </div>   

            </div>
            {required ? <label htmlFor="title" className='fs1_0.6rem' style={{backgroundColor:`hsl(${theme.slice(0,theme.length-3)}${+theme.slice(-3,-1)-15}%)`}}>Необходимо ввести заголовок</label> : null}
            <input 
                required maxLength={30} 
                id="title" 
                placeholder='Заголовок' 
                className="title_edit" 
                value={title} 
                onChange={(e) => {
                    setTitle(e.target.value); 
                    setRequired(false)}}/>
            <textarea placeholder='Ваша заметка' className="description_edit fs1_125rem" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
    </div>
  );
}

export default EditOrAddPage;