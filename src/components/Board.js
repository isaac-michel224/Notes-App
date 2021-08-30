import React, { Component } from 'react';
import Note from './Note';
import '../css/Board.css';

class Board extends Component {
    constructor() {
        super();
    }



render() {

return (

<div>
<div className="div-board">
<div clasName="row">
<Note title="Class Notes" body="Always use constructors when extending another class" />
<Note title="Bloop" body="blop" />
<Note title="Third title" body="third body" />
<Note />

</div>
</div>

<div>
    <button className="btn btn-success add-button">Add</button>
</div>
</div>

    )
}

}


export default Board;
