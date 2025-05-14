import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EnviroMind</h3>
            <p className="text-green-100">Empowering sustainable choices for a better tomorrow.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-green-100 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sdg-information" className="text-green-100 hover:text-white transition">
                  SDG Information
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-green-100 hover:text-white transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/frequently-asked-questions" className="text-green-100 hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-green-100 hover:text-white transition">
                  Work With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-300" />
                <span>info@enviromind.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-300" />
                <span>123 Green Street, Eco City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-100">© 2023 EnviroMind. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" className="text-green-100 hover:text-white hover:bg-green-800">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm" className="text-green-100 hover:text-white hover:bg-green-800">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
