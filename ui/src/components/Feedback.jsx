import React, { Component } from 'react';
import { variables } from '../Variables.js';

export class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedbacks: [],
            modalTitle: "",
            FeedbackId: 0,
            Name: "",
            Rating: 0,
            Description: ""
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'feedback')
            .then(response => response.json())
            .then(data => {
                this.setState({ feedbacks: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    changeDescription = (e) => {
        this.setState({ Description: e.target.value });
    }

    setRating = (rating) => {
        this.setState({ Rating: rating });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Feedback",
            FeedbackId: 0,
            Name: "",
            Rating: 0,
            Description: ""
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Feedback",
            FeedbackId: emp.FeedbackId,
            Name: emp.Name,
            Rating: emp.Rating,
            Description: emp.Description
        });
    }

    createClick() {
        fetch(variables.API_URL + 'feedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Rating: Number(this.state.Rating),
                Description: this.state.Description
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'feedback', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FeedbackId: this.state.FeedbackId,
                Name: this.state.Name,
                Rating: Number(this.state.Rating),
                Description: this.state.Description
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'feedback/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            feedbacks,
            modalTitle,
            FeedbackId,
            Name,
            Rating,
            Description
        } = this.state;

        return (
            <div id="feedback" className='container'>
                <h2 className="feedback-title text-center mb-4">Feedback</h2>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Feedback
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>FeedbackId</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(emp =>
                            <tr key={emp.FeedbackId}>
                                <td>{emp.FeedbackId}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Rating}</td>
                                <td>{emp.Description}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light me-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        ✏️
                                    </button>

                                    <button type="button"
                                        className="btn btn-light"
                                        onClick={() => this.deleteClick(emp.FeedbackId)}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-100 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control"
                                                value={Name}
                                                onChange={this.changeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Rating</span>
                                            <select className="form-control"
                                                value={Rating}
                                                onChange={e => this.setRating(Number(e.target.value))}>
                                                <option value="0">Select Rating</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Description</span>
                                            <input type="text" className="form-control"
                                                value={Description}
                                                onChange={this.changeDescription} />
                                        </div>
                                    </div>
                                </div>

                                {FeedbackId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>
                                        Create
                                    </button>
                                    : null}

                                {FeedbackId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>
                                        Update
                                    </button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
