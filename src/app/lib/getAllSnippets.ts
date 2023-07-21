export async function getAllSnippets() {
  try {
    const response = await fetch("/api/getallsnippets", { cache: "no-store" });
    const snippets = await response.json();
    console.log(snippets);

    if (response.ok) {
      console.log("Snippet loaded successfully!");
      console.log(snippets);
      return snippets;
    } else {
      console.error("Error getting snippets:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error getting snippet:", error);
  }
}
