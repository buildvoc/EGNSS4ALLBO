"use client";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.push('/login');
  })
  return (
<></>
  );
}
