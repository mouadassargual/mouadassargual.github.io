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
              <div className="flex flex-col gap-4">
                {/* Première rangée - 8 outils */}
                <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'Python', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/><path fill="#FFD43B" d="M21.34 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
                  { name: 'Notion', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg> },
                  { name: 'Flask', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M7.172 20.36c-.904-.732-1.396-1.552-1.836-2.796-.352-1.056-.444-1.744-.444-3.564 0-1.608.056-2.18.312-3.072.216-.764.344-1.04.704-1.504.212-.26.276-.396.276-.552 0-.196-.06-.288-.532-.812-.592-.66-1.06-1.432-1.336-2.2l-.152-.432h-.016c-.02 0-.108.268-.2.596-.388 1.48-.5 1.808-.664 2.108-.228.412-.656.732-1.212.912-.288.088-.584.132-1.064.14l-.68.012.212.28c.328.432.62 1.024.788 1.596.156.536.18.768.18 2.072 0 1.76-.132 2.656-.54 3.656-.408 1.004-.952 1.748-1.868 2.548L0 20.192l.184.168.744.18c2.644.636 4.86 1.892 6.352 3.604l.208.236.14-.14c.34-.34.82-.724 1.088-.868.336-.18.768-.3 1.216-.34l.36-.028.292.324c.352.392.616.604 1.024.82.74.388 1.26.444 2.688.288.948-.104 1.38-.116 2.088-.056 1.476.128 2.344.476 3.044 1.22l.148.16.056-.196c.18-.62.632-1.288 1.244-1.836.476-.428 1.048-.804 1.82-1.204l.564-.292-.232-.14c-1.16-.7-2.004-1.5-2.696-2.556-.68-1.04-1.188-2.344-1.44-3.696-.096-.516-.124-.876-.124-1.68 0-1.208.084-1.856.372-2.752.108-.34.196-.648.196-.684 0-.056-.044-.048-.196.032-.412.22-.984.416-1.424.488-.62.104-1.04.06-1.62-.164-.608-.236-1.032-.532-1.504-1.052l-.208-.228-.06.412c-.136.984-.576 1.94-1.244 2.7-.26.292-.356.448-.356.576 0 .128.092.304.324.62.5.68.728 1.252.916 2.32.12.68.12 2.244 0 2.94-.236 1.384-.6 2.304-1.232 3.128-.456.592-1.088 1.08-1.728 1.34-.092.036-.172.076-.18.088-.012.012.116.128.284.26.664.528 1.132 1.26 1.328 2.084.048.204.092.372.096.372.008 0 .072-.056.14-.128.32-.324.784-.592 1.248-.72.468-.132 1.108-.132 2.44-.004 1.012.1 1.232.096 1.84-.02.74-.14 1.252-.372 1.728-.784.32-.276.38-.32.38-.264 0 .012-.052.164-.12.34-.364.98-.356 2.124.02 3.1.276.712.736 1.324 1.416 1.88l.276.224.164-.18c.196-.22.572-.524.86-.696.248-.148.724-.336 1-.392.208-.044.552-.056 1.308-.044l1.028.016-.156-.164c-.552-.58-.82-1.032-1.04-1.756-.296-.968-.348-1.464-.348-3.352 0-1.888.056-2.432.348-3.38.216-.7.5-1.2 1.032-1.8l.336-.376-.424.016c-.78.028-1.256-.132-1.744-.588-.412-.384-.644-.808-.896-1.648-.14-.464-.18-.688-.212-1.204l-.04-.644-.112.16c-.248.348-.672.732-1.084.98-.72.432-1.46.584-2.364.484-.832-.092-1.4-.32-2.068-.828l-.26-.196-.004.18c-.02.7-.32 1.56-.78 2.24-.356.524-.94 1.072-1.42 1.332l-.188.1.26.304c.308.364.556.776.74 1.232.224.556.304 1.004.304 1.704 0 .876-.136 1.452-.516 2.196-.336.66-.7 1.084-1.348 1.572l-.324.244.228.16c.656.46 1.108 1.028 1.34 1.68.096.268.108.352.072.468-.084.256-.332.504-.56.56-.296.072-.712-.024-1.168-.268zm2.644-6.464c.344-.76.476-1.388.476-2.256 0-.792-.112-1.34-.396-1.948-.316-.68-.72-1.144-1.344-1.544-.284-.18-.316-.208-.284-.256.02-.028.156-.176.3-.324.54-.556.9-1.188 1.108-1.952.08-.288.096-.288.396.004.52.504 1.012.756 1.724.88.472.084.948.044 1.456-.12.14-.044.26-.068.268-.052.008.012-.048.176-.124.36-.316.768-.404 1.812-.232 2.72.204 1.072.692 2.084 1.4 2.9.148.172.264.32.26.332-.004.012-.172.092-.372.18-.9.392-1.612.988-2.1 1.756-.156.24-.288.444-.296.448-.008.004-.108-.112-.224-.26-.472-.6-1.108-1.068-1.84-1.348l-.284-.108.108-.412z"/></svg> },
                  { name: 'Figma', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#F24E1E" d="M8.148 24c2.489 0 4.515-2.014 4.515-4.49v-4.49H8.148c-2.476 0-4.49 2.014-4.49 4.49S5.672 24 8.148 24z"/><path fill="#A259FF" d="M3.658 10.51c0-2.476 2.014-4.49 4.49-4.49h4.515v8.98H8.148c-2.476 0-4.49-2.014-4.49-4.49z"/><path fill="#FF7262" d="M3.658 1.471C3.658.66 4.318 0 5.129 0h7.534v5.98H8.148c-2.476 0-4.49-2.014-4.49-4.51z"/><path fill="#1ABCFE" d="M12.663 0h4.515c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49h-4.515V0z"/><path fill="#0ACF83" d="M20.178 10.51c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49z"/></svg> },
                  { name: 'TensorFlow', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#FF6F00" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.416 5.393l-6.154-3.564v15.937L12.459 26V0l10.25 5.856-.001 5.393z"/></svg> },
                  { name: 'ClickUp', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#7B68EE" d="M2.652 16.9l2.997-2.277c1.736 2.278 3.59 3.36 5.907 3.36 2.314 0 4.282-1.107 5.94-3.318l2.97 2.318c-2.378 3.087-5.318 4.659-8.91 4.659-3.604 0-6.545-1.588-8.904-4.742zm9.088-12.541L6.39 8.753l-2.106-2.91L12.74.5l8.387 5.338-2.106 2.91-5.28-3.39z"/></svg> },
                  { name: 'Git/GitHub', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                  { name: 'Canva', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#00C4CC" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.873 16.751c-.234.376-.533.685-.885.917-.353.232-.753.387-1.18.461-.426.074-.867.047-1.276-.078-.41-.125-.78-.348-1.087-.654-.306-.306-.537-.684-.67-1.098-.134-.414-.165-.857-.092-1.283.073-.426.247-.826.506-1.159.26-.333.597-.59.978-.75.382-.16.8-.22 1.215-.173.416.047.808.199 1.14.44.33.24.589.56.753.929.164.37.227.778.182 1.18-.044.403-.193.783-.43 1.106-.237.324-.556.574-.918.728a2.126 2.126 0 0 1-1.136.158c.065.256.2.487.39.666.191.18.429.3.685.348.257.047.523.02.766-.08.242-.1.452-.264.607-.472.156-.209.252-.456.279-.714.027-.258-.016-.52-.124-.757-.109-.237-.28-.441-.495-.593-.215-.152-.467-.247-.73-.274a1.535 1.535 0 0 0-.792.104c-.252.102-.47.273-.627.495-.157.222-.249.483-.266.754-.018.27.04.54.167.78.126.24.317.443.55.587.234.144.503.224.78.232.276.008.55-.057.792-.19.243-.132.448-.327.594-.563.145-.237.226-.506.234-.782.008-.276-.057-.55-.19-.792a1.536 1.536 0 0 0-.563-.594c-.237-.145-.506-.226-.782-.234z"/></svg> },
                ].map((tool) => (
                  <div 
                    key={tool.name} 
                    className="group flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-default"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                    <span>{tool.name}</span>
                  </div>
                ))}
                </div>
                
                {/* Deuxième rangée - 6 outils */}
                <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'Claude AI', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#D97706" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
                  { name: 'OpenCV', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#5C3EE8" d="M11.941 0a7.529 7.529 0 0 0-7.471 6.706 7.529 7.529 0 0 0-2.618 1.639A7.529 7.529 0 0 0 .544 12a7.529 7.529 0 0 0 1.308 4.264 7.529 7.529 0 0 0 2.618 1.639 7.529 7.529 0 0 0 7.471 6.097 7.529 7.529 0 0 0 7.471-6.706 7.529 7.529 0 0 0 2.618-1.639A7.529 7.529 0 0 0 23.338 12a7.529 7.529 0 0 0-1.308-3.655 7.529 7.529 0 0 0-2.618-1.639A7.529 7.529 0 0 0 11.941 0zm0 2.824a4.706 4.706 0 0 1 4.706 4.706 4.706 4.706 0 0 1-4.706 4.706 4.706 4.706 0 0 1-4.706-4.706 4.706 4.706 0 0 1 4.706-4.706z"/></svg> },
                  { name: 'Google Workspace', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                  { name: 'Zapier', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#FF4A00" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.861 14.47l-1.14 1.14-2.861-2.861v4.054h-1.61v-4.054l-2.86 2.86-1.14-1.14 2.86-2.86H7.057v-1.61h4.053l-2.86-2.86 1.14-1.14 2.86 2.86V5.806h1.61v4.053l2.86-2.86 1.14 1.14-2.86 2.86h4.053v1.61H14z"/></svg> },
                  { name: 'Adobe Creative Suite', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#FF0000" d="M0 0h9.6L24 24H14.4L0 0zm14.4 0H24v24L14.4 0zM9.6 8.8L14.4 24H9.6l-1.44-4.8H4.8L9.6 8.8z"/></svg> },
                  { name: 'Meta Business Suite', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#0081FB" d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg> },
                ].map((tool) => (
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
