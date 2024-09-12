
import Link from "next/link";
import { Button } from "./button";

export default function Navbar() {
    return(
        <nav className="bg-background text-foreground p-4 border ">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center space-x-4">
    
      <Link href="/" className="text-2xl font-bold">Snippets</Link>
    </div>
   
    <div className="flex items-center space-x-4">
      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        Sign In
      </Button>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Sign Up
      </Button>
    </div>
  </div>
</nav>
    )
}