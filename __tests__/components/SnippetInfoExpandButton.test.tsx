import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SnippetCardExpandButton from "../../src/app/components/SnippetInfoExpandButton";

test("SnippetCardExpandButton works as expected", () => {
  HTMLDialogElement.prototype.showModal = jest.fn();

  const snippet = {
    id: "test-snippet",
    language: "javascript",
    snippet: 'console.log("Hello, World!");',
  };
  const { container, getByText } = render(<SnippetCardExpandButton snippet={snippet} />);

  // Test if Expand button is rendered
  const expandButton = container.querySelector(".btn-outline") as HTMLElement;
  expect(expandButton).toBeInTheDocument();

  // Test if clicking Expand button opens modal
  fireEvent.click(expandButton);
  const modal = container.querySelector(".modal") as HTMLElement;
  expect(modal).toBeInTheDocument();

  // Test if modal displays correct content
  const code = getByText(snippet.snippet);
  expect(code).toBeInTheDocument();

  // Test if Copy button is rendered
  const copyButton = container.querySelector(
    ".absolute.top-0.right-0.m-4.flex.gap-2"
  ) as HTMLElement;
  expect(copyButton).toBeInTheDocument();

  // Test if clicking close button closes modal
  const closeButton = getByText("close");
  closeButton.addEventListener("click", () => {
    if (modal) {
      modal.remove();
    }
  });
  fireEvent.click(closeButton);
  expect(modal).not.toBeInTheDocument();
});
