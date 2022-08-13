import React, { Component } from 'react';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import StudentModalButton from '../../components/StudentModalButton/StudentModalButton';

const columns = [
    {
        key: 'id', name: 'ID', width: 10,
        formatter(props: any) {
            return (
                <>
                    <StudentModalButton studentId={props.row.id} />
                </>
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
    { key: 'scholEndDate', name: 'Schol. start Date' },
    { key: 'sponsor', name: 'Sponsor Name' }
];

const rows = [
    { id: 0, name: 'Example' },
    { id: 1, name: 'Demo' }
];

export default class StudentTableComponent extends Component {
    render(): React.ReactNode {
        return <DataTableComponent columns={columns} rows={rows} />;
    }
}