import React,{useState,useContext} from 'react';
import '../style.css';
import {Context} from '../context/context'
import type {homeProps} from '../types'
import {sortByDateFilter,sortByPriority} from '../function/sortFunction'
import {note} from '../types'

// Img
import {downArrowLink, plusLink,starLink} from '../components/images'

//Components
import Note from '../components/Note'
import NavPanel from '../components/NavPanel'

function Home({deleteNote,afterFilter,data}:homeProps) {
    const [typeFilter,setTypeFilter] = useState('date') 
    const [activeFilterBlock,setActiveFilterBlock] = useState(false)
    const windowWidth = document.documentElement.clientWidth
    const {state,dispatch} = useContext(Context)
    const newPost:note = {id:state.lastIdOfNote+1,priority:0,title:'',description:'',theme:'37,100%,72%',creationTime:Date.now()} 
    return (
    <div className="App home_page">
      <NavPanel post={newPost}>
        <div className="container_priority">
          <h2 className="fs1rem">{windowWidth > 700 ? 'Приоритеты' : 'Заметки'}</h2>
          <div className="type_priority flex ai_c">
            <p className="fs1rem">Высокий</p>
            <img src={starLink} alt="priority-2" />
            <img src={starLink} alt="priority-2" />
          </div>
          <div className="type_priority flex ai_c">
             <p className="fs1rem">Средний</p>
              <img src={starLink} alt="priority-1" />
          </div>
          <div className="type_priority">
             <p className="fs1rem">Низкий</p>
          </div>
        </div>
        <div className="new_note flex ai_c" onClick={()=> dispatch({type:'to_go_page_with_data',payload:{note:newPost,nameOfPage:'addNote'}})}>
          <h2 className="fs1rem">Создать</h2>
          <div className="circle_with_img flex ai_c">
            <img src={plusLink} alt="new order" />
          </div>
        </div>
      </NavPanel>
      <main>
          <div className="container_with_filter flex ai_c">
              <p>Сортировать:</p>
              <div className="container_only_filter">
                <div className="mobile_sort_active" onClick={()=> setActiveFilterBlock(!activeFilterBlock)}>
                  {typeFilter === 'date' ? 
                    <p className="filter">По дате</p> :
                    typeFilter==='upgrade' ?
                    <p className="filter upgrade_filter flex ai_c ">
                      По <img src={downArrowLink} alt='sort by upgrade priority'/> приоритета
                    </p> :
                    <p className="filter flex ai_c">
                      По <img src={downArrowLink} alt='sort by upgrade priority'/> приоритета
                    </p>
                  }
                </div>
                <div className="mobile_sort_container flex" style={{display: (activeFilterBlock || windowWidth > 540) ? 'flex' : 'none'}}>
                  <p className="filter upgrade_filter flex ai_c" 
                      onClick = {() => {
                        setTypeFilter('upgrade')
                        setActiveFilterBlock(false)
                        afterFilter(sortByPriority(data,-1))
                        }}>
                      По <img src={downArrowLink} alt='sort by upgrade priority'/> приоритета
                  </p>
                  <p className="filter flex ai_c" 
                    onClick = {() => {
                      setTypeFilter('down')
                      setActiveFilterBlock(false)
                      afterFilter(sortByPriority(data,1))
                      }}>
                    По <img src={downArrowLink} alt='sort by upgrade priority'/> приоритета
                  </p>
                  <p className="filter" 
                    onClick = {() => {
                      setTypeFilter('date')
                      setActiveFilterBlock(false)
                      afterFilter(sortByDateFilter(data))
                      }}>По дате
                  </p>
                </div>
              </div>
          </div>
          <div className="container_notes">
              {data[0] && data.map((item,i) => {
                  return <Note deleteNote = {deleteNote} key ={i} data={item}/>
              })}           
          </div>
      </main>
    </div>
  );
}

export default Home;