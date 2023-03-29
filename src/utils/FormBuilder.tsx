import React from 'react';
import { Form, Button } from 'react-bootstrap';
type FormBuilderConfigType = "text" | "date" | "file" | "select";

export type FormBuilderConfig = {
    type: FormBuilderConfigType;
    label: string;
    value: string;
    array: [],
    placeholder: string;
    onChange: (e: any) => VoidFunction;
}

export const FormBuilder = (config: FormBuilderConfig[]) => {
    const form = [];
    let formKey = 0;
    for (let val in config) {
        if (config[val].type === "select") {
            form.push(
                React.cloneElement(
                    <Form.Label key={formKey} >{config[val].label}</Form.Label>
                )
            );
            formKey++;

            let arr = config && config[val] && config[val].array ? config[val].array : [];
            let children = [];

            for (let i = 0; i < arr.length; i++) {
                children.push(<option key={i} onClick={config[val].onChange}>{arr[i]}</option>);
            }

            form.push(
                React.cloneElement(
                    <Form.Select key={formKey} />,
                    config[val], children
                )
            );
            formKey++;
        }
        else if (config[val].type === "file") {
            form.push(
                React.cloneElement(
                    <Form.Label key={formKey}>{config[val].label}</Form.Label>
                )
            );
            formKey++;
            form.push(
                React.cloneElement(
                    <span key={formKey}>: </span>
                )
            );
            formKey++;
            let arr = config && config[val] && config[val].array ? config[val].array : [];
            for (let i = 0; i < arr.length; i++) {
                form.push(
                    React.cloneElement(
                        <Button key={i} onClick={config[val].onChange}>{arr[i]}</Button>
                    )
                );
                form.push(
                    React.cloneElement(
                        <span key={formKey}> </span>
                    )
                );
                formKey++;
            }
            
        } else {
            form.push(
                React.cloneElement(
                    <Form.Label key={formKey} >{config[val].label}</Form.Label>
                )
            );
            formKey++;
            form.push(
                React.cloneElement(
                    <Form.Control key={formKey} />,
                    config[val]
                )
            );
            formKey++;
        }
    }

    return form;
}