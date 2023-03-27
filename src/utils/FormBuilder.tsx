import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
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
    for (let val in config) {
        if (config[val].type === "select") {
            form.push(
                React.cloneElement(
                    <Form.Label >{config[val].label}</Form.Label>
                )
            );

            let arr = config && config[val] && config[val].array ? config[val].array : [];
            let children = [];

            for (let i = 0; i < arr.length; i++) {
                children.push(<option onClick={config[val].onChange}>{arr[i]}</option>);
            }

            form.push(
                React.cloneElement(
                    <Form.Select />,
                    config[val], children
                )
            );
        }
        else if (config[val].type === "file") {
            form.push(
                React.cloneElement(
                    <Form.Label >{config[val].label}</Form.Label>
                )
            );
            form.push(
                React.cloneElement(
                    <span>: </span>
                )
            );
            let arr = config && config[val] && config[val].array ? config[val].array : [];
            for (let i = 0; i < arr.length; i++) {
                form.push(
                    React.cloneElement(
                        <Button onClick={config[val].onChange}>{arr[i]}</Button>
                    )
                );
                form.push(
                    React.cloneElement(
                        <span> </span>
                    )
                );
            }
            
        } else {
            form.push(
                React.cloneElement(
                    <Form.Label >{config[val].label}</Form.Label>
                )
            );
            form.push(
                React.cloneElement(
                    <Form.Control />,
                    config[val]
                )
            );
        }
    }

    return form;
}