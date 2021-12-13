import {useState,useEffect,useContext} from 'react';
import './style.css';
import Home from './pages/Home'
import {note} from './types'
import {sortByDateFilter} from './function/sortFunction'
import {Context} from './context/context'
import { loadAllApi, addApi,deleteApi,loadOneNoteApi} from './function/apiFunction';
import { Routes, Route,useNavigate} from "react-router-dom";
import EditOrAddPage from './pages/EditOrAddPage';
import NotePage from './pages/NotePage';
import Loading from './pages/Loading';

function App() {
  const [notes,setNotes] = useState<note[]>([])
  const [begin,setBegin] = useState(false)
  const {state,dispatch} = useContext(Context)
  const localStorage = window.localStorage
  const navigation = useNavigate()
  
  useEffect(()=>{
    navigation('/')
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
    navigation('/')
    setNotes(arrNotes)
  }

  const setNotesAfterFilter = (arr:note[]) => {
    setNotes([...arr])
  }
  return (
    begin ? <Routes>
        <Route path="/" element={ <Home afterFilter={setNotesAfterFilter} data={notes} deleteNote={actionWithNote}/> }/>
        <Route path="edit" element={<EditOrAddPage editNote = {actionWithNote} />}/>
        <Route path="add" element={<EditOrAddPage addNote = {actionWithNote}/>}/>
        <Route path="note" element={<NotePage deleteNote = {actionWithNote}/>}/>
      </Routes>
    : <Loading/>
  );
}

export default App;
