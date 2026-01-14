// import { ComponentExample } from "src/components/component-example";

// export default function Page() {
//   return <ComponentExample />;
// }

// app/page.tsx
import { supabase } from "src/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("test_connection")
    .select("*")
    .limit(1);

  if (error) {
    console.error(error);
    return <pre>Error: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
