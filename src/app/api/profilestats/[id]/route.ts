import { prisma } from "../../../../../prisma/client";

type session = {
  id: string;
};

export async function GET(request: Request, params: { params: session }) {
  const id = params.params.id;

  try {
    if (!id) {
      return new Response("sessionId query parameter is missing", {
        status: 400,
      });
    }

    const Snippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
      },
    });
    const publicSnippets = await prisma.codeSnippet.findMany({
      where: {
        posterId: id,
        isPublic: true,
      },
    });

    const Comments = await prisma.snippetComment.findMany({
      where: {
        commenterId: id,
      },
    });
    const Favorited = await prisma.codeSnippet.findMany({
      where: {
        favorites: {
          has: id,
        },
      },
    });

    const totalLines = Snippets.reduce((count, snippet) => {
      const lines = snippet.snippet.split("\n");
      return count + lines.length;
    }, 0);
    const languageCount: any = {};

    // Iterate over each snippet and count the occurrences of each language
    Snippets.forEach((snippet) => {
      const language = snippet.language;

      if (language in languageCount) {
        languageCount[language]++;
      } else {
        languageCount[language] = 1;
      }
    });

    // Find the most popular language(s) by finding the language(s) with the highest count
    let maxCount = 0;
    const popularLanguages = [];

    for (const language in languageCount) {
      if (languageCount[language] > maxCount) {
        popularLanguages.splice(0, popularLanguages.length, language); // Replace existing popular languages
        maxCount = languageCount[language];
      } else if (languageCount[language] === maxCount) {
        popularLanguages.push(language); // Add tied language to the popular languages array
      }
    }

    const stats = {
      totalSnippets: Snippets.length,
      favorited: Favorited.length,
      totalComments: Comments.length,
      totalLines: totalLines,
      publicSnippets: publicSnippets.length,
      mostPopularLanguage: popularLanguages,
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
