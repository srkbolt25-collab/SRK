import Layout from "@/components/Layout"
import { Handshake, Building2, Globe2, ShieldCheck, Users, ArrowRight, Target, Sparkles } from "lucide-react"

const partnershipBenefits = [
  {
    icon: Handshake,
    title: "Strategic Collaboration",
    description:
      "Partner with SRK Bolt to support industrial fastening requirements through established sourcing, technical product knowledge and responsive regional supply service.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured Portfolio",
    description:
      "Access a catalogue of ISO, DIN and ASTM compliant fasteners with rigorous quality checkpoints at every stage.",
  },
  {
    icon: Globe2,
    title: "Global Supply Capability",
    description:
      "Serve customers across the Middle East, Africa, Europe and India with our agile logistics and 24/7 support.",
  },
  {
    icon: Users,
    title: "Dedicated Success Team",
    description:
      "Benefit from a dedicated partner success manager, tailored training, and co-branded marketing collateral.",
  },
]

const partnershipModels = [
  {
    title: "Channel Partners",
    description: "Distribute SRK Bolt inventory in your region with priority pricing and stock reservation.",
    points: ["Regional exclusivity options", "Partner portal access", "Forecast-driven replenishment"],
  },
  {
    title: "Project Alliances",
    description:
      "Collaborate on EPC, infrastructure and industrial turnkey projects with technical engineering support.",
    points: ["Joint bid proposals", "On-site application audits", "Custom packaging & kitting"],
  },
  {
    title: "OEM Collaborations",
    description:
      "Co-develop fastening programs tailored to OEM requirements with PPAP documentation and testing.",
    points: ["Vendor-managed inventory", "Prototype to production support", "Traceability compliant records"],
  },
]

const onboardingSteps = [
  {
    number: 1,
    title: "Submit Partner Profile",
    description: "Share your company credentials, regional presence and target sectors via the intake form.",
  },
  {
    number: 2,
    title: "Alignment Workshop",
    description: "Meet our partnership council to align on product lines, demand planning and go-to-market strategy.",
  },
  {
    number: 3,
    title: "Operational Kick-off",
    description:
      "Finalize commercials, introduce your team to our digital partner tools, and configure supply-chain workflows.",
  },
  {
    number: 4,
    title: "Launch & Scale",
    description: "Activate marketing support, schedule joint customer visits, and track KPIs with quarterly reviews.",
  },
]

export default function JoinUsPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-linear-to-r from-[#2E1F44] via-[#341B3C] to-[#220E2B] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#A02222] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A02222] rounded-full blur-[140px]"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-24 flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] text-xs font-semibold mb-6">
              Partnership Program
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Build With SRK Bolt —
              <span className="text-[#FFD5D5]"> Become a Strategic Partner</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              Join the SRK Bolt alliance and strengthen your portfolio with premium fasteners, engineered solutions,
              and a relationship-first supply network trusted across high-growth industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:partnerships@srkbolt.com"
                className="inline-flex items-center gap-2 bg-[#A02222] hover:bg-white text-white hover:text-[#A02222] transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/srk-fastener.pdf"
                download
                className="inline-flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#2E1F44] transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Download Capabilities
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-lg lg:ml-auto">
            {partnershipBenefits.slice(0, 4).map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFD5D5]/20 flex items-center justify-center text-[#FFD5D5]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{benefit.title}</h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E1F44]">Why Partner With SRK Bolt?</h2>
            <p className="mt-4 text-[#2E1F44]/70 text-lg">
              Leverage our sourcing network, technical product knowledge, and market intelligence to deliver seamless
              fastening programs for enterprises of every scale.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipBenefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(46,31,68,0.08)] p-6 flex flex-col gap-4 hover:-translate-y-2 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A02222]/10 text-[#A02222] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2E1F44]">{benefit.title}</h3>
                  <p className="text-sm text-[#2E1F44]/65 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-[#A02222]/10 text-[#A02222] px-3 py-1 rounded-full uppercase tracking-[0.3em] text-xs font-semibold">
              Partnership Models
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#2E1F44]">Choose How You Collaborate</h2>
            <p className="mt-4 text-[#2E1F44]/70 text-lg">
              Whether you are a distributor, EPC contractor, or OEM, our partner program is built to accelerate growth
              and profitability together.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {partnershipModels.map((model) => (
              <div
                key={model.title}
                className="border border-[#E5E5E5] rounded-2xl p-8 shadow-[0_12px_24px_rgba(46,31,68,0.05)] flex flex-col gap-5 hover:border-[#A02222] hover:shadow-[0_16px_32px_rgba(160,34,34,0.12)] transition-all"
              >
                <h3 className="text-xl font-semibold text-[#2E1F44]">{model.title}</h3>
                <p className="text-sm text-[#2E1F44]/70 leading-relaxed">{model.description}</p>
                <ul className="space-y-2 text-sm text-[#2E1F44]/75">
                  {model.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#A02222] mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2E1F44] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#A02222] rounded-full blur-[160px]"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Partner Onboarding Journey</h2>
              <p className="mt-3 text-white/75 text-lg">
                A guided process with transparent milestones to ensure every partnership launches with momentum.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {onboardingSteps.map((step) => (
                <div key={step.number} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-[#FFD5D5]/20 text-[#FFD5D5] flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.description}</p>
                  {step.number !== onboardingSteps.length && (
                    <Target className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block w-6 h-6 text-[#FFD5D5]/60" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#A02222] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Co-Create Value?</h2>
              <p className="mt-4 text-white/80 leading-relaxed text-lg">
                Share your interest and our partnership council will schedule a discovery session within 48 hours. Let’s
                engineer stronger ecosystems together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:partnerships@srkbolt.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#A02222] hover:bg-[#2E1F44] hover:text-white transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                partnerships@srkbolt.com
              </a>
              <a
                href="https://wa.me/971588713064"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/70 text-white hover:bg-white hover:text-[#A02222] transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                WhatsApp Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

