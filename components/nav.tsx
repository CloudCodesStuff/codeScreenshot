"use client"

import * as React from "react"
import { ModeToggle } from "./togglemode"


export function Nav() {

    return (
        <div className="fixed flex justify-between top-0 w-screen p-4">
            <h1 className="font-mono text-xl font-bold">code.so</h1>
            <ModeToggle />

        </div>
    )
}
