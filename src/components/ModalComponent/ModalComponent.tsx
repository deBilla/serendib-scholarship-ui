import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { withForm } from "../hoc/withForm";

class ModalComponent extends Component<any> {
    handleFileUpload(e: any) {
        this.props.handleFileUpload(e.target.files[0])
    }

    render() {
        return <Modal show={this.props.show}>
            <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of {this.props.type} {this.props.config ? this.props.config[1].value : ''}
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

export default withForm(ModalComponent);