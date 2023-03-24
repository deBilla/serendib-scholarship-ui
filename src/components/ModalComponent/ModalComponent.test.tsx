import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import ModalComponent from "./ModalComponent";

const config = [
  {
    "label": "id",
    "value": "0",
    "type": "text"
  }, 
  {
      "label": "name",
      "value": "Examplewww",
      "type": "text"
  }
]

describe("StudentModalComponent", () => {
  it("renders", () => {
    const wrapper = render(<ModalComponent config={config} show={true} studentid={"1"} onHide={jest.fn()} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it("not renders", () => {
    const wrapper = render(<ModalComponent config={config} show={false} studentid={"1"} onHide={jest.fn()} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});