import { NextResponse } from "next/server";

export async function GET() {
  try {
    let response = await fetch("https://codeforces.com/api/user.info?handles=kshitij___x07", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      response = await fetch("https://codeforces.com/api/user.info?handles=kshitijx07", {
        next: { revalidate: 3600 },
      });
    }

    if (!response.ok) {
      throw new Error("Codeforces API error");
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.result?.[0]) {
      throw new Error("Invalid Codeforces data");
    }

    const user = data.result[0];

    return NextResponse.json({
      handle: user.handle,
      rating: user.rating || 1280,
      maxRating: user.maxRating || 1350,
      rank: user.rank || "pupil",
      maxRank: user.maxRank || "pupil",
      avatar: user.titlePhoto || "https://codeforces.org/s/0/images/user-card-icon.png",
      contestsCount: 14,
    });
  } catch (error) {
    return NextResponse.json({
      handle: "kshitij___x07",
      rating: 1280,
      maxRating: 1350,
      rank: "pupil",
      maxRank: "pupil",
      contestsCount: 14,
      isFallback: true,
    });
  }
}
