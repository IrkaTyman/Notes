import React, {useContext} from 'react';
import '../style.css';
import {postLink,plusLink,starLink} from './images'
import {note,funcWithNote} from '../types'
import {Context} from '../context/context'

function NavPanel({post,children}:{post?:note}&{children?:React.ReactNode}) {
    const {state,dispatch} = useContext(Context)
    return (
        <nav>
        <h1 className="fs1_06rem logo" onClick={()=>dispatch({type:'home'})}>AppNote</h1>
        <div className={`notes_text jc_sb flex ai_c ${state.route!='home' ? 'nav_for_go_home' : ''}`}>
            <img src={postLink} alt="note" />
            <h2 className={`fs1_06rem ${state.route!=='home' ? 'toHome' : ''}`}
                onClick={()=>state.route != 'home' && dispatch({type:'home'})}>
                Заметки
            </h2>
        </div>
        {children}
      </nav>
                
    );
}

export default NavPanel;