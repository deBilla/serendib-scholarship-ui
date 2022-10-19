import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import StudentModalButton from "./StudentModalButton";

const details = [
  { id: 0, name: 'Example', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '' },
  { id: 1, name: 'Demo', contactNo: '', email: '', university: '', course: '', startDate: '', endDate: '', schoolEndDate: '', sponsor: '' }
]

describe("Card", () => {
  it("renders", () => {
    const wrapper = render(<StudentModalButton detail={details} studentId={"1"} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});