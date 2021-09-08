import React, { Component } from 'react';
import Note from './Note';
import '../css/Board.css';
import myFirebase from '../utility/myFirebase';
import { onValue, set, push, child, remove } from "firebase/database";


const GENERIC_NOTE_TITLE = "New Note Title";
const GENERIC_NOTE_BODY = "New Note Body";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            notes: [] 
        }

       this.firebaseDBRef = myFirebase.getFireBaseRef();

       onValue(this.firebaseDBRef, (snapshot) => 
           this.addNote(snapshot.val()), {onlyOnce: true,
       })
    }

    addNote(notes) {
        console.log(notes);
        if (notes) {
            for (let key in notes) {
                console.log(notes[key].title)
                this.state.notes.push(
            {
            id: key,
            title: notes[key].title,
            body: notes[key].body,
            }
        )
        
    };

    } else {
        let pushRef = push(this.firebaseDBRef);
        set(pushRef, {
            title: GENERIC_NOTE_TITLE,
            body: GENERIC_NOTE_BODY

        });
        this.state.notes.push(
            {
                id: pushRef.key,
                title: GENERIC_NOTE_TITLE,
                 body: GENERIC_NOTE_BODY,
    
            }
            );
    };

    this.setState(
        { notes: this.state.notes }
    );

    }

    deleteNote(id) {
        let newNoteArr = this.state.notes;
        newNoteArr.map((note, index) => {
            if (id === note.id) {
                newNoteArr.splice(index, 1);
                remove(child(this.firebaseDBRef, id));
            }
    });
    this.setState({ notes: newNoteArr });

}

    render() {
        return (
            <div>
                <div className="div-board">
                    <div className="row">

                        {
                            this.state.notes.map(note =>
                                <Note key={note.id}
                                    id={note.id}
                                    title={note.title}
                                    body={note.body}
                                    firebaseDBref={this.firebaseDBref}
                                    deleteHandler={this.deleteNote.bind(this)} />)
                        }

                    </div>
                </div>
                <div>
                    <button onClick={this.addNote.bind(this, null)} className="btn btn-success add-button">
                        Add
                    </button>
                </div>
            </div>
        )
    }
}

// {/* <div>
// <div className="div-board">
// <div clasName="row">
// <button onClick={this.addNote.bind(this)} className="btn btn-success add-button">Add</button>
// <Note title="Class Notes" body="Always use constructors when extending another class" />
// <Note title="Bloop" body="blop" />
// <Note title="Third title" body="third body" />
// <Note />

// </div> */}
// {/* </div> */}





export default Board;
