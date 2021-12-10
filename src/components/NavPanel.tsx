import React, {useContext} from 'react';
import '../style.css';
import {postLink} from './images'
import {note} from '../types'
import {Context} from '../context/context'

function NavPanel({children}:{post?:note}&{children?:React.ReactNode}) {
    const {state,dispatch} = useContext(Context)
    return (
        <nav>
        <h1 className="fs1_06rem logo" onClick={()=>dispatch({type:'home'})}>AppNote</h1>
        <div className='notes_text jc_sb flex ai_c'>
            <img src={postLink} alt="note" />
            <h2 className='fs1_06rem '
                onClick={()=>state.route !== 'home' && dispatch({type:'home'})}>
                Заметки
            </h2>
        </div>
        {children}
      </nav>
                
    );
}

export default NavPanel;