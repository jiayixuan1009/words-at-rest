declare module "virtual:content-dates" {
  const dates: Record<string, { published: string; modified: string }>;
  export default dates;
}
