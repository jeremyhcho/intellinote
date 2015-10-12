# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Reminder

### Controllers
1. Api::RemindersController
  * Index
  * Create
  * Destroy
  * Show
  * Update

### Views
* reminders/index.json.jbuilder

## Flux
### Views (React Components)
* RemindersIndex
  - ReminderIndexItem
* ReminderShow
* ReminderForm

### Stores
* Reminder

### Actions
* ApiActions.receiveAllReminders
* ApiActions.receiveSingleReminder
* ApiActions.deleteReminder

### ApiUtil
* ApiUtil.fetchAllReminders
* ApiUtil.fetchSingleReminder
* ApiUtil.createReminder
* ApiUtil.updateReminder
* ApiUtil.destroyReminder
