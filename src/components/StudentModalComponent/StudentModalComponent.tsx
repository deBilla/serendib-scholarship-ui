import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


interface ModalPropType {
    show: boolean,
    studentId: string,
    onHide(): void
}


export default class StudentModalComponent extends Component<ModalPropType> {
    constructor(props: ModalPropType) {
        super(props);
    }

    render(): React.ReactNode {
        return <Modal {...this.props}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of Student {this.props.studentId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Save</Button>
                <Button onClick={this.props.onHide}>Delete</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}