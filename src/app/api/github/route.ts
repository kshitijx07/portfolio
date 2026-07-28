import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/kshitijx07", {
        headers: { "User-Agent": "PortfolioApp" },
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/kshitijx07/repos?per_page=100&sort=updated", {
        headers: { "User-Agent": "PortfolioApp" },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API error");
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
      : 12;

    const topLanguages = ["Docker", "TypeScript", "Java", "Python", "Go"];

    const recentRepos = Array.isArray(reposData)
      ? reposData.slice(0, 3).map((repo: any) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description || "Cloud & DevOps Project",
          stars: repo.stargazers_count,
          language: repo.language || "TypeScript",
        }))
      : [
          { name: "Hostelhub", url: "https://github.com/kshitijx07/Hostelhub", stars: 8, language: "TypeScript" },
          { name: "Grocito-Copy", url: "https://github.com/kshitijx07/Grocito-Copy", stars: 5, language: "Java" },
          { name: "serverless-ai-xray", url: "https://github.com/kshitijx07/serverless-ai-xray", stars: 4, language: "Python" }
        ];

    return NextResponse.json({
      username: userData.login || "kshitijx07",
      name: userData.name || "Kshitij Kumbhar",
      avatarUrl: userData.avatar_url || "https://github.com/kshitijx07.png",
      publicRepos: userData.public_repos || 18,
      followers: userData.followers || 24,
      following: userData.following || 15,
      totalStars,
      topLanguages,
      recentRepos,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Graceful Fallback data
    return NextResponse.json({
      username: "kshitijx07",
      name: "Kshitij Kumbhar",
      avatarUrl: "https://github.com/kshitijx07.png",
      publicRepos: 38,
      followers: 24,
      following: 15,
      totalStars: 14,
      topLanguages: ["Docker", "TypeScript", "Java", "Python", "Go"],
      recentRepos: [
        { name: "Hostelhub", url: "https://github.com/kshitijx07/Hostelhub", stars: 8, language: "TypeScript" },
        { name: "Grocito-Copy", url: "https://github.com/kshitijx07/Grocito-Copy", stars: 5, language: "Java" },
        { name: "serverless-ai-xray", url: "https://github.com/kshitijx07/serverless-ai-xray", stars: 4, language: "Python" }
      ],
      isFallback: true,
    });
  }
}
