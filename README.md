# IntelliNote

[heroku]: http://note-feed.herokuapp.com
[wireframes]: ./docs/wireframes.md
[schema]: ./docs/schema.md
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md


[Heroku link][heroku]

##Minimum Viable Product

NoteFeed is an Evernote inspired app built using Ruby on Rails & React.js.

NoteFeed will allow users to:

* Create an account
* Log into an account
* Create a notebook
* Add/Remove a note
* Add/Remove tags to a note
* Add/Remove reminders onto notes
* Search for notebooks, notes, and tags
* Messaging between Users

##Design Documents

[Wireframes][wireframes]
[Schema][schema]

##Implementation Timeline

###Phase 1: Introduction Page, User Authentication, Note Model & API (1 day)

To start off, I'll be creating a welcome page that points to sign up and log in pages which validate authentication. I'll be accomplishing this feature by creating the appropriate models, controllers, and BCrypt.

I'll move on to creating a Note model under an API namespace that queries the database and responds with JSON. I'll be adding appropriate restrictions in user visibility---users not logged in shouldn't be able to visit the API namespace pages nor the main landing page.

[Details][phase-one]

###Phase 2: React, Flux, Note CRUD (2 days)

This phase will focus on setting up the Flux architecture. I will set up a NoteStore, NoteActions, and a Dispatcher to index, create, update, and view notes from the browser. I will be using bootstrap to give basic styling to the React components.

[Details][phase-two]

###Phase 3: Notebooks and Tags (2.5 days)

In this phase, I'll be setting up appropriate models/associations and controllers for notebooks, tags, and taggings. I will be creating a NotebookStore to handle CRUD.

To fetch the tags associated with a given Note, I'll be editing my note's show.json.jbuilder file to send the associated tags when fetched.

Users will also be able to search for notes using tags using a SearchIndex component.

###Phase 4: Text Editor using Quill.js (0.5 days)

I'll be experimenting with the React text editor Quill.js for detailed styling of text.

###Phase 5: Reminder and CSS brush up (1.5 days)

In this phase, I'll add functionality to add reminders which will prompt the user with the title of the note. I'll also be heavily working on CSS during this phase.

[Details][phase-five]

###Phase 6: Share Notes Through Messages (2 days)

I'll be creating a Message model and the respective controller to allow users to send and receive messages. I'll be creating a MessageStore that keeps track of a current user's messages using the username as a key, and an array of messages as values. Using a MessageUsersIndex, I'll create a component that lists MessageUsersIndexItem. Clicking on the MessageUsersIndexItem will show a MessagesIndex component that'll render MessagesIndexItem component for individual messages.

[Details][phase-six]
