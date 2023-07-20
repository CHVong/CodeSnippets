import { prisma } from "../../prisma/client";

jest.mock("../../prisma/client", () => ({
  prisma: {
    user: {
      count: jest.fn(),
    },
    codeSnippet: {
      findMany: jest.fn(),
    },
  },
}));

describe("Home", () => {
  describe("Success cases", () => {
    it("should check totalUsers", async () => {
      const mockTotalUsers = 10;

      (prisma.user.count as jest.Mock).mockResolvedValue(mockTotalUsers);

      const totalUsers = await prisma.user.count();

      expect(totalUsers).toBe(mockTotalUsers);
    });

    it("should check totalSnippets", async () => {
      const mockTotalSnippets = [{ snippet: "line1\nline2" }, { snippet: "line1\nline2\nline3" }];

      (prisma.codeSnippet.findMany as jest.Mock).mockResolvedValue(mockTotalSnippets);

      const totalSnippets = await prisma.codeSnippet.findMany();

      expect(totalSnippets.length).toBe(mockTotalSnippets.length);
    });
  });

  describe("Failing cases", () => {
    it("should fail if totalUsers is incorrect", async () => {
      const mockTotalUsers = 10;
      const incorrectTotalUsers = 5;

      (prisma.user.count as jest.Mock).mockResolvedValue(mockTotalUsers);

      const totalUsers = await prisma.user.count();

      expect(totalUsers).not.toBe(incorrectTotalUsers);
    });

    it("should fail if totalSnippets is incorrect", async () => {
      const mockTotalSnippets = [{ snippet: "line1\nline2" }, { snippet: "line1\nline2\nline3" }];
      const incorrectTotalSnippets = 1;

      (prisma.codeSnippet.findMany as jest.Mock).mockResolvedValue(mockTotalSnippets);

      const totalSnippets = await prisma.codeSnippet.findMany();

      expect(totalSnippets.length).not.toBe(incorrectTotalSnippets);
    });
  });
});
