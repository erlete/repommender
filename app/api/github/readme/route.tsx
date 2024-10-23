import { NextRequest, NextResponse } from "next/server";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const fullName = searchParams.get("fullName");

  if (!fullName) {
    return new NextResponse("The 'fullName' parameter is required.", {
      status: 400,
    });
  }

  const GITHUB_PAT = process.env.GITHUB_PAT;

  if (!GITHUB_PAT) {
    return new NextResponse("GitHub PAT is not configured.", {
      status: 500,
    });
  }

  const url = `https://api.github.com/repos/${fullName}/readme`;
  const options = {
    headers: {
      Authorization: `token ${GITHUB_PAT}`,
      Accept: "application/vnd.github.v3.raw",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return new NextResponse(
        `Failed to fetch README.md from GitHub. Status: ${response.status}`,
        {
          status: response.status,
        }
      );
    }

    const readmeContent = await response.text();

    return new NextResponse(readmeContent, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(
      `An error occurred while fetching the README.md: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
