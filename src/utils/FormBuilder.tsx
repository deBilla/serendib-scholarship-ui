import React, { Component } from 'react';
import { Form, Card } from 'react-bootstrap';
type FormBuilderConfigType = "text" | "date";

export type FormBuilderConfig = {
    type: FormBuilderConfigType;
    label: string;
    value: string;
    placeholder: string;
    onChange: (e: any) => VoidFunction;
}

export const FormBuilder = (config: FormBuilderConfig[]) => {
    const form = [];
    for (let val in config) {
        if (config[val].type === "text") {
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
        if (config[val].type === "date") {
            form.push(
                React.cloneElement(
                    <Form.Label >{config[val].label}</Form.Label>
                )
            );
            form.push(
                React.cloneElement(
                    <Form.Control id="passwordHelpBlock" type='date' />,
                    config[val]
                )
            );
        }
    }

    return form;
}