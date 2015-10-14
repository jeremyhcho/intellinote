# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Note

### Controllers
1. UsersController
  * Create
  * New
2. SessionsController
  * Create
  * New
  * Destroy
3. Api::NotesController
  * Index
  * Create
  * Show
  * Update
  * Destroy

### Views
* users/new.html.erb
* session/new.html.erb
* notes/index.json.jbuilder
* notes/show.json.jbuilder

## Gems/Libraries
* bcrypt
* annotate
* binding_of_caller
* better_errors
* react-rails '~> 1.3.0' (See details when implementing)
* flux-rails-assets (See details when implementing)
* bootstrap-sass (See details when implementing)
**Note**: I understand I don't need a lot of these right now, just a reminder to self to implement them when setting everything up.
