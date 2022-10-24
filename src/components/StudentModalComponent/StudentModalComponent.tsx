import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { withForm } from "../hoc/withForm";

export type StudentPropType = {
    show: boolean,
    form: any,
    studentid: string,
    config: any,
    onHide(): void,
    onSave(): void,
    handleFileUpload(file: any): void
}

class StudentModalComponent extends Component<StudentPropType> {
    constructor(props: StudentPropType) {
        super(props);
    }

    handleFileUpload(e: any) {
        this.props.handleFileUpload(e.target.files[0])
    }

    render(): React.ReactNode {
        return <Modal show={this.props.show}>
            <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of Student {this.props.config[1].value}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.form}
            </Modal.Body>
            <Modal.Footer>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Form.Group controlId="formFile" className="mb-3" onChange={(e) => this.handleFileUpload(e)}>
                        <Form.Control type="file" />
                    </Form.Group>
                </div>
                <div style={{display: 'flex', width: '45%', justifyContent: 'space-between'}}>
                    <Button onClick={this.props.onSave}>Save</Button>
                    <Button onClick={this.props.onHide}>Delete</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>
    }
}

export default withForm(StudentModalComponent);