import React from "react";
import { ButtonA } from "@/components/atoms/ButtonA";

describe("<ButtonA />", () => {
  it("renders", () => {
    cy.mount(<ButtonA>Hello from testing!</ButtonA>);
  });
});
