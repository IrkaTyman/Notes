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
  deleteNote: (id:number) => void,
  data: note[],
  afterFilter: (arr:note[]) => void,
}

export type editOrAddPageProps = {
  deleteNote?: (id:number) => void,
  addNote?: (item:note) => void,
  editNote?: (item:note) => void,
}
export type funcWithNote = {
  deleteNote: (id:number) => void,
}