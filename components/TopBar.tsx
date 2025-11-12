import Link from "next/link"

export default function TopBar() {
  return (
    <div className="bg-[#A02222] text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm font-semibold">
        <span className="tracking-wide">Celebrating 10+ Years Of Excellence</span>
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="transition-colors hover:text-[#FFD5D5] hover:underline">About Us</Link>
          <Link href="/projects" className="transition-colors hover:text-[#FFD5D5] hover:underline">Projects</Link>
          <Link href="/contact" className="transition-colors hover:text-[#FFD5D5] hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
