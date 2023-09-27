"use client"
import ResizableDiv from '@/components/resize'
import Image from 'next/image'
import "./globals.css"
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Nav } from '@/components/nav';

export default function Home() {

  return (
    <div className='w-screen  bg-white dark:bg-black min-h-screen overflow-x-clip flex justify-center pt-5'>
      <Nav></Nav>
      <ResizableDiv></ResizableDiv>
      <Toaster />
    </div>
  )
}
