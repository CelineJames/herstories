import Image from "next/image";
import Link from "next/link";
// import facebook from '@/assets/facebook.png'
// import youtube from '@/assets/youtube.png'
// import instagram from '@/assets/instagram.png'
// import linkedIn from '@/assets/linkedIn.png'
// import tiktok from '@/assets/tiktok.png'
// import twitter from '@/assets/twitter.png'

export default function Footer() {
    return (
        <div className="w-full bg-primary text-ashwhite p-8 py-10 md:px-20 mt-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10  mx-auto">

                {/* Logo & Description */}
                <div className="md:w-1/2">
                    <div className="relative w-[150px] h-[50px] mb-4">
                        <Image
                            src="/logo-white.png"
                            alt="Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <p className="text-sm leading-relaxed">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quos
                        dolor praesentium quisquam molestias molestiae eos sit fugit inventore,

                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex md:justify-end gap-10 text-sm md:w-1/2">
                    <ul className="space-y-2">
                        <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link href="/legal" className="hover:text-white transition">Legal Docs</Link></li>
                        <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
                    </ul>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-white transition">Our Story</Link></li>
                        <li><Link href="/careers" className="hover:text-white transition">Career</Link></li>
                        <li><Link href="/press" className="hover:text-white transition">Press</Link></li>
                        <li><Link href="/company" className="hover:text-white transition">Company</Link></li>
                    </ul>

                </div>
            </div>
            <hr className="mt-14" />
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 py-6">
                <p className="font-poppins text-sm font-extralight"> © {new Date().getFullYear()} HerStories. All rights reserved.</p>
                <div className="flex justify-between items-center gap-6">
                    <Image src='/assets/facebook.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                    <Image src='/assets/twitter.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                    <Image src='/assets/linkedIn.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                    <Image src='/assets/youtube.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                    <Image src='/assets/instagram.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                    <Image src='/assets/tiktok.png' alt="" width={20} height={20} className="cursor-pointer hover:opacity-80 transition" />
                </div>
            </div>
            <hr />
        </div>
    );
}
