import React,{useContext} from 'react';
import '../style.css';
import {Context} from '../context/context'
import type {editOrAddPageProps} from '../types'

// Img
import {pencilLink, removeLink, starLink,arrowLink} from '../components/images'

//Components
import NavPanel from '../components/NavPanel';
import { deleteApi } from '../function/apiFunction';
import { Link } from 'react-router-dom';

function NotePage({deleteNote}:editOrAddPageProps) {
    const ls = window.localStorage
    const {state,dispatch} = useContext(Context)

    return (
    <div className="App note_page">
        <NavPanel/>
        <div className="container_edit_add flex" style={{backgroundColor:`hsl(${state.note.theme||ls.getItem(state.note.id+'')||'37,100%,72%'})`}}>
            <div className="top_note_page top_panel flex">
                <Link to='/' className="come_back flex ai_c">
                    <img src={arrowLink} alt="come back to home" />
                    <h2 className="fs1_06rem">На главную</h2>
                </Link>
                <Link to='/edit' className="field_with_action flex ai_c" onClick={()=>dispatch({type:'set_note',payload:state.note})}>
                    <h2 className="fs1_06rem">Редактировать</h2>
                    <div className='circle_with_img flex ai_c active_circle_with_img'>
                        <img src={pencilLink} alt="edit note" />
                    </div>
                </Link>
                <div className="field_with_action flex ai_c" onClick = {() => {deleteNote&&deleteNote(state.note,deleteApi)}}>
                    <h2 className="fs1_06rem ">Удалить</h2>
                    <div className='circle_with_img flex ai_c active_circle_with_img'>
                        <img src={removeLink} alt="edit note" />
                    </div>
                </div>
            </div>
            <div className="note_field" style={{backgroundColor:`hsl(${state.note.theme||ls.getItem(state.note.id+'')||'37,100%,72%'})`}}>
                {state.note.priority === 2
                ?<div className="priority_block circle_with_img circle_with_2img flex ai_c jc_sb active_circle_with_img">
                    <img src={starLink} alt="priority" />
                    <img src={starLink} alt="priority" />
                </div>
                : state.note.priority === 1
                ? <div className="priority_block circle_with_img flex ai_c active_circle_with_img">
                    <img src={starLink} alt="priority" />
                </div> : null}
                
                <h2 className="title_edit">{state.note.title}</h2>
                <h2 className="description_edit fs1_125rem" dangerouslySetInnerHTML={{__html: state.note.description?.replace(/\n/g,'<br/>') || ''}}></h2>
            </div>
        </div>
    </div>
  );
}

export default NotePage;