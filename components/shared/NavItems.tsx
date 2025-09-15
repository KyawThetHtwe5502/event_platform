"use client"
import { headerLinks } from "@/app/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
    const pathname = usePathname();
  return (
    <ul className="flex md:flex-row  justify-between   w-full flex-col items-start gap-5 ">
        
{
    headerLinks.map((link) => { 
        const isActive = pathname === link.href;
        return (
        <li key={link.href} className={`${isActive && 'text-blue-500'} flex items-center  whitespace-nowrap
`} >
            <Link href={link.href}>{link.label}</Link>
        </li>)
    })
}
    </ul>
  )
}

export default NavItems