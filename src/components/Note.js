import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/Note.css';
import { set, child } from 'firebase/database';


class Note extends Component {
    constructor(props) {
        super(props);
        this.titleContent = React.createRef();
        this.bodyContent = React.createRef();
        this.state = {
            title: props.title,
            body: props.body,
            editMode: false,
        }
    }   

handleEdit() {
    this.setState({ editMode: true });
}

handleSave() {
    console.log(this.props.firebaseDBRef)
    const path = this.props.id
    this.setState({
        title: this.titleContent.current.value,
        body: this.bodyContent.current.value,
        editMode: false,
    }, () =>
    set(child(this.props.firebaseDBRef, path),
    {
        title: this.state.title,
        body: this.state.body,
    }))
}

handleDelete() {
    this.props.deleteHandler(this.props.id);
}

render() {
    let titleElement;
    let bodyElement;
    let buttonArea;

if (this.state.editMode) {
    titleElement = <textarea ref={this.titleContent}
    className="title-textarea"
    defaultValue={this.state.title}></textarea>;

    bodyElement = <textarea ref={this.bodyContent}
    className="body-textarea"
    defaultValue={this.state.body}></textarea>


    buttonArea = <div>
        <button 
            className="btn btn-primary"
            onClick={this.handleSave.bind(this)}>Save</button>
    </div>;
}  else {

    titleElement = <h5 className="card-title">{this.state.title}</h5>;
    bodyElement = <p>{this.state.body}</p>;
    buttonArea = <div>
        <button className="btn btn-info" onClick={this.handleEdit.bind(this)}>Edit</button>
        <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
    </div>;
}


    return(

        <div className="col-sm=6">
        <div className="card card-view">
            <div className="card-body">


            {titleElement}
            {bodyElement}
            {buttonArea}

                {/* <h5 className="card-title">{this.props.title}</h5>
                <p>{this.props.body}</p>
                <button className="btn btn-info">Edit</button>
                <button className="btn btn-danger">Delete</button> */}



            </div>
        </div>
    </div>
    );
 }
}


Note.propTypes = {
    title: PropTypes.string
}

export default Note;







// render()
// {
//     let titleElement;
//     let bodyElement;
//     let buttonArea;

//     if (this.state.editMode){
//         titleElement = <textarea ref={this.titleContent}
//         className="title-textarea"
//         defaultValue = {this.state.title}></textarea>

//         bodyElement = <textarea ref={this.bodyContent}
//         className="body-textarea"
//         defaultValue = {this.state.title}></textarea>

//         buttonArea = <div>

//             <button
//             className="btn btn-primary"
//             onClick={this.handleSave.bind(this)}>Save</button>
//         </div>
//     } else {

//         titleElement = <h5 className="card-title">{this.state.title}</h5>
//         bodyElement = <p>{this.state.body}
//     </p>
//     buttonArea = <div>
        
//     </div>
//     }
// }

// Note.defaultProps = {
//     title: "cool title",
//     body: "cool body"
// }



