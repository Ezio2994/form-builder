import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormGenerator from "./FormGenerator";

import { jsonForm } from "../../App";

describe("FormGenerator tests", () => {
  it("Should render right fields", () => {
    render(<FormGenerator jsonForm={jsonForm} />);

    screen.getByText("What does your enquiry relate to?");
    screen.getByText("Date of payslip being queried (if applicable)");
    screen.getByText("Query");
  });

  it("Fields should get right values on change", () => {
    render(<FormGenerator jsonForm={jsonForm} />);

    fireEvent.change(
      screen.getByLabelText("What does your enquiry relate to?"),
      { target: { value: "Others" } }
    );

    expect(
      screen.getByLabelText("What does your enquiry relate to?")
    ).toHaveValue("Others");
  });

  // it("Shoud display that date of payslip is required with Incorrect Pay", () => {
  //   render(<FormGenerator jsonForm={jsonForm} />);

  //   fireEvent.change(
  //     screen.getByLabelText("What does your enquiry relate to?"),
  //     { target: { value: "Incorrect Pay" } }
  //   );

  //   fireEvent.change(screen.getByLabelText("Query"), {
  //     target: { value: "Something" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: "submit" }));

  //   screen.getByText(
  //     "Date of payslip being queried (if applicable) is required"
  //   );
  // });
});
