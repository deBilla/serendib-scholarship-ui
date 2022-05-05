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
        return <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of Student {this.props.studentId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}