import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "@jest/globals";
import LandingContainer from "./LandingContainer";

describe("LandingContainer", () => {
  it("renders", () => {
    const wrapper = render(<LandingContainer />);
    expect(wrapper.container).toMatchSnapshot();
  });
});