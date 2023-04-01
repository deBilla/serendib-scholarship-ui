import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "../ModalComponent/ModalComponent";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { getSignedUrlForFile, fileUpload, deleteFolder } from "../../services/AWSConfig";
import { downloadBlobArrayToZip } from "../../utils/helper";

const BUCKET_NAME = "serendib-ui";

export default class ModalButton extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false,
      config: this.createConfig(false),
      showDeleteConfirmation: false,
    };
  }

  createConfig(isEmpty: boolean) {
    let config = [];
    let arr = [...Object.keys(this.props.detail)];

    for (let i = 0; i < arr.length; i++) {
      let label = arr[i];
      let value =
        this.props.detail && this.props.detail[arr[i]]
          ? this.props.detail[arr[i]]
          : "";
      let obj;

      switch (label) {
        case "files":
          obj = {
            label: label,
            array: value ? value : [],
            type: "file",
            onChange: (e: any) => {
              this.downloadFile(e.target.innerText);
            },
          };

          break;
        case "sponsor":
          let sponsorNameArr = this.props.sponsorArr
            ? this.props.sponsorArr.map((s: any) => s.name)
            : [];

          obj = {
            label: label,
            array: sponsorNameArr,
            type: "select",
            onChange: (e: any) => {
              this.setConfigState(isEmpty ? "" : e.target.value, i);
            },
          };

          break;
        default:
          let type = "text";

          if (label === "startDate" || label === "endDate") {
            let dateString = value ? value : "";
            let dateArr = dateString ? dateString.split("T") : undefined;
            value = dateArr ? dateArr[0] : "";
            type = "date";
          }

          obj = {
            label: label,
            value: value,
            type: type,
            onChange: (e: any) => {
              this.setConfigState(isEmpty ? "" : e.target.value, i);
            },
          };

          break;
      }

      config.push(obj);
    }

    return config;
  }

  async downloadFile(fileName: any) {
    try {
      const signedUrl = await getSignedUrlForFile(BUCKET_NAME, fileName, `${this.props.type}/${this.props.id}`);

      window.open(signedUrl);
    } catch (e) {
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
    this.setState({ config: this.createConfig(true) });
  }

  createRow() {
    let configArr = this.state.config;
    let row = {};

    for (let i = 0; i < configArr.length; i++) {
      let label = configArr[i]["label"];
      Object.assign(row, { [label]: configArr[i]["value"] });
    }

    return row;
  }

  async handleFileUpload(file: any) {
    try {
      await fileUpload(
        BUCKET_NAME,
        file.name,
        this.props.type,
        this.props.id,
        file
      );

      let index = this.state.config.findIndex(
        (conf: any) => conf.label === "files"
      );

      let fileArr = this.state.config[index].array;
      fileArr.push(file["name"]);
      this.setConfigState(fileArr, index);
    } catch (e) {
      throw e;
    }
  }

  onDelete() {
    this.setState({ showDeleteConfirmation: true });
    this.downloadFolder();
  }

  handleDelete() {
    let row = this.createRow();
    deleteFolder(BUCKET_NAME, `${this.props.type}/${this.props.id}`);
    this.props.deleteRowHandler(row);
  }

  async downloadFolder() {
    await downloadBlobArrayToZip(BUCKET_NAME, `${this.props.type}/${this.props.id}`);
  }

  setShowDeleteConfirmation() {
    this.setState({ showDeleteConfirmation: false });
  }

  render(): React.ReactNode {
    return (
      <>
        <Button
          style={this.props.style}
          onClick={() => this.setModalShow(true)}
        >
          {this.props.id}
        </Button>
        {this.state.show && (
          <ModalComponent
            config={this.state.config}
            show={this.state.show}
            handleFileUpload={(file: any) => this.handleFileUpload(file)}
            onHide={() => this.setModalShow(false)}
            onSave={() => this.saveData()}
            handleDelete={() => this.onDelete()}
            id={this.props.id}
            downloadFolder={()=>this.downloadFolder()}
          />
        )}

        <ConfirmationDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => this.handleDelete()}
          show={this.state.showDeleteConfirmation}
          setShow={() => this.setShowDeleteConfirmation()}
        />
      </>
    );
  }
}
