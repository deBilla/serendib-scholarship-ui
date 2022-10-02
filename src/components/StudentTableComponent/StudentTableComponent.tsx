import { render } from '@testing-library/react';
import React from 'react';
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

<<<<<<< Updated upstream:src/components/StudentTableComponent/StudentTableComponent.tsx
export default class StudentTableComponent extends Component {
    render(): React.ReactNode {
        return <DataTableComponent columns={columns} rows={rows} />;
    }
}
=======
export default function StudentTableContainer() {
    return (<DataTableComponent columns={columns} rows={rows} />);
}
>>>>>>> Stashed changes:src/containers/stduentDetailsContainer/StduentDetailsContainer.tsx
