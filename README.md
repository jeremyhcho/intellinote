#Intellinote
####www.intellinote.io

Intellinote is an Evernote inspired web app. Built using React.js & Ruby on Rails, it aims to seamlessly give you the power of organization.

##A True Single Page App

At the beginning of this project, I wanted to create a page that delivers content all on one static page. Content is rendered differently based on the user's login state. This is done by using a `LoginStore`.

####Handling User Auth With Rails While Giving Access To State In Frontend

To create an app that redirects users without handing information down to the front end means having more than one page to deliver content. I created a `LoginStore` and an arbitrary `Logins` controller that retrieves the `current_user` so that I would be able to hold that information (non-sensitive) in the frontend.

##Notes

Using Quill.js, tagging, and shortcuts, notes can automatically make many different associations on creation. This meant having some components that never rendered notes to listen to the `NoteStore` for changes. Go Flux!

##Notebooks

Notebooks carry many notes, and are available to choose from in a dropdown during the note creation. A default notebook is created when a user is signed up, and a note MUST belong to a specific notebook. Deleting a notebook results in cascading deletes on all of its related notes.

##Search

I had three search bars throughout the website, and needed all of them to search correctly. I reused code from one search in order to achieve the correct functionality of the other two. Search happens on change of the input field.

##Shortcuts

Shortcuts were handled by implementing a `boolean` field on the notes column. Clicking on certain buttons will toggle this boolean, making it a shortcut, or taking it off.

##Messages

By implementing another Flux pattern, Users are now able to send messages to each other.

##Responses

Responses were a pretty neat feature to implement. When a user creates a note, deletes a note, fails to provide necessary fields, etc. They are now alerted through the `ResponseStore`. Here are the current success/error handling created:

* Creating a note
* FAILING to create a note
* Updating a note
* Deleting a note
* Creating a notebook
* FAILING to create a notebook
* Deleting a notebook
* Adding a shortcut
* Removing a shortcut

##Tags

Tags are maintained through another `TagStore`, but the trickiest part was that updating a note would mean changes to the `Tags`. I used array comparison logic to destroy the ones that needed to be deleted, and created the ones that needed to be added.
