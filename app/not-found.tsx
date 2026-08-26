import { NotFoundScreen } from "@/components/NotFoundScreen";

// Renders the same themed screen the jurisdiction gate shows, so a blocked
// visitor and a genuinely missing route are indistinguishable.
export default function NotFound() {
  return <NotFoundScreen />;
}
