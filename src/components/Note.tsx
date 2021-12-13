import React,{useContext,useState} from 'react';
import '../style.css';
import {pencilLink, plusLink, removeLink, starLink} from './images'
import {note,funcWithNote} from '../types'
import {Context} from '../context/context'
import { deleteApi } from '../function/apiFunction';
import { useNavigate,Link } from 'react-router-dom';

function Note({deleteNote,data}:funcWithNote&{data:note}) {
    const {dispatch} = useContext(Context)
    const ls = window.localStorage
    const dateObj = new Date(data.changeTime || data.creationTime || 0)
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
    const navigation = useNavigate()
    const [deleteBool,setDelete] = useState(false)

    const toGoNote = (e:React.MouseEvent<HTMLElement>) => {
        let className = (e.target as Element).className
        console.log(className)
        if( className.split(' ')[0] !== 'delete_btn' && className !== 'edit_btn' && className.split(' ')[1] !== 'delete_no_note'){
            dispatch({type:'set_note',payload:data})
            navigation('/note')
        }      
    }
    return (
        <div className="note" style={{backgroundColor: `hsl(${data.theme||ls.getItem(data.id+'')||'37,100%,72%'})`}} onClick={(e) => toGoNote(e)}>
            <div className="delete_popup delete_no_note ai_c" style={{display:deleteBool ? 'flex' : 'none',backgroundColor: `hsl(${data.theme||ls.getItem(data.id+'')||'37,100%,72%'})`}} onClick={(e) => toGoNote(e)}>
                <div className="close delete_no_note circle_with_img flex ai_c" onClick={()=> setDelete(false)}>
                    <img src={plusLink} alt=""className="img delete_no_note" />
                </div>
                <h1 className="fs1_06rem">Удалить заметку?</h1>
                <div className="delete_popup__buttons delete_no_note">
                    <button className='fs1rem delete_no_note' onClick={()=> {
                        deleteNote(data,deleteApi)
                        setDelete(false)
                    }}>Да</button>
                    <button className='fs1rem delete_no_note' onClick={()=> setDelete(false)}>Нет</button>
                </div>
            </div>
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
                <div className="delete_btn circle_with_img flex ai_c " onClick={()=> setDelete(true)}>
                    <img src={removeLink} alt="remove note" className="delete_btn" />
                </div>
                <Link to='/edit' className="circle_with_img flex ai_c edit_btn"onClick = {()=>dispatch({type:'set_note',payload:data})}>
                    <img src={pencilLink} alt="edit note" className="edit_btn" />
                </Link>
            </div>
        </div>
                
    );
}

export default Note;