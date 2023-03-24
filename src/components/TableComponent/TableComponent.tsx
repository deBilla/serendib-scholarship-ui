import { render } from '@testing-library/react';
import React, { useState } from 'react';
import DataTableComponent from '../DataTableComponent/DataTableComponent';
import ModalButton from '../../components/ModalButton/ModalButton';

const studentEmptyRow = { id: '', name: '', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '', files: [] };
const sponsorEmptyRow = { id: '', name: '', contactNo: '', email: '' };

export default function TableComponent(props: any) {
    const data = {
        student: {
            columns: [
                {
                    key: 'id', name: 'ID', width: 10,
                    formatter(props: any) {
                        return (
                            <ModalButton detail={props.row} id={props.row.id} type={props.type} editRowHandler={editRowHandler} sponsorArr={data.sponsor.rows} />
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
                { key: 'sponsor', name: 'Sponsor Name' },
                { key: 'files', name: 'files' }
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
                            <ModalButton detail={props.row} id={props.row.id} type={props.type} editRowHandler={editRowHandler} sponsorArr={data.sponsor.rows} />
                        );
                    },
                },
                { key: 'name', name: 'Name' },
                { key: 'contactNo', name: 'Contact No' },
                { key: 'email', name: 'Email' },
                { key: 'files', name: 'files' }
            ],
            rows: [
                { id: 0, name: 'Serendib Fund', contactNo: '', email: '', files: []},
                { id: 1, name: 'Dimuthu', contactNo: '', email: '', files: []}
            ]
        }
    };

    const [rows, setRows] = useState(props.type === 'student' ? data.student.rows : data.sponsor.rows);

    const addNewHandler = (row: any) => {
        setRows([...rows, row]);
    }

    const editRowHandler = (row: any) => {
        let updatedRows = rows.map(item => {
            if (item.id === row.id) {
                item = row;
            }

            return item;
        });

        setRows(updatedRows);
    }

    return (
        <>
            <div style={{marginBottom: '10px', marginLeft: '88%'}}>
                <ModalButton 
                    detail={props.type === 'student' ? studentEmptyRow : sponsorEmptyRow} 
                    id={`Add New ${props.type}`} 
                    type={props.type}
                    isAddNew={true}
                    addNewHandler={addNewHandler}
                    sponsorArr={data.sponsor.rows}
                />
            </div>
            <DataTableComponent 
                columns={props.type === 'student' ? data.student.columns : data.sponsor.columns} 
                rows={rows} 
                type= {props.type}
            />
        </>
    );
}
