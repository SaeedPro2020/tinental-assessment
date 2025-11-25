import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, depends }) => {
  depends("app:students");

  // Fetch from API, not local service!
  const res = await fetch("/students");
  const students = await res.json();

  return { students };
};
