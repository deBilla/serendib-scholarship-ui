import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StudentModalComponent from '../StudentModalComponent/StudentModalComponent';

interface StudentModalButtonComponentProps {
    studentId: string,
    detail: any
}

export default class StudentModalButton extends Component<StudentModalButtonComponentProps, { show: boolean, config: any }> {
    constructor(props: StudentModalButtonComponentProps) {
        super(props);

        let config = [];
        let arr = [...Object.entries(this.props.detail)];

        for (let i = 0; i < arr.length; i++ ) {
            let str = arr[i] + '';
            let valArr = str.split(",");

            let obj = {
                label: valArr[0],
                value: valArr[1],
                type: 'text'
            }

            config.push(obj);
        }

        this.state = {
            show: false,
            config: config
        };
    }

    setModalShow(showState: boolean) {
        this.setState({ show: showState });
    }


    render(): React.ReactNode {
        return <>
            <Button onClick={() => this.setModalShow(true)}>{this.props.studentId}</Button>
            <StudentModalComponent config={this.state.config} show={this.state.show} onHide={() => this.setModalShow(false)} studentid = {this.props.studentId} />
        </>
    }
}