import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"
import FooterLogo from "@/public/footer.jpeg"

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-20 w-60">
                <Image
                  src={FooterLogo}
                alt="SRK Bolt Logo" 
                  fill
                  className="object-contain"
              />
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Leading manufacturer and supplier of high-quality fasteners serving industries 
              across India and internationally since 2015. Your trusted partner for all 
              fastener solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-[#FFD5D5]">
                <Facebook className="w-4 h-4 text-[#A02222]" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-[#FFD5D5]">
                <Twitter className="w-4 h-4 text-[#A02222]" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-[#FFD5D5]">
                <Linkedin className="w-4 h-4 text-[#A02222]" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-[#FFD5D5]">
                <Instagram className="w-4 h-4 text-[#A02222]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/bolts" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Bolts
                </Link>
              </li>
              <li>
                <Link href="/nuts" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Nuts
                </Link>
              </li>
              <li>
                <Link href="/washers" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Washers
                </Link>
              </li>
              <li>
                <Link href="/screws" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Screws
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hook-eye" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Hook & Eye Products
                </Link>
              </li>
              <li>
                <Link href="/rivets" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Rivets, Pin & Inserts
                </Link>
              </li>
              <li>
                <Link href="/attachments" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Heavy Load Attachments
                </Link>
              </li>
              <li>
                <Link href="/other" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Other Products
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Major Projects
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-white/85 hover:text-[#A02222] transition-colors text-sm">
                  Our Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FFD5D5] mt-0.5 shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-semibold text-white">Head Office</p>
                  <p>
                    Sharjah Publishing City Free Zone (SPC Free Zone)<br />
                    Al Zahia, Sheikh Mohammed Bin Zayed Rd<br />
                    Sharjah, United Arab Emirates
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFD5D5] shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">+971 58 871 3064</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FFD5D5] shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">sales@srkbolt.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#FFD5D5] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM<br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#2A2A2A] bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[#CCCCCC] text-sm">
              © 2025 SRK Bolt Industries. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/70 hover:text-[#A02222] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-[#A02222] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-white/70 hover:text-[#A02222] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
