import { handpickedProjectDetails } from "@/constants";
import { GitHubStars } from "@/components/header/github-stars";
import { Button } from "@/components/ui/button";
import githubIcon from "@/assets/icons/github.svg";

export default function HeaderGitHubButton() {
  const { repoOwner, repoName } = handpickedProjectDetails;

  return (
    <Button asChild size="sm" variant="ghost" className="sm:flex">
      <a
        href={`https://github.com/${repoOwner}/${repoName}`}
        rel="noopener noreferrer"
        target="_blank"
        className="dark:text-foreground flex items-center gap-1"
      >
        <img
          src={githubIcon}
          alt="GitHub"
          className="h-4 w-4 invert-0 dark:invert transition-all"
        />

        <GitHubStars repoOwner={repoOwner} repoName={repoName} />
      </a>
    </Button>
  );
}
