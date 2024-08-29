import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <div className="w-36 text-5xl font-bold">Personafy.</div>
            <div className="flex w-32 justify-end gap-3 ">
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full" size="lg">
                        <Link href="/sign-in" className="bg-slate-600 hover:bg-slate-700">Log In</Link>
                    </Button>
                </SignedOut>
            </div>
        </div>
    </header>
  )
}

export default Header
