import React,{useContext} from 'react';
import '../style.css';
import {pencilLink, removeLink, starLink} from './images'
import {note,funcWithNote} from '../types'
import {Context} from '../context/context'

type fuc = {
    deleteNote:() => void}

function Note({deleteNote,data}:funcWithNote&{data:note}) {
    const ls = window.localStorage
    const {state,dispatch} = useContext(Context)
    const dateObj = new Date(data.changeTime || data.creationTime || 0)
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
    const toGoNote = (e:React.MouseEvent<HTMLElement>) => {
        let className = (e.target as Element).className
        if( className !== 'delete_btn' && className !== 'edit_btn'){
            dispatch({type:'to_see_note',payload:data})
        }      
    }
    return (
        <div className="note" style={{backgroundColor: `hsl(${data.theme||ls.getItem(data.id+'')||'37,100%,72%'})`}} onClick={(e) => toGoNote(e)}>
            <div className="top_note flex jc_sb ai_c">
                <p className="date">{`${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`}</p>
                <div className="priority">
                {data.priority === 2 ? 
                    <div className="circle_with_img circle_with_2img flex ai_c jc_sb">
                        <img src={starLink} alt="priority" />
                        <img src={starLink} alt="priority" />
                    </div> :
                data.priority === 1 ? 
                    <div className="circle_with_img flex ai_c">
                        <img src={starLink} alt="priority" />
                    </div> : null}              
                </div>
            </div>
            <h2 className="title fs1_125rem">{data.title}</h2>
            {data.description && 
                    <p className="description fs1_06rem" dangerouslySetInnerHTML={{__html: data.description.replace(/\n/g,'<br/>')}}></p>}     
            <div className="bottom flex">
                <div className="circle_with_img flex ai_c delete_btn" onClick = {() => {deleteNote(data.id)}}>
                    <img src={removeLink} alt="remove note" className="delete_btn" />
                </div>
                <div className="circle_with_img flex ai_c edit_btn">
                    <img src={pencilLink} alt="edit note" className="edit_btn" onClick = {()=>dispatch({type:'edit',payload:data})}/>
                </div> 
            </div>
        </div>
                
    );
}

export default Note;