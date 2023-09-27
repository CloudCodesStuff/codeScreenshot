"use client"

import * as React from "react"
import { ModeToggle } from "./togglemode"
import Image from "next/image"

export function Nav() {

    return (
        <div className="fixed flex justify-between top-0 w-screen p-4">
            <div className="p-5 bg-green-600 absolute z-0 blur-xl"></div>
            <div className="p-20 rounded-full bg-blue-900 absolute left-16 -top-10 z-0 blur-3xl"></div>
            <div className="p-10  bg-purple-900 absolute top-16 z-0 blur-2xl"></div>

            <Image alt="slab logo" src="logo.svg" className="w-20 z-10" width={350} height={600} ></Image>
            <ModeToggle />

        </div>
    )
}
