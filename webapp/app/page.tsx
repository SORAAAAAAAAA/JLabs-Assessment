import { cookies } from "next/headers";
import { HomeClient } from "./components/home/HomeClient";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get("userSession")?.value;

  if (!sessionData) {
    redirect("/login");
  }

  let user = null;
  try {
    user = JSON.parse(sessionData);
  } catch (e) {
    return null;
  }

  return <HomeClient user={user} />;
}
