import React, { Component } from 'react';
import DataGrid from 'react-data-grid';

interface DataTableProps {
    columns: columnType[],
    rows: rowType[]
}

type columnType = {
    key: string;
    name: string;
};

type rowType = {
    id: number;
    name: string;
};
  
export default class DataTableComponent extends Component<DataTableProps> {
    constructor(props: DataTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return <DataGrid style={{height: '100vh'}} columns={this.props.columns} rows={this.props.rows} />;
    }
}