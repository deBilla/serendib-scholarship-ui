import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import StudentTableComponent from "./StudentTableComponent";

describe("StudentTableComponent", () => {
  it("renders", () => {
    const wrapper = render(<StudentTableComponent />);
    expect(wrapper.container).toMatchSnapshot();
  });
});