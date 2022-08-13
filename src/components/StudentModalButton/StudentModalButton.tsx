import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StudentModalComponent from '../StudentModalComponent/StudentModalComponent';

interface StudentModalButtonComponentProps {
    studentId: string
}

export default class StudentModalButton extends Component<StudentModalButtonComponentProps, { show: boolean }> {
    constructor(props: StudentModalButtonComponentProps) {
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
            <StudentModalComponent show={this.state.show} onHide={() => this.setModalShow(false)} studentid = {this.props.studentId} />
        </>
    }
}