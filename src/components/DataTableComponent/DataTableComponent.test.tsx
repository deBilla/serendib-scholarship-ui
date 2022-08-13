import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import DataTableComponent from "./DataTableComponent";

describe("Card", () => {
  it("renders", () => {
    const wrapper = render(<DataTableComponent columns={[]} rows={[]} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});