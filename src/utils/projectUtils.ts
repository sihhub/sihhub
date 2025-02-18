import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsPath = path.join(process.cwd(), "data/projects");

export async function getProjects() {
  const fileNames = fs.readdirSync(projectsPath);

  const allProjects = await Promise.all(
    fileNames.map(async (fileName) => {
      return await getProject(fileName);
    })
  );

  return allProjects.sort((a, b) => b.index - a.index);
}

export async function getProject(fileName: string) {
  const filePath = path.join(projectsPath, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const matterResult = matter(fileContent);

  return {
    ...matterResult.data,
  };
}
