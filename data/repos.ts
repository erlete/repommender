import unsanitizedRepos from "@/data/popular-repos.json";

export type Repository = {
  index: number;
  name: string;
  fullName: string;
  owner: string;
  htmlUrl: string;
  description: string;
  language: string;
  stargazersCount: string;
  createdAt: Date;
  updatedAt: Date;
};

export const REPOSITORIES: Repository[] = (unsanitizedRepos as any).map(
  (repo: any, index: number) => ({
    index: index,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner,
    htmlUrl: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazersCount: repo.stargazers_count,
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
  })
);
