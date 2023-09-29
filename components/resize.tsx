"use client"
import React, { CSSProperties, useState, useRef, useEffect, MouseEvent, useCallback } from 'react';
import { Clipboard, Code, GripVertical, ImageIcon } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import Editor from './editor/Editor';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { toBlob, toPng, toSvg } from 'html-to-image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from './ui/use-toast';

const ResizableDiv: React.FC = () => {
    const { toast } = useToast()

    const [width, setWidth] = useState<number>(600); // Initial width
    const [height, setHeight] = useState<number | null>(null); // Initialize as null
    const [isResizing, setIsResizing] = useState<boolean>(false);
    // Refs to keep track of the resizing element and the initial mouse position
    const resizeHandle = useRef<HTMLDivElement | null>(null);
    const initialMouseX = useRef<number | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [padding, setPadding] = useState<string>("16px"); // Initialize padding as "16px"
    const [darkMode, setDarkmode] = useState<boolean>(true); // Initialize padding as "16px"
    const [trafficLights, setTrafficlights] = useState<boolean>(true); // Initialize padding as "16px"

    const [background, setBackground] = useState<string>("bg-gradient-to-br from-[#FE6062] to-[#5228A3]"); // Initialize background

    // ... (rest of your code)
    const [selectedLanguage, setSelectedLanguage] = useState<string>("jsx"); // Initialize the selected language

    // Event handler for language selection change
    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
    };
    const handleTrafficLights = (value: boolean) => {
        setTrafficlights(value)
    }
    const handleDarkmodeChange = (value: boolean) => {
        setDarkmode(value)
    }
    // Event handler for padding selection change
    const handlePaddingChange = (value: string) => {
        setPadding(value);
    };

    const handleBackgroundChange = (value: string) => {
        setBackground(value);
    };
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
        resizeHandle.current = e.currentTarget as HTMLDivElement;
        initialMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        if (resizeHandle.current) {
            resizeHandle.current.style.cursor = 'auto';
        }
        resizeHandle.current = null;
        initialMouseX.current = null;
    };
    const handleExport = () => {

    }

    const handleMouseMove = (ev: { clientX: number | null }) => {
        if (!isResizing || !resizeHandle.current || ev.clientX === null || initialMouseX.current === null) return;

        const offsetX = (ev.clientX - initialMouseX.current) * 2; // Double the cursor movement
        const newWidth = Math.min(1080, Math.max(375, width + offsetX)); // Adjust width based on offsetX
        setWidth(newWidth);
        initialMouseX.current = ev.clientX;
        if (resizeHandle.current) {
            resizeHandle.current.style.cursor = 'col-resize';
        }
    };



    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            // Cleanup event listeners when the component unmounts
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, width]);

    useEffect(() => {
        // Update the height whenever the component's height changes
        if (divRef.current) {
            setHeight(divRef.current.clientHeight);
        }
    }, [width]);

    const resizableDivStyle: CSSProperties = {
        width: `${width}px`,
        padding, // Apply the selected padding
        background, // Apply the selected background

    };


    const exportPng = useCallback(() => {
        if (divRef.current === null) {
            return
        }

        toPng(divRef.current, {
            cacheBust: true, canvasWidth: divRef.current.clientWidth * 2,
            canvasHeight: divRef.current.clientHeight * 2,
            quality: 0.95,
        })
            .then((dataUrl: string) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
                toast({
                    title: "Successfully exported!",
                    duration: 3000

                })
            })
            .catch((err: any) => {
                console.log(err)
                toast({
                    variant: "destructive",
                    title: "Something went wrong :(, please reload.",
                })
            })
    }, [divRef, toast])
    const exportClipboard = useCallback(async () => {
        if (divRef.current === null) {
            return
        }

        const blob = await toBlob(divRef.current, {
            cacheBust: true,
            canvasWidth: divRef.current.clientWidth * 2,
            canvasHeight: divRef.current.clientHeight * 2,
            quality: 0.95,
        });
        if (blob) {
            window.navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
            ]);
            toast({
                title: "Successfully copied!",
                duration: 3000,



            })

        } else {
            toast({
                variant: "destructive",
                title: "Something went wrong :(, please reload.",
            })
        }

    }, [divRef, toast])
    const exportSvg = useCallback(() => {
        if (divRef.current === null) {
            return
        }

        toSvg(divRef.current, {
            cacheBust: true,
            canvasWidth: divRef.current.clientWidth * 2,
            canvasHeight: divRef.current.clientHeight * 2,
            quality: 0.95,
        })
            .then((dataUrl: string) => {
                const link = document.createElement('a')
                link.download = 'code.svg'
                link.href = dataUrl
                link.click()
                toast({
                    title: "Successfully exported!",
                    duration: 3000
                })
            })
            .catch((err: any) => {
                console.log(err)
                toast({
                    variant: "destructive",
                    title: "Something went wrong :(, please reload.",
                })
            })
    }, [divRef, toast])
    return (
        <div>

            <div

                className="relative w-fit h-fit z-10  "
            >
                <div ref={divRef}
                    style={resizableDivStyle} className={`transition-padding ${background}`}>
                    <div className='nobg'></div>
                    <div className='p-[14px] '>
                        <div className='relative z-10 '>
                            <div className={`p-6 rounded-lg w-full   font-mono bg-opacity-80 backdrop-filter backdrop-blur-lg ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                <div className="flex justify-between  items-center">
                                    <div className={`flex space-x-2 ${trafficLights ? 'opacity-100' : 'opacity-0'}`} >
                                        <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`} />
                                        <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`} />
                                        <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-white opacity-40' : 'bg-black opacity-40'}`} />

                                    </div>
                                    <input placeholder={"Untitled-1"} className="text-muted-foreground rounded-md w-min  bg-transparent px-3 py-2 outline-none text-right text-sm"></input>
                                </div>
                                <div className='py-2'>
                                    <Editor darkMode={darkMode} language={selectedLanguage}></Editor>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div
                    className="dark:text-white text-zinc-900 absolute top-1/2 -translate-y-1/2 w-2 h-8  left-0 -translate-x-[13px] z-10 cursor-col-resize"
                    onMouseDown={handleMouseDown}
                >
                    <GripVertical></GripVertical>
                </div> */}
                <div
                    className="dark:bg-white bg-zinc-900 absolute top-1/2 rounded-full    -translate-y-1/2 w-2 h-8  right-0 -translate-x-1/2 z-10 cursor-col-resize"
                    onMouseDown={handleMouseDown}
                >
                    {/* <GripVertical /> */}

                </div>
                <div className="flex absolute -right-8 items-center justify-center top-0 bottom-0 z-10">
                    <div className="absolute -z-10 w-px top-0 bottom-0 left-1/2 -translate-x-1/2 bg-slate-200 dark:bg-zinc-800">
                    </div>
                    <p className="bg-white truncate rotate-90 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 dark:bg-background px-2 text-sm text-slate-600 dark:text-zinc-400">{height} px</p>
                </div>
                <div className="flex absolute -bottom-8 items-center justify-center left-0 right-0 z-10">
                    <div className="absolute -z-10 h-px left-0 right-0 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-zinc-800"></div>
                    <p className="absolute truncate top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background px-2 text-sm text-slate-600 dark:text-zinc-400">{width} px</p>
                </div>

            </div>
            <div className="fixed bottom-5  z-50 left-1/2 transform -translate-x-1/2  flex items-center bg-white dark:bg-black p-4 border border-opacity-20 rounded-lg bg-panel-background  gap-8">
                <div className='flex items-center space-x-2'>
                    <Label className='whitespace-nowrap' htmlFor="trafficLights">Traffic Lights</Label>
                    <Switch onCheckedChange={handleTrafficLights} checked={trafficLights} id='trafficLights'></Switch>
                </div>
                <div className='flex items-center space-x-2'>
                    <Label className='whitespace-nowrap' htmlFor="dark mode">Dark Mode</Label>
                    <Switch onCheckedChange={handleDarkmodeChange} checked={darkMode} id='dark mode'></Switch>
                </div>

                <Select onValueChange={handleLanguageChange} defaultValue={selectedLanguage} data-scrollable>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className='' >
                        <SelectGroup>
                            <SelectLabel>Language</SelectLabel>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="javascript">JS/TS</SelectItem>
                            <SelectItem value="jsx">JSX/TSX</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="markdown">Markdown</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="scss">SCSS</SelectItem>
                            <SelectItem value="rust">Rust</SelectItem>
                            <SelectItem value="c++">C++</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="c#">C#</SelectItem>
                            <SelectItem value="swift">Swift</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="sql">SQL</SelectItem>
                            <SelectItem value="php">PHP</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleBackgroundChange} defaultValue={background}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Background" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Background</SelectLabel>
                            <SelectItem value="bg-gradient-to-br from-[#FE6062] to-[#5228A3] ">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#FE6062] to-[#5228A3] rounded-full block'></span>
                                    <p>Fruit</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#FFD700] to-[#FFA500] ">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full block'></span>
                                    <p>Gold</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#5DBB63] to-[#0A74DA] ">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#5DBB63] to-[#0A74DA] rounded-full block'></span>
                                    <p>Earth</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="bg-gradient-to-br from-[#FF5733] to-[#FFC300]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#FF5733] to-[#FFC300] rounded-full block'></span>
                                    <p>Sunset</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#4A90E2] to-[#7C3FDD]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#4A90E2] to-[#7C3FDD] rounded-full block'></span>
                                    <p>Blueberry</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#a3b2cc] to-[#353645]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#a3b2cc] to-[#353645] rounded-full block'></span>
                                    <p>Stealth</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="bg-gradient-to-br from-[#00A9A5] to-[#FF6B6B]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#00A9A5] to-[#FF6B6B] rounded-full block'></span>
                                    <p>Reef</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="bg-gradient-to-br from-[#67d77c] to-[#44635b]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#67d77c] to-[#44635b] rounded-full block'></span>
                                    <p>Jungle</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#81C784] to-[#FF7043]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#81C784] to-[#FF7043] rounded-full block'></span>
                                    <p>Garden</p>
                                </div>
                            </SelectItem>

                            <SelectItem value="bg-gradient-to-br from-[#ff4528] to-[#831100]">
                                <div className='flex gap-2 items-center w-full'>
                                    <span className='w-4 h-4 bg-gradient-to-br from-[#ff4528] to-[#831100] rounded-full block'></span>
                                    <p>Blood Moon</p>
                                </div>
                            </SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={handlePaddingChange} defaultValue={padding}>
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="Padding" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Padding</SelectLabel>
                            <SelectItem value="16px">16px</SelectItem>
                            <SelectItem value="32px">32px</SelectItem>
                            <SelectItem value="64px">64px</SelectItem>
                            <SelectItem value="128px">128px</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>Export</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Export</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={exportPng}>
                                <Button variant={"ghost"} className='flex space-x-2 items-center cursor-pointer ' ><ImageIcon className='w-4 h-4 '></ImageIcon> <span>Export as PNG</span> </Button>

                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={exportSvg}>
                                <Button variant={"ghost"} className='flex space-x-2 items-center cursor-pointer ' ><ImageIcon className='w-4 h-4 '></ImageIcon> <span>Export as SVG</span> </Button>

                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={exportClipboard}>
                                <Button variant={"ghost"} className='flex space-x-2 items-center cursor-pointer ' ><Clipboard className='w-4 h-4 '></Clipboard> <span>Copy Image</span> </Button>

                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>


    );
};

export default ResizableDiv;
