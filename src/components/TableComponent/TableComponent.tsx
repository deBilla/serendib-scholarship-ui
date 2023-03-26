import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import DataTableComponent from '../DataTableComponent/DataTableComponent';
import ModalButton from '../../components/ModalButton/ModalButton';
import axios from "axios";
import { useQueries } from "react-query";

const STUDENT_URL = process.env.REACT_APP_WS_HOST + "/student";
const SPONSOR_URL = process.env.REACT_APP_WS_HOST + "/sponsor";

const studentEmptyRow = { id: '', name: '', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '', files: [] };
const sponsorEmptyRow = { id: '', name: '', contactNo: '', email: '' };

export default function TableComponent(props: any) {
    const WS_URL = props.type === 'student' ? STUDENT_URL : SPONSOR_URL;
    const arr = [props.type === 'student' ? 'student' : 'sponsor', 'sponsor'];

    const apis: any[] = useQueries(
        arr.map((s: string) => {
          return {
            queryKey: s,
            queryFn: () => axios.get(`${process.env.REACT_APP_WS_HOST}/${s}/`).then((res: any) => res && res.data && res.data.message ? res.data.message : []),
          };
        })
    );

    const [rows, setRows] = useState<any[]>(apis && apis[0] && apis[0].data ? apis[0].data : []);

    useEffect(() => {
        setRows(apis && apis[0] && apis[0].data ? apis[0].data : []);
    }, [apis]);

    const columnData = {
        student: {
            columns: [
                {
                    key: 'id', name: 'ID', width: 10,
                    formatter(props: any) {
                        return (
                            <ModalButton detail={props.row} id={props.row.id} type={props.type} editRowHandler={editRowHandler} sponsorArr={apis[1].data} />
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
            ]
        },
        sponsor: {
            columns: [
                {
                    key: 'id', name: 'ID', width: 10,
                    formatter(props: any) {
                        return (
                            <ModalButton detail={props.row} id={props.row.id} type={props.type} editRowHandler={editRowHandler} sponsorArr={apis[1].data} />
                        );
                    },
                },
                { key: 'name', name: 'Name' },
                { key: 'contactNo', name: 'Contact No' },
                { key: 'email', name: 'Email' },
                { key: 'files', name: 'files' }
            ]
        }
    };

    const addNewHandler = (row: any) => {
        axios.post(WS_URL, {
            ...row
        }).then(res => console.log(res)).catch(err => console.log(err));
        setRows([...rows, row]);
    }

    const editRowHandler = (row: any) => {
        let updatedRows = rows.map((item: any) => {
            if (item.id === row.id) {
                item = row;
            }

            return item;
        });

        axios.patch(WS_URL, {
            ...row
        }).then(res => console.log(res)).catch(err => console.log(err));

        setRows(updatedRows);
    }

    return (
        <>
            <div style={{marginBottom: '10px', marginLeft: '88%'}}>
                {apis && apis[1] && apis[1].data && <ModalButton 
                    detail={props.type === 'student' ? studentEmptyRow : sponsorEmptyRow} 
                    id={`Add New ${props.type}`} 
                    type={props.type}
                    isAddNew={true}
                    addNewHandler={addNewHandler}
                    sponsorArr={apis[1].data}
                />
}
            </div>
            <DataTableComponent 
                columns={props.type === 'student' ? columnData.student.columns : columnData.sponsor.columns} 
                rows={rows} 
                type= {props.type}
            />
        </>
    );
}
