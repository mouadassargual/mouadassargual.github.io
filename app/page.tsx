import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'
import CalendlyWidget from '@/components/CalendlyWidget'

// Fetch blog posts from Supabase
async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data as BlogPost[]
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const blogPosts = await getBlogPosts()

  return (
    <>
      {/* Hero Section - Premium */}
      <section id="home" aria-label="Hero section" className="min-h-screen bg-black flex items-center relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="section-container w-full py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-block mb-8">
                <span className="px-6 py-2 border border-white/20 text-white/60 text-sm uppercase tracking-[0.3em] backdrop-blur-sm">
                  Digital Transformation Expert
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8">
                <span className="text-white">Transforming Organizations</span><br/>
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Through Technology</span><br/>
                <span className="text-white">& Strategic Vision</span>
              </h1>

              <p className="text-base sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-2xl mb-8 sm:mb-12">
                Empowering leaders with innovation, strategy, and digital excellence.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16">
                <Link
                  href="#contact"
                  className="group relative px-6 py-4 sm:px-10 sm:py-5 bg-white text-black text-center font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                  aria-label="Contact Mouad Assargual"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Let's Collaborate
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                </Link>
                <Link
                  href="#about"
                  className="group relative px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm text-white text-center font-semibold border border-white/20 overflow-hidden transition-all duration-500 hover:border-white/50 hover:scale-105"
                  aria-label="Learn more about Mouad Assargual"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">Discover More</span>
                </Link>
              </div>

              {/* Stats - Glass cards with descriptions */}
              <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-6 sm:flex-wrap" role="list" aria-label="Professional statistics">
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 px-3 py-4 sm:px-8 sm:py-6 transition-all duration-500 hover:border-white/50 hover:scale-105 sm:max-w-[200px]" role="listitem">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2" aria-label="5 plus years of expertise">5+</div>
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mb-1">Years</div>
                    <div className="hidden sm:block text-xs text-gray-500 leading-relaxed">In digital transformation & institutional communication</div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 px-3 py-4 sm:px-8 sm:py-6 transition-all duration-500 hover:border-white/50 hover:scale-105 sm:max-w-[200px]" role="listitem">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2" aria-label="20 plus successful projects">20+</div>
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mb-1">Projects</div>
                    <div className="hidden sm:block text-xs text-gray-500 leading-relaxed">From political campaigns to Smart Cities initiatives</div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 px-3 py-4 sm:px-8 sm:py-6 transition-all duration-500 hover:border-white/50 hover:scale-105 sm:max-w-[200px]" role="listitem">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2" aria-label="15 plus institutions served">15+</div>
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mb-1">Clients</div>
                    <div className="hidden sm:block text-xs text-gray-500 leading-relaxed">Across government, public sector & political organizations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image - Enhanced */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-lg mx-auto group">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Image container with border */}
                <div className="relative w-full h-full border border-white/20 overflow-hidden transition-all duration-500 group-hover:border-white/50 group-hover:shadow-2xl group-hover:shadow-white/10">
                  <Image
                    src="/profile.jpg"
                    alt="Mouad Assargual"
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-4 text-white/50">
            <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" aria-labelledby="about-heading" className="section-light py-32">
        <div id="main-content" className="section-container">
          <div className="max-w-7xl mx-auto">
            <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>

            {/* Layout avec images et texte */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              {/* Première image */}
              <div className="lg:col-span-3">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/profile1a.jpg"
                      alt="Mouad Assargual - Professional"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium tracking-wider">CONSULTANT</div>
                </div>
              </div>

              {/* Contenu texte */}
              <div className="lg:col-span-6">
                <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                  <p className="text-2xl font-light text-black leading-relaxed">
                    "Bridging the gap between technology and human-centered governance."
                  </p>
                  <p>
                    I'm a <span className="text-black font-semibold">Digital Transformation & GovTech Consultant</span> based in Agadir, Morocco, helping organizations worldwide modernize through smart technology and strategic communication. At 24, I've already managed political campaigns, built AI solutions, and founded a digital agency.
                  </p>
                  <p>
                    Over 5 years, I've worked with <span className="text-black font-semibold">government organizations</span> and leaders to transform their digital operations. I combine modern technology, <span className="text-black font-semibold">artificial intelligence</span>, and <span className="text-black font-semibold">smart communication strategies</span> to help them succeed in today's digital world.
                  </p>
                  <p>
                    My approach is simple: <span className="text-black font-semibold">put people first</span>. Every solution I create—from Smart Cities projects to digital tools—is designed to serve citizens and institutions effectively, in Morocco and beyond.
                  </p>
                </div>
              </div>

              {/* Deuxième image */}
              <div className="lg:col-span-3">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 to-gray-200 opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/profile2b.jpg"
                      alt="Mouad Assargual - At Work"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium tracking-wider">STRATEGIST</div>
                </div>
              </div>
            </div>

            {/* Stats avec design créatif */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list" aria-label="About statistics">
              <div role="listitem" className="group p-6 border border-gray-200 hover:border-black hover:bg-black transition-all duration-300 cursor-default">
                <div className="text-5xl font-bold text-black group-hover:text-white mb-2 transition-colors" aria-label="5 plus years of experience">5+</div>
                <p className="text-sm text-text-secondary group-hover:text-gray-400 uppercase tracking-wider transition-colors">Years Experience</p>
              </div>
              <div role="listitem" className="group p-6 border border-gray-200 hover:border-black hover:bg-black transition-all duration-300 cursor-default">
                <div className="text-5xl font-bold text-black group-hover:text-white mb-2 transition-colors" aria-label="20 plus projects delivered">20+</div>
                <p className="text-sm text-text-secondary group-hover:text-gray-400 uppercase tracking-wider transition-colors">Projects Delivered</p>
              </div>
              <div role="listitem" className="group p-6 border border-gray-200 hover:border-black hover:bg-black transition-all duration-300 cursor-default">
                <div className="text-5xl font-bold text-black group-hover:text-white mb-2 transition-colors" aria-label="15 plus institutions served">15+</div>
                <p className="text-sm text-text-secondary group-hover:text-gray-400 uppercase tracking-wider transition-colors">Institutions</p>
              </div>
              <div role="listitem" className="group p-6 border border-gray-200 hover:border-black hover:bg-black transition-all duration-300 cursor-default">
                <div className="text-5xl font-bold text-black group-hover:text-white mb-2 transition-colors" aria-label="100 percent client satisfaction">100%</div>
                <p className="text-sm text-text-secondary group-hover:text-gray-400 uppercase tracking-wider transition-colors">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" aria-labelledby="services-heading" className="relative py-32 overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="section-container relative z-10">
          {/* Header - Premium style */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block mb-6 sm:mb-8">
              <span className="px-4 py-2 sm:px-6 border border-white/20 text-white/60 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] backdrop-blur-sm">
                Services
              </span>
            </div>
            <h2 id="services-heading" className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8">
              <span className="text-white">What I</span>{' '}
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Do</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              End-to-end solutions for Morocco's digital transformation journey
            </p>
          </div>

          {/* Services Grid - Bento Style Premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {/* Service 1 - Featured */}
            <article className="md:col-span-2 md:row-span-2 group relative bg-white text-black p-6 sm:p-10 min-h-[300px] sm:min-h-[400px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-gray-100 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">01</span>
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">🚀</div>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">Digital<br/>Transformation</h3>
              </div>
              <div className="relative z-10">
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
                  Comprehensive strategy and execution for public institutions modernization with citizen-first approach.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">Strategy</span>
                  <span className="px-4 py-2 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-colors">Modernization</span>
                  <span className="px-4 py-2 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-colors">Innovation</span>
                </div>
              </div>
            </article>

            {/* Service 2 */}
            <article className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/50 hover:scale-105 hover:shadow-xl hover:shadow-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">02</span>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">🏛️</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">GovTech Solutions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Technology platforms for government operations.</p>
              </div>
            </article>

            {/* Service 3 */}
            <article className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/50 hover:scale-105 hover:shadow-xl hover:shadow-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">03</span>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">📢</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Strategic Communication</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Clear messaging and stakeholder engagement.</p>
              </div>
            </article>

            {/* Service 4 */}
            <article className="group relative bg-white text-black p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-100 rounded-full group-hover:scale-[2] transition-transform duration-700"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">04</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">🤖</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">AI Integration</h3>
                <p className="text-gray-500 text-sm leading-relaxed">AI-powered decision enhancement.</p>
              </div>
            </article>

            {/* Service 5 */}
            <article className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">05</span>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">📋</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Public Affairs</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Strategic guidance on policy frameworks.</p>
              </div>
            </article>

            {/* Service 6 */}
            <article className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 sm:p-8 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">06</span>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💡</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Change Management</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Ensuring smooth adoption of new technologies and processes.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section id="skills" className="relative py-32 overflow-hidden bg-white">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-gray-100 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-gray-100 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header - Premium style */}
            <div className="text-center mb-20">
              <div className="inline-block mb-8">
                <span className="px-6 py-2 border border-black/20 text-black/60 text-sm uppercase tracking-[0.3em]">
                  Expertise
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="text-black">My</span>{' '}
                <span className="bg-gradient-to-r from-black via-gray-600 to-gray-400 bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Combining technical excellence with strategic vision to deliver transformative solutions
              </p>
            </div>

            {/* Skills Grid - Premium Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              
              {/* Technical Skills Column */}
              <div className="group relative bg-gradient-to-br from-black to-gray-900 p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500"></div>
                
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg">⚡</span>
                  Technical Expertise
                </h3>
                <div className="space-y-6">
                  <div className="group/item p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-white">AI Chatbots & Automation</h4>
                      <span className="text-sm text-white/50 px-3 py-1 border border-white/20">Expert</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-white to-white/50 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-white">AI Solutions Architecture</h4>
                      <span className="text-sm text-white/50 px-3 py-1 border border-white/20">Expert</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-white to-white/50 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-white">Smart Cities & Digital Governance</h4>
                      <span className="text-sm text-white/50 px-3 py-1 border border-white/20">Advanced</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-white to-white/50 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-white">GovTech Development (MyGovBot)</h4>
                      <span className="text-sm text-white/50 px-3 py-1 border border-white/20">Expert</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-white to-white/50 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-white">Data Analytics & Computer Vision</h4>
                      <span className="text-sm text-white/50 px-3 py-1 border border-white/20">Advanced</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-white to-white/50 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Skills Column */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-white p-10 border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:scale-[1.02] hover:border-black">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-200 rounded-full blur-2xl group-hover:bg-gray-300 transition-colors duration-500"></div>
                
                <h3 className="text-xs font-semibold text-black/50 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg">🎯</span>
                  Strategic Competencies
                </h3>
                <div className="space-y-6">
                  <div className="group/item p-4 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-black">Strategic & Political Communication</h4>
                      <span className="text-sm text-gray-500 px-3 py-1 border border-gray-300">Expert</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-black">Digital Marketing & Public Affairs</h4>
                      <span className="text-sm text-gray-500 px-3 py-1 border border-gray-300">Expert</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-black">Campaign Management</h4>
                      <span className="text-sm text-gray-500 px-3 py-1 border border-gray-300">Expert</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-black">Institutional Relations</h4>
                      <span className="text-sm text-gray-500 px-3 py-1 border border-gray-300">Advanced</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>

                  <div className="group/item p-4 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-lg font-semibold text-black">Digital Transformation Strategy</h4>
                      <span className="text-sm text-gray-500 px-3 py-1 border border-gray-300">Expert</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Technologies - Premium grid */}
            <div className="relative p-12 bg-gradient-to-br from-gray-50 to-white border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
              <h3 className="text-xs font-semibold text-black/50 uppercase tracking-[0.3em] mb-10 text-center">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'Python', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/><path fill="#FFD43B" d="M21.34 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
                  { name: 'Power BI', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#F2C811" d="M10 12v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8z"/><path fill="#E8B20A" d="M4 16v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path fill="#F0D86E" d="M16 8v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"/></svg> },
                  { name: 'Tableau', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#E97627" d="M11.654 5.406V.012h1.018v5.394h-1.018zm3.467 2.203h5.394v1.018h-5.394v-1.018zM11.654 24v-5.379h1.018V24h-1.018zM3.485 8.627V7.609h5.394v1.018H3.485zm8.169 7.745v-5.394h1.018v5.394h-1.018zM3.485 17.391v-1.018h5.394v1.018H3.485zm12.136 0v-1.018h5.394v1.018h-5.394zM11.654 13.355v-1.018h5.394v1.018h-5.394zm-8.169 0v-1.018h5.394v1.018H3.485z"/></svg> },
                  { name: 'Azure', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#0089D6" d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.175 2.7L6.913 11.071 0 21.3h4.552l8.623-18.6z"/></svg> },
                  { name: 'AWS', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/><path fill="#252F3E" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/></svg> },
                  { name: 'Notion', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg> },
                  { name: 'Figma', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#F24E1E" d="M8.148 24c2.489 0 4.515-2.014 4.515-4.49v-4.49H8.148c-2.476 0-4.49 2.014-4.49 4.49S5.672 24 8.148 24z"/><path fill="#A259FF" d="M3.658 10.51c0-2.476 2.014-4.49 4.49-4.49h4.515v8.98H8.148c-2.476 0-4.49-2.014-4.49-4.49z"/><path fill="#FF7262" d="M3.658 1.471C3.658.66 4.318 0 5.129 0h7.534v5.98H8.148c-2.476 0-4.49-2.014-4.49-4.51z"/><path fill="#1ABCFE" d="M12.663 0h4.515c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49h-4.515V0z"/><path fill="#0ACF83" d="M20.178 10.51c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49z"/></svg> },
                  { name: 'Jira', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><defs><linearGradient id="jira1" x1="99%" y1="20%" x2="30%" y2="80%"><stop offset="18%" stopColor="#0052CC"/><stop offset="100%" stopColor="#2684FF"/></linearGradient></defs><path fill="url(#jira1)" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005z"/><path fill="#2684FF" d="M17.294 5.757H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.005 1.005 0 0 0 23.013 0z"/></svg> },
                  { name: 'ChatGPT', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
                  { name: 'Claude AI', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#D97706" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
                  { name: 'Microsoft 365', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#F25022" d="M0 0h11.5v11.5H0z"/><path fill="#7FBA00" d="M12.5 0H24v11.5H12.5z"/><path fill="#00A4EF" d="M0 12.5h11.5V24H0z"/><path fill="#FFB900" d="M12.5 12.5H24V24H12.5z"/></svg> },
                  { name: 'Zapier', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#FF4A00" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.861 14.47l-1.14 1.14-2.861-2.861v4.054h-1.61v-4.054l-2.86 2.86-1.14-1.14 2.86-2.86H7.057v-1.61h4.053l-2.86-2.86 1.14-1.14 2.86 2.86V5.806h1.61v4.053l2.86-2.86 1.14 1.14-2.86 2.86h4.053v1.61H14z"/></svg> },
                ].map((tool, index) => (
                  <div 
                    key={tool.name} 
                    className="group flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-default"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="section-container relative z-10">
          {/* Header - Premium style */}
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <span className="px-6 py-2 border border-white/20 text-white/60 text-sm uppercase tracking-[0.3em] backdrop-blur-sm">
                Experience
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">My</span>{' '}
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Building expertise through education and impactful roles
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column - Academic Journey */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg">🎓</span>
                  Academic Journey
                </h3>
                
                {/* Academic Items - Vertical Stack */}
                <div className="space-y-4">
                  {/* Academic Item 1 - Current */}
                  <div className="group bg-white text-black p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">2023 - Present</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1">Master's in Embedded AI</h4>
                        <p className="text-gray-500 text-sm mb-2 font-medium">Faculty of Applied Sciences - Ait Melloul</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          TinyML, IoT systems, AI deployment on embedded devices. Smart Cities focus.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Item 2 */}
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-white/40 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 border border-white/30 text-white/80 text-xs font-bold uppercase tracking-wider">2020 - 2023</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1 text-white">Bachelor in Math & CS</h4>
                        <p className="text-white/60 text-sm mb-2 font-medium">Data Science Specialization</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Machine learning, data analysis, software development fundamentals.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Item 3 */}
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-white/40 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 border border-white/30 text-white/80 text-xs font-bold uppercase tracking-wider">2018 - 2020</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1 text-white">DUT in Computer Science</h4>
                        <p className="text-white/60 text-sm mb-2 font-medium">Higher School of Technology - Guelmim</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Programming, databases, software engineering fundamentals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Professional Experience */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg">💼</span>
                  Professional Experience
                </h3>
                
                {/* Professional Items - Vertical Stack */}
                <div className="space-y-4">
                  {/* Professional Item 1 - Current */}
                  <div className="group bg-white text-black p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">2024 - Present</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1">Digital Transformation & GovTech Consultant</h4>
                        <p className="text-gray-500 text-sm mb-2 font-medium">Independent Consultancy</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Specialized in digital strategy and political and institutional communication for Morocco's public sector. Managing active clients including government institutions and media platforms, delivering comprehensive digital transformation solutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Item 2 */}
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-white/40 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 border border-white/30 text-white/80 text-xs font-bold uppercase tracking-wider">2022 - 2024</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1 text-white">Founder & Lead Strategist</h4>
                        <p className="text-white/60 text-sm mb-2 font-medium">Digital Communications Agency</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Political campaigns & institutional communication. Winning mayoral campaign.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Item 3 */}
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-white/40 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 border border-white/30 text-white/80 text-xs font-bold uppercase tracking-wider">2021 - 2022</span>
                        </div>
                        <h4 className="text-lg font-bold mb-1 text-white">Communication Strategist</h4>
                        <p className="text-white/60 text-sm mb-2 font-medium">Freelance Projects</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Communication strategies for local events & institutional projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-light py-16 sm:py-24 lg:py-32">
        <div className="section-container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">How I Work</h2>
          <p className="text-lg text-text-secondary text-center mb-20 max-w-3xl mx-auto">
            A proven methodology for delivering successful digital transformation projects
          </p>

          {/* Workflow horizontal */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
              {/* Ligne de connexion horizontale (hidden on mobile) */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" style={{zIndex: 0}}></div>

              {/* Step 1 */}
              <div className="flex-1 relative">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                  01
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Discovery & Analysis</h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  Deep dive into your institution's needs, challenges, and objectives.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-gray-300 text-3xl relative z-10 -mx-4">
                →
              </div>

              {/* Step 2 */}
              <div className="flex-1 relative">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                  02
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Strategy Development</h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  Create tailored roadmaps combining technology and communication strategies.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-gray-300 text-3xl relative z-10 -mx-4">
                →
              </div>

              {/* Step 3 */}
              <div className="flex-1 relative">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                  03
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Implementation</h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  Execute the strategy with hands-on support and smooth adoption.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-gray-300 text-3xl relative z-10 -mx-4">
                →
              </div>

              {/* Step 4 */}
              <div className="flex-1 relative">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                  04
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Monitoring & Optimization</h3>
                <p className="text-text-secondary leading-relaxed text-base">
                  Continuous monitoring and iterative improvements to maximize impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="section-dark py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-white/40 uppercase tracking-[0.3em] text-sm mb-6">Trusted Partners</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Clients & References</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Collaborating with leading institutions to drive Morocco's digital transformation
            </p>
          </div>

          {/* Clients Grid - Premium Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className="group relative bg-white border border-white/10 hover:border-white p-8 md:p-10 flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              >
                {/* Logo */}
                <div className="relative w-full h-20 md:h-24 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={`/clients/client${num}.png`}
                    alt={`Client ${num}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <p className="text-center text-gray-500 text-sm mt-16">
            And many more institutions across Morocco
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-light py-16 sm:py-24 lg:py-32">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest Articles</h2>
              <p className="text-lg text-text-secondary max-w-2xl">
                Insights on digital transformation, GovTech, and strategic communication
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              More Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center text-text-secondary py-16">
              <p className="text-xl">No blog posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <article key={post.id} className="group h-full">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {post.image_url ? (
                      <div className="relative aspect-[16/10] overflow-hidden mb-8 border-2 border-border-light group-hover:border-black transition-colors">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] overflow-hidden mb-8 bg-secondary border-2 border-border-light flex items-center justify-center group-hover:border-black transition-colors">
                        <span className="text-text-secondary text-5xl">📝</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-5 text-black group-hover:text-black/70 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary mb-6 line-clamp-3 text-lg leading-relaxed">{post.excerpt}</p>
                    <span className="text-black text-base font-bold group-hover:underline inline-flex items-center">
                      Read more <span className="ml-2">→</span>
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="section-container relative z-10">
          {/* Header - More impactful */}
          <div className="text-center mb-24">
            <div className="inline-block mb-8">
              <span className="px-6 py-2 border border-white/20 text-white/60 text-sm uppercase tracking-[0.3em] backdrop-blur-sm">
                Get in Touch
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-none">
              <span className="text-white">Let's Create</span><br/>
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Something Great</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your institution? Let's discuss your vision.
            </p>
          </div>

          {/* Contact Cards - More dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
            {/* Email */}
            <a 
              href="mailto:contact@mouadas.me" 
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-10 transition-all duration-500 hover:border-white/50 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs text-white/30 uppercase tracking-wider font-medium">01</span>
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3 font-medium">Email</h3>
                <p className="text-white text-xl font-bold group-hover:text-white/90 transition-colors">
                  contact@mouadas.me
                </p>
                <div className="mt-6 flex items-center text-white/50 group-hover:text-white transition-colors text-sm">
                  <span>Send message</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Phone - Featured */}
            <a 
              href="tel:+212661955946" 
              className="group relative bg-white text-black p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs text-black/30 uppercase tracking-wider font-medium">02</span>
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm text-black/50 uppercase tracking-wider mb-3 font-medium">Phone / WhatsApp</h3>
                <p className="text-black text-xl font-bold">
                  +212 6 61 95 59 46
                </p>
                <div className="mt-6 flex items-center text-black/50 group-hover:text-black transition-colors text-sm">
                  <span>Call now</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-10 transition-all duration-500 hover:border-white/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs text-white/30 uppercase tracking-wider font-medium">03</span>
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3 font-medium">Location</h3>
                <p className="text-white text-xl font-bold">Agadir, Morocco</p>
                <div className="mt-6 flex items-center text-white/50 text-sm">
                  <span>🇲🇦 Available worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendly Section - Elevated */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-12 md:p-16 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 text-center mb-12">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-white/20">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Schedule a Consultation</h3>
                <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                  Book a free 30-minute call to explore how we can transform your institution together
                </p>
              </div>
              <CalendlyWidget />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <p className="text-gray-500 text-sm">
              Prefer email? Write to <a href="mailto:contact@mouadas.me" className="text-white hover:underline">contact@mouadas.me</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
