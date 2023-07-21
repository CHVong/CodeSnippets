import { render, fireEvent } from "@testing-library/react";
import SignInProviders from "@/app/components/SignInProviders";
import { signIn } from "next-auth/react";
import "@testing-library/jest-dom";

jest.mock("next-auth/react");

describe("SignInProviders", () => {
  it("should call signIn with the correct provider when a button is clicked", () => {
    const { getByText } = render(<SignInProviders />);
    fireEvent.click(getByText("sign in with Discord"));
    expect(signIn).toHaveBeenCalledWith("discord", { callbackUrl: "http://localhost:3000" });
    fireEvent.click(getByText("sign in with Google"));
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "http://localhost:3000" });
    fireEvent.click(getByText("sign in with Github"));
    expect(signIn).toHaveBeenCalledWith("github", { callbackUrl: "http://localhost:3000" });
  });
});

describe("SignInProviders", () => {
  it("should render three sign-in buttons with the correct text", () => {
    const { getByText } = render(<SignInProviders />);
    expect(getByText("sign in with Discord")).toBeInTheDocument();
    expect(getByText("sign in with Github")).toBeInTheDocument();
    expect(getByText("sign in with Google")).toBeInTheDocument();
  });
});
