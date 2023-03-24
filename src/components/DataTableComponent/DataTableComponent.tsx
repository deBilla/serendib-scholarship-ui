import React, { Component } from 'react';
import DataGrid from 'react-data-grid';

interface DataTableProps {
    columns: any,
    rows: any,
    type: string
}
  
export default class DataTableComponent extends Component<DataTableProps> {
    constructor(props: DataTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return <DataGrid style={{height: '100vh'}} columns={this.props.columns} rows={this.props.rows} />;
    }
}