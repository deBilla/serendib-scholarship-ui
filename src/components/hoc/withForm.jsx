import React from 'react';
import {FormBuilder} from '../../utils/FormBuilder';

export const withForm = (ComposedComponent) => class extends React.Component {
    render() {
        return <ComposedComponent {...this.props} form={FormBuilder(this.props.config)} />;
    }
}