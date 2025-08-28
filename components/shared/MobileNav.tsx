import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'
import { HiMenuAlt3 } from "react-icons/hi";
import NavItems from './NavItems';
import { Separator } from '../ui/separator';


const MobileNav = () => {
  return (
    <nav className='md:hidden'>
        <Sheet>
  <SheetTrigger className='align-middle'>
    <HiMenuAlt3 size={24} className='cursor-pointer' />
  </SheetTrigger>
  <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
    <Image src={'/assets/images/LOGOf.jpg'} alt='logo' width={28} height={38} />
    <Separator/>
    <NavItems/>
  </SheetContent>
</Sheet>
    </nav>
  )
}

export default MobileNav