import { render } from '@testing-library/react';
import React from 'react';
import DataTableComponent from '../DataTableComponent/DataTableComponent';
import ModalButton from '../../components/ModalButton/ModalButton';

const data = {
    student: {
        columns: [
            {
                key: 'id', name: 'ID', width: 10,
                formatter(props: any) {
                    return (
                        <ModalButton detail={props.row} id={props.row.id} type={props.type} />
                    );
                },
            },
            { key: 'name', name: 'Name' },
            { key: 'contactNo', name: 'Contact No' },
            { key: 'email', name: 'Email' },
            { key: 'university', name: 'Univeristy' },
            { key: 'course', name: 'Course of Study' },
            { key: 'startDate', name: 'Course Start Date' },
            { key: 'endDate', name: 'Course End Date' },
            { key: 'schoolEndDate', name: 'Schol. start Date' },
            { key: 'sponsor', name: 'Sponsor Name' }
        ],
        rows: [
            { id: 0, name: 'Example', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '', files: [] },
            { id: 1, name: 'Demo', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '', files: [] }
        ]
    },
    sponsor: {
        columns: [
            {
                key: 'id', name: 'ID', width: 10,
                formatter(props: any) {
                    return (
                        <ModalButton detail={props.row} id={props.row.id} type={props.type} />
                    );
                },
            },
            { key: 'name', name: 'Name' },
        ],
        rows: [
            { id: 0, name: 'Example' },
            { id: 1, name: 'Demo' }
        ]
    }
}

export default function TableComponent(props: any) {
    return (
        <DataTableComponent 
            columns={props.type === 'student' ? data.student.columns : data.sponsor.columns} 
            rows={props.type === 'student' ? data.student.rows : data.sponsor.rows} 
            type= {props.type}
        />
    );
}
