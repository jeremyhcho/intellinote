# Phase 2: Flux Architecture and Note CRUD (2 days)

## Flux
### Views (React Components)
1. NotesIndex
  * NotesIndexItem
2. NoteForm

### Stores
* Note
  - all
  - find
  - noteIndexChanged
  - noteDetailChanged
  - addNoteChangeListener
  - removeNoteChangeListener
  - addNoteDetailChangeListener
  - removeNoteDetailChangeListener
  - resetNoteList
  - changeNoteDetail
  - Constants
    * NOTE_LIST_CHANGE_EVENT
    * NOTE_DETAIL_CHANGE_EVENT
    
### Actions
* ApiActions.receiveAllNotes
* ApiActions.receiveSingleNote
* ApiActions.deleteNote

### ApiUtil
* ApiUtil.fetchAllNotes
* ApiUtil.fetchSingleNote
* ApiUtil.createNote
* ApiUtil.editNote
* ApiUtil.destroyNote

## Gems/Libraries
* Twitter Bootstrap
