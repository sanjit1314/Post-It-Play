document.addEventListener('DOMContentLoaded', (event) => {
    loadNotes();
});

function createNote() {
    const stickyNotes = document.querySelector('.sticky-notes');
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
  
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    noteContent.contentEditable = true;
    noteContent.textContent = 'New note';
    noteContent.oninput = saveNotes;

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

function saveNotes() {
    const stickyNotes = document.querySelectorAll('.note-content');
    const notes = [];

    stickyNotes.forEach(note => {
        notes.push(note.textContent);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if (savedNotes) {
        const stickyNotes = document.querySelector('.sticky-notes');
        savedNotes.forEach(noteText => {
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note-container');
          
            const noteContent = document.createElement('div');
            noteContent.classList.add('note-content');
            noteContent.contentEditable = true;
            noteContent.textContent = noteText;
            noteContent.oninput = saveNotes;
          
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
        });
    }
}
