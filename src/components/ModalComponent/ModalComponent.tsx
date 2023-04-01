import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { withForm } from "../hoc/withForm";
import { FaTrash, FaSave } from "react-icons/fa";

class ModalComponent extends Component<any> {
    handleFileUpload(e: any) {
        this.props.handleFileUpload(e.target.files[0])
    }

    render() {
        return <Modal show={this.props.show}>
            <Modal.Header style={{gap: '10px'}} closeButton onClick={this.props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of {this.props.type} {this.props.config ? this.props.config[1].value : ''}
                </Modal.Title>
                <Button style={{marginLeft: '30%'}} variant='danger' onClick={this.props.handleDelete}><FaTrash /></Button>
                <Button variant='success' onClick={this.props.onSave}><FaSave /></Button>
            </Modal.Header>
            <Modal.Body>
                {this.props.form}
            </Modal.Body>
            <Modal.Footer>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '10px'}}>
                    <Form.Group controlId="formFile" className="mb-3" onChange={(e) => this.handleFileUpload(e)}>
                        <Form.Control type="file" />
                    </Form.Group>
                </div>
            </Modal.Footer>
        </Modal>
    }
}

export default withForm(ModalComponent);