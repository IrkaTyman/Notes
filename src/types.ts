import React from 'react';

export type note = {
    id:number,
    priority:0 | 1 | 2,
    title:string,
    creationTime:number,
    changeTime? : number,
    description? : string,
    theme: string
  }
export type homeProps = {
  deleteNote: (item:note,callback:Function) => Promise<void>,
  data: note[],
  afterFilter: (arr:note[]) => void,
}

export type editOrAddPageProps = {
  deleteNote?: (item:note,callback:Function) => Promise<void>,
  addNote?: (item:note,callback:Function) => Promise<void>,
  editNote?: (item:note,callback:Function) => Promise<void>,
}
export type funcWithNote = {
  deleteNote:(item:note,callback:Function) => Promise<void>,
}