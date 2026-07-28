import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = JSON.stringify({
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
              starRating
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username: "kshitij72" },
    });

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: query,
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error("LeetCode GraphQL HTTP error");
    }

    const json = await response.json();
    const matchedUser = json?.data?.matchedUser;

    if (!matchedUser) {
      throw new Error("User matchedUser not found");
    }

    const stats = matchedUser.submitStats?.acSubmissionNum || [];
    const allObj = stats.find((s: any) => s.difficulty === "All") || { count: 257 };
    const easyObj = stats.find((s: any) => s.difficulty === "Easy") || { count: 104 };
    const mediumObj = stats.find((s: any) => s.difficulty === "Medium") || { count: 138 };
    const hardObj = stats.find((s: any) => s.difficulty === "Hard") || { count: 15 };

    return NextResponse.json({
      username: "kshitij72",
      totalSolved: allObj.count || 257,
      easySolved: easyObj.count || 104,
      mediumSolved: mediumObj.count || 138,
      hardSolved: hardObj.count || 15,
      ranking: matchedUser.profile?.ranking || 605333,
      isLive: true,
    });
  } catch (error) {
    return NextResponse.json({
      username: "kshitij72",
      totalSolved: 257,
      easySolved: 104,
      mediumSolved: 138,
      hardSolved: 15,
      ranking: 605333,
      isFallback: true,
    });
  }
}
