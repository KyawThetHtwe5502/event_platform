import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
        <div className="wrapper flex flex-col sm:flex-row justify-between items-center p-5 text-center">
            <Link href={"/"}>
            <Image src="/assets/images/LOGOf.jpg" alt="logo" width={28} height={28} />
            </Link>
            <p>2025 Evently. All Rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer