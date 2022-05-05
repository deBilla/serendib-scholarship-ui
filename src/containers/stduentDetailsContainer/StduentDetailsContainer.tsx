import React, { Component } from 'react';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent';
import ModalButtonComponent from '../../components/ModalButtonCompnent';

const columns = [
    {
        key: 'id', name: 'ID',
        formatter(props: any) {
            return (
                <>
                    <ModalButtonComponent studentId={props.row.name} />
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

export default class StudentTableContainer extends Component {
    openPopup() {
        console.error("dimuthu");
    }

    render(): React.ReactNode {
        return <DataTableComponent columns={columns} rows={rows} />;
    }
}
