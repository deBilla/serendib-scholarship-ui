import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import ModalButton from "./ModalButton";

const details = [
  { id: 0, name: 'Example', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '' },
  { id: 1, name: 'Demo', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '' }
]

describe("Card", () => {
  it("renders", () => {
    const wrapper = render(<ModalButton detail={details} id={"1"} type = {'student'} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});