import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StudentModalComponent from './StudentModalComponent/StudentModalComponent';

interface ModalButtonCompnentProps {
    studentId: string,
    
}

export default class ModalButtonComponent extends Component<ModalButtonCompnentProps, { show: boolean }> {
    constructor(props: ModalButtonCompnentProps) {
        super(props);

        this.state = {
            show: false
        };
    }

    setModalShow(showState: boolean) {
        this.setState({ show: showState });
    }


    render(): React.ReactNode {
        return <>
            <Button onClick={() => this.setModalShow(true)}>{this.props.studentId}</Button>
            <StudentModalComponent show={this.state.show} onHide={() => this.setModalShow(false)} studentId = {this.props.studentId} />
        </>
    }
}