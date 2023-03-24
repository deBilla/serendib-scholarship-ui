import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import TableComponent from "./TableComponent";

describe("TableComponent", () => {
  it("renders", () => {
    const wrapper = render(<TableComponent />);
    expect(wrapper.container).toMatchSnapshot();
  });
});