import { render, fireEvent } from "@testing-library/react";
import Search from "@/app/components/Search";

test("Search component integration test", () => {
  const { getByPlaceholderText, getByText } = render(<Search />);
  const input = getByPlaceholderText("Title or Description ...") as HTMLInputElement;
  const button = getByText("Search");

  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");

  fireEvent.click(button);
  // check for expected behavior after clicking the search button
});
