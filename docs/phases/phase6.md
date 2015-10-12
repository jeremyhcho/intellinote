# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Message

### Controllers
1. Api:MessagesController
  * Index
  * Show
  * Create
  * Destroy
  * Update

### Views
* messages/index.json.jbuilder

## Flux
### Views (React Components)
* MessageUsersIndex
  * MessageUsersIndexItem
* MessagesIndex
  * MessagesIndexItem

### Stores
* Message

### Actions
* ApiActions.receiveAllMessages
* ApiActions.deleteMessage

### ApiUtil
* ApiUtil.fetchAllMessages
* ApiUtil.fetchSingleMessage
* ApiUtil.createMessage
* ApiUtil.updateMessage
* ApiUtil.destroyMessage
