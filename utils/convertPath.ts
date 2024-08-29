export default function convertPath(inputPath: string): string {
  const newPath = inputPath.replace(
    "./assets",
    "https://raw.githubusercontent.com/tapanshah13/streamly/main/public/assets"
  );
  return newPath;
}
