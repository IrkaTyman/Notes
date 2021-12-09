import {note} from '../types'

const sortByDate = (a:note,b:note) => {
  let aTime = a.changeTime || a.creationTime
  let bTime = b.changeTime || b.creationTime
  if (aTime < bTime) return 1
  else if (bTime < aTime) return -1
  return 0
}

const sortByDateFilter = (notes:note[]) => { 
    notes.sort((a,b) => sortByDate(a,b))
    return notes
}

const sortByPriority = (arr:note[],typeSortPriority:string) => {
    arr.sort((a,b)=> {
      if (a.priority < b.priority) return typeSortPriority == 'upgrade' ? -1 : 1
      else if (b.priority < a.priority) return typeSortPriority == 'upgrade' ? 1 : -1
      return sortByDate(a,b)
    })
    return arr
}
export {sortByDateFilter,sortByPriority}