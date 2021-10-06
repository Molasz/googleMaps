import React from "react";
import { render, screen } from "@testing-library/react";

import MapWrapper from "./MapWrapper";

describe("Given MapWrapper component", () => {
  describe("When it's rendered", () => {
    it("Then renders LOADING text", async () => {
      render(<MapWrapper />);
      const linkElement = await screen.findByText("LOADING");
      expect(linkElement).toBeInTheDocument();
    });
  });
});
