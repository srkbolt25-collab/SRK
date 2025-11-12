import Layout from "@/components/Layout"

export default function ContactPage() {
  return (
    <Layout>
      <section className="bg-[#F7F7FA] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-[#2E1F44]">Speak With SRK Bolt</h1>
            <p className="text-[rgba(46,31,68,0.85)] text-lg">
              Tell us what you need and our fastener specialists will get back within one business day with solutions, pricing, and
              availability tailored to your project.
            </p>
            <a
              href="/srk-fastener.pdf"
              download
              className="inline-flex items-center gap-2 bg-[#A02222] text-white px-6 py-2.5 rounded-lg font-semibold border border-[#A02222] hover:bg-white hover:text-[#A02222] transition-colors shadow-lg"
            >
              See Products
            </a>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(46,31,68,0.08)] p-10 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-[#2E1F44]">Contact Information</h2>
                <p className="text-[rgba(46,31,68,0.7)]">
                  Reach us via phone or email for immediate assistance or drop by our office for an in-person consultation.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Head Office",
                    detail: [
                      "Sharjah Publishing City Free Zone (SPC Free Zone)",
                      "Al Zahia, Sheikh Mohammed Bin Zayed Rd",
                      "Sharjah, United Arab Emirates",
                    ],
                  },
                  {
                    title: "Retail Outlet",
                    detail: [
                      "SHOP- GA4304, near Entrance B",
                      "Dubai Trade YIWU Market, Jabal Ali Industrial Second",
                      "Dubai, United Arab Emirates",
                    ],
                  },
                  { title: "Phone", detail: ["+971 58 871 3064"] },
                  { title: "Email", detail: ["sales@srkbolt.com"] },
                  { title: "Working Hours", detail: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"] },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-[#A02222] text-white w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold">
                      {item.title.charAt(0)}
                  </div>
                  <div>
                      <h3 className="font-semibold text-[#2E1F44]">{item.title}</h3>
                      <div className="text-[rgba(46,31,68,0.7)] text-sm leading-relaxed">
                        {item.detail.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                  </div>
                </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(46,31,68,0.08)] p-10">
              <h2 className="text-2xl font-semibold text-[#2E1F44] mb-6">Send Us a Message</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#2E1F44] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777]"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#2E1F44] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#2E1F44] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777]"
                    placeholder="+971 58 871 3064"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2E1F44] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02222] placeholder:text-[#777]"
                    placeholder="Let us know about your requirements"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#A02222] hover:bg-[#2E1F44] text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}