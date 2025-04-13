import dynamic from "next/dynamic";

const ConsentPage = dynamic(() => import("@/components/consent"), {
  ssr: false, // 클라이언트 사이드에서만 렌더링
});
import { title, subtitle } from "@/components/primitives";
// import ConsentPage from "@/components/consent";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ConsentPage />
    </section>
  );
}
