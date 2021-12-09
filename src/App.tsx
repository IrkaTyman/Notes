import React,{useState,useEffect,useContext} from 'react';
import './style.css';
import Home from './pages/Home'
import {note} from './types'
import {sortByDateFilter} from './function/sortFunction'
import {Context} from './context/context'
import { loadAllApi, addApi, editApi,deleteApi,loadOneNoteApi } from './function/apiFunction';
import EditOrAddPage from './pages/EditOrAddPage';
import NotePage from './pages/NotePage';
import Loading from './pages/Loading';

function App() {
  const [notes,setNotes] = useState<note[]>([])
  const [begin,setBegin] = useState(false)
  const {state,dispatch} = useContext(Context)
  const localStorage = window.localStorage
  
  useEffect(()=>{
    async function loadApiForApp(){
      try{
        let data = await loadAllApi()
        if(data[0]){
          let lastId = data[data.length-1].id 
          const arr = sortByDateFilter(data)
          setNotes(arr) 
          dispatch({type:'set_last_id', payload:lastId})   
        }           
      } finally {
        setBegin(true)
      }
    }
    loadApiForApp()
  }, [])

  const addNote = async (item:note) => {
    // Получение newNote сделано, чтобы использовать все ф-ции Api, для функционала необязательно
    //Работа с Api и LocalStorage
    await addApi(item)
    const newNote = await loadOneNoteApi(item.id)
    localStorage.setItem(item.id+'', item.theme)

    const arrNotes:note[] = notes.slice()
    arrNotes.unshift(newNote)
    dispatch({type:'home'})
    setNotes(arrNotes)
  }
  const deleteNote = async (id:number) => {
    const arrayNotes:note[] = []
    notes.map((item,i) => {
      if(item.id !== id) arrayNotes.push(item)
    })
    dispatch({type:'home'})
    await deleteApi(id)
    setNotes(arrayNotes)
  }
  const editNote = async (note:note) => {
    await editApi(note)
    // Получение newNote сделано, чтобы использовать все ф-ции Api, для функционала необязательно
    //Работа с Api и LocalStorage
    const newNote = await loadOneNoteApi(note.id)
    localStorage.setItem(note.id+'',note.theme)  

    const arrayNotes:note[] = []
    notes.map((item) => {
      if(item.id !== note.id) arrayNotes.push(item)
      else{
        arrayNotes.push(newNote)
      }
    })   
    dispatch({type:'home'})  
    setNotes(arrayNotes)
  }
  const setNotesAfterFilter = (arr:note[]) => {
    setNotes([...arr])
  }
  return (
     begin && state.route == 'home' ? <Home afterFilter={setNotesAfterFilter} data={notes} deleteNote={deleteNote}/> 
     : begin && state.route == 'editNote'  ? <EditOrAddPage editNote = {editNote} deleteNote={deleteNote} />
     : begin && state.route == 'addNote'  ? <EditOrAddPage addNote = {addNote}/>
     : begin && state.route == 'oneNote' ? <NotePage deleteNote = {deleteNote}/> : <Loading/>
  );
}

export default App;
