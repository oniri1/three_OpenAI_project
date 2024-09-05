"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/openAiProject");
  }, [router]);

  return <div>404</div>;
};

export default NotFound;
