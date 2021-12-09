import React, { createContext, useReducer } from "react";
import type {note} from '../types'

// Types for Context
type Action = {type:'set_last_id', payload:number} | {type:'edit', payload:note} | {type:'add', payload:note} | {type:'home'} | {type:'to_see_note',payload:note}
type State = typeof initialState;
 
//Initial State
const initialState:{note:note,route:string,lastIdOfNote:number}= {
    note:{id:-1,priority:0,title:'',creationTime:0, theme:'',changeTime:0},
    route:'home',
    lastIdOfNote:0
}

function reducer(state:State,action:Action){
    switch(action.type){
        case 'edit':
            return{
                ...state,
                route: 'editNote',
                note:action.payload
            }
        case 'add':
            return{
                ...state,
                route:'addNote',
                note:action.payload
            }
        case 'home':
            return{
                ...state,
                route:'home'
            }
        case 'set_last_id':
            return{
                ...state,
                lastIdOfNote:action.payload
            }
        case 'to_see_note':{
            return{
                ...state,
                note:action.payload,
                route:'oneNote'
            }
        }
    }
}

export const Context = createContext<{
    state:State;
    dispatch: React.Dispatch<Action>
}>({state:initialState, dispatch: () => {}})

export function Provider({children}:{children:React.ReactNode}){
    const [state, dispatch] = useReducer(reducer,initialState)

    return(
        <Context.Provider value={{state,dispatch}}>
            {children}
        </Context.Provider>
    )
}
