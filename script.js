window.onload = function() {
    loadNotes();
  }
  
  function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-content').forEach(note => {
      notes.push(note.textContent);
    });
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }
  
  function createNote(content = 'New note') {
    const stickyNotes = document.querySelector('.sticky-notes');
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
  
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    noteContent.contentEditable = true;
    noteContent.textContent = content;
  
    noteContent.oninput = function() {
      saveNotes();
    };
  
    const noteActions = document.createElement('div');
    noteActions.classList.add('note-actions');
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-note');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      noteContainer.remove();
      saveNotes();  
    };
  
    noteActions.appendChild(deleteButton);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(noteActions);
    stickyNotes.appendChild(noteContainer);
  
    saveNotes();  
  }
  
  function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
    
    if (savedNotes.length > 0) {
      savedNotes.forEach(note => createNote(note));
    }
  }
  
  function addNewNote() {
    createNote();
    saveNotes(); 
  }
  
