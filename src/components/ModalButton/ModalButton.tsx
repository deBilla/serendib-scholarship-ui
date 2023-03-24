import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalComponent from '../ModalComponent/ModalComponent';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION, credentials: {accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID as string, secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY as string} });

export default class ModalButton extends Component<any, { show: boolean, config: any }> {
    constructor(props: any) {
        super(props); 

        let config = []; 
        let arr = [...Object.keys(this.props.detail)];

        for (let i = 0; i < arr.length; i++ ) {
            let label = arr[i];
            let value = this.props.detail[arr[i]];
            let obj;

            if (label === 'files') {
                obj = {
                    label: label,
                    array: value,
                    type: 'file',
                    onChange: (e: any) => {
                        this.downloadFile(e.target.innerText);
                    }
                }
            } else {
                obj = {
                    label: label,
                    value: value,
                    type: 'text',
                    onChange: (e: any) => {
                        this.setConfigState(e.target.value, i);
                    }
                }
            }

            config.push(obj);
        }

        this.state = {
            show: false,
            config: config
        };
    }

    async downloadFile(fileName: any) {
        const bucketParams = {
            Bucket: "serendib-ui",
            Key: fileName,
            Body: "BODY"
        };

        try {
            const command = new GetObjectCommand(bucketParams);
            const signedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: 3600,
            });

            window.open(signedUrl)
        } catch(e) {
            throw e;
        }
    }

    setConfigState(value: any, i: any) {
        let arr = [...this.state.config];
        arr[i].value = value;
        this.setState({ config: arr });
    }

    setModalShow(showState: boolean) {
        this.setState({ show: showState });
    }

    saveData() {
        if (this.props.isAddNew) {
            let row = this.createRow();
            this.props.addNewHandler(row);
        } else {
            let row = this.createRow();
            this.props.editRowHandler(row);
        }

        this.setModalShow(false);
        console.log(this.state.config);
    }

    createRow() {
        let configArr = this.state.config;
        let row = {};

        for (let i=0; i<configArr.length; i++) {
            let label = configArr[i]['label'];
            Object.assign(row, {[label]: configArr[i]['value']});
        }

        return row;
    }

    async handleFileUpload(file: any) {
        const bucketParams = {
            Bucket: "serendib-ui",
            Key: file['name'],
            Body: file,
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(bucketParams));
            console.log(data);

            let fileArr = this.state.config[this.state.config.length - 1].array;
            fileArr.push(file['name']);
            this.setConfigState(fileArr, this.state.config.length - 1);
        } catch(e) {
            throw e;
        }
    }

    render(): React.ReactNode {
        return <>
            <Button onClick={() => this.setModalShow(true)}>{this.props.id}</Button>
            <ModalComponent config={this.state.config} show={this.state.show} handleFileUpload={(file: any) => this.handleFileUpload(file)} onHide={() => this.setModalShow(false)} onSave={() => this.saveData()} id = {this.props.id} />
        </>
    }
}