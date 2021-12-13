import React, {useContext} from 'react';
import '../style.css';
import {postLink} from './images'
import {note} from '../types'
import {Context} from '../context/context'
import { Link } from 'react-router-dom';

function NavPanel({children}:{post?:note}&{children?:React.ReactNode}) {
    const {state,dispatch} = useContext(Context)
    return (
        <nav>
        <Link to='/'>
            <h1 className="fs1_06rem logo">AppNote</h1>
        </Link>
        <Link to='/'  className='notes_text jc_sb flex ai_c'>
            <img src={postLink} alt="note" />
            <h2 className='fs1_06rem '>Заметки</h2>
        </Link>           
        {children}
      </nav>
                
    );
}

export default NavPanel;