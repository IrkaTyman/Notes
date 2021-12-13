import {note} from '../types'

function sortByDateFilter(notes:note[]){ 

    notes.sort((a,b) => (a.changeTime || a.creationTime) > (b.changeTime || b.creationTime) ? -1 : (a.changeTime || a.creationTime) < (b.changeTime || b.creationTime) ? 1 : 0)
    return notes
}

function sortByPriority(notes:note[],typeI:1|-1){
    notes.sort((a,b)=> a.priority < b.priority ? typeI : a.priority > b.priority ? -typeI : 0)
    console.log(notes)
    return notes
}
export {sortByDateFilter,sortByPriority}