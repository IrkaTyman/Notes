import {useState,useEffect,useContext} from 'react';
import './style.css';
import Home from './pages/Home'
import {note} from './types'
import {sortByDateFilter} from './function/sortFunction'
import {Context} from './context/context'
import { loadAllApi, addApi,deleteApi,loadOneNoteApi } from './function/apiFunction';
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
        data = data.sort((a:note,b:note) => a.id > b.id ? 1 : -1)
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

  const actionWithNote = async (note:note,callback: Function) => {
    await callback(note)   

    const arrNotes:note[] = callback === addApi ?
           notes.slice()
           : notes.filter(item => item.id !==note.id)

    if(callback !== deleteApi){
      localStorage.setItem(note.id+'', note.theme)
      const newNote = await loadOneNoteApi(note.id)
      arrNotes.unshift(newNote)
    }
    dispatch({type:'home'})
    setNotes(arrNotes)
  }

  const setNotesAfterFilter = (arr:note[]) => {
    setNotes([...arr])
  }
  return (
     begin && state.route === 'home' ? <Home afterFilter={setNotesAfterFilter} data={notes} deleteNote={actionWithNote}/> 
     : begin && state.route === 'editNote'  ? <EditOrAddPage editNote = {actionWithNote} />
     : begin && state.route === 'addNote'  ? <EditOrAddPage addNote = {actionWithNote}/>
     : begin && state.route === 'oneNote' ? <NotePage deleteNote = {actionWithNote}/> : <Loading/>
  );
}

export default App;
