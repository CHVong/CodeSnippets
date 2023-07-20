import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Filter from "../../src/app/components/Filter";
import "@testing-library/jest-dom";

describe("Filter", () => {
  it("should display tabs and change active tab on click", async () => {
    const page = 1;
    const sessionId = "test-session-id";
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Filter page={page} sessionId={sessionId} />
      </QueryClientProvider>
    );

    const newestTab = await screen.findByText("Newest");
    expect(newestTab).toBeInTheDocument();
    expect(newestTab).toHaveClass("tab-active");

    const oldestTab = await screen.findByText("Oldest");
    expect(oldestTab).toBeInTheDocument();
    expect(oldestTab).not.toHaveClass("tab-active");

    const favoritedTab = await screen.findByText("Favorited");
    expect(favoritedTab).toBeInTheDocument();
    expect(favoritedTab).not.toHaveClass("tab-active");

    fireEvent.click(oldestTab);

    expect(newestTab).not.toHaveClass("tab-active");
    expect(oldestTab).toHaveClass("tab-active");
    expect(favoritedTab).not.toHaveClass("tab-active");

    fireEvent.click(favoritedTab);

    expect(newestTab).not.toHaveClass("tab-active");
    expect(oldestTab).not.toHaveClass("tab-active");
    expect(favoritedTab).toHaveClass("tab-active");
  });
});
