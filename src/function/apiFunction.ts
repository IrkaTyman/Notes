import {note} from '../types'
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': "*"
}
export async function loadAllApi(){
    try{
      let res = await fetch('https://job.hrvr.academy/api/notes')
      let data = await res.json() 
      return data     
    } catch(e) {
      console.warn(e)
    }
}
export async function loadOneNoteApi(id:number){
  try{
    let res = await fetch(`https://job.hrvr.academy/api/notes/${id}`)
    let data = await res.json() 
    return data     
  } catch(e) {
    console.warn(e)
  }
}

export async function addApi(item:note){
    try{
      await fetch('https://job.hrvr.academy/api/notes/create',{method:'POST',mode:'cors',headers: headers, body:JSON.stringify(item)})
    } catch(e) {
      console.warn(e)
    }
}

export async function editApi(item:note){
    try{
      await fetch(`https://job.hrvr.academy/api/notes/update/${item.id}`,{method:'PATCH',mode: 'cors',headers: headers,body:JSON.stringify(item)})      
    } catch(e) {
      console.warn(e)
    }
}

export async function deleteApi(item:note){
    try{
      await fetch(`https://job.hrvr.academy/api/notes/delete/${item.id}`,{method:'DELETE',mode: 'cors',body:''})  
    } catch(e) {
      console.warn(e)
    }
}