import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://leetcode-stats-api.herokuapp.com/kshitij72", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("LeetCode API error");
    }

    const data = await response.json();

    if (data.status !== "success") {
      throw new Error("Invalid response from LeetCode");
    }

    return NextResponse.json({
      username: "kshitij72",
      totalSolved: data.totalSolved || 240,
      easySolved: data.easySolved || 110,
      mediumSolved: data.mediumSolved || 105,
      hardSolved: data.hardSolved || 25,
      acceptanceRate: data.acceptanceRate || 68.4,
      ranking: data.ranking || 142050,
      contributionPoints: data.contributionPoints || 450,
      currentStreak: 18,
    });
  } catch (error) {
    return NextResponse.json({
      username: "kshitij72",
      totalSolved: 240,
      easySolved: 110,
      mediumSolved: 105,
      hardSolved: 25,
      acceptanceRate: 68.4,
      ranking: 142050,
      contributionPoints: 450,
      currentStreak: 18,
      isFallback: true,
    });
  }
}
