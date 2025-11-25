import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, depends }) => {
  depends("app:teachers");

  // Fetch from API, not local service!
  const res = await fetch("/teachers");
  const teachers = await res.json();

  return { teachers };
};
