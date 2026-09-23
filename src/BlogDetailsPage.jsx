import { Link, useParams } from 'react-router-dom'
import Navbar from './Nav'
import Footer from './Footer'
import postsData from './data/posts.json'

function BlogDetailsPage() {

  const { slug: articleSlug } = useParams()

  const currentArticle = postsData.posts.find(
    (article) => article.slug === articleSlug
  )

  if (!currentArticle) {
    return (
      <>
        <Navbar />

        <div
          dir="rtl"
          className="pt-32 min-h-screen bg-[#0a0a0a] text-white text-center"
        >
          <h1 className="text-6xl font-bold mb-5">
            404
          </h1>

          <p className="text-neutral-400 mb-8">
            المقال غير موجود
          </p>

          <Link
            to="/"
            className="bg-orange-500 px-6 py-3 rounded-xl"
          >
            العودة للرئيسية
          </Link>
        </div>
      </>
    )
  }


  const articleSections = currentArticle.content.split('\n\n')

  const sectionTitles = articleSections
    .filter((section) => section.startsWith('## '))
    .map((section) => section.replace('## ', ''))

  const suggestedArticles = postsData.posts
    .filter(
      (article) =>
        article.category === currentArticle.category &&
        article.id !== currentArticle.id
    )
    .slice(0, 3)


  return (
    <>
      <Navbar />

      <main
        dir="rtl"
        className="pt-20 bg-[#0a0a0a] min-h-screen text-white"
      >

        <article>

          <div className="relative h-[60vh] min-h-[500px] overflow-hidden">

            <img
              src={currentArticle.image}
              alt={currentArticle.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>

            <div className="absolute top-8 right-8 left-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">

                <Link
                  to="/"
                  className="text-white/70 hover:text-white"
                >
                  الرئيسية
                </Link>

                <span className="text-white/30">
                  ‹
                </span>

                <Link
                  to="/blog"
                  className="text-white/70 hover:text-white"
                >
                  المدونة
                </Link>

                <span className="text-white/30">
                  ‹
                </span>

                <span className="text-orange-400">
                  {currentArticle.category}
                </span>

              </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">

              <div className="max-w-5xl mx-auto">

                <div className="flex flex-wrap items-center gap-3 mb-6">

                  <span className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full">
                    {currentArticle.category}
                  </span>

                  <div className="flex items-center gap-4 text-white/70 text-sm">

                    <span>
                      📅 {currentArticle.date}
                    </span>

                    <span>
                      ◷ {currentArticle.readTime}
                    </span>

                  </div>

                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                  {currentArticle.title}
                </h1>

                <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">

                  <img
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
                  />

                  <div>

                    <p className="font-bold text-white">
                      {currentArticle.author.name}
                    </p>

                    <p className="text-sm text-white/60">
                      {currentArticle.author.role}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="grid lg:grid-cols-[1fr_300px] gap-12">

              <div className="order-2 lg:order-1">

                <div className="p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">

                  <p className="text-lg text-neutral-200 leading-relaxed italic">
                    "{currentArticle.excerpt}"
                  </p>

                </div>

                <div>

                  {articleSections.map((section, sectionIndex) => {

                    if (section.startsWith('## ')) {

                      const sectionTitle = section.replace('## ', '')

                      const sectionPosition =
                        sectionTitles.indexOf(sectionTitle)

                      return (
                        <h2
                          id={`section-${sectionPosition}`}
                          key={sectionIndex}
                          className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24"
                        >

                          <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30 text-orange-500">
                            📷
                          </span>

                          {sectionTitle}

                        </h2>
                      )
                    }


                    return (
                      <p
                        key={sectionIndex}
                        className="text-neutral-300 leading-relaxed mb-6 text-lg"
                      >
                        {section}
                      </p>
                    )

                  })}

                </div>

                <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      🏷
                    </div>

                    <h3 className="font-bold text-white">
                      الوسوم
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {currentArticle.tags.map((articleTag) => (

                      <span
                        key={articleTag}
                        className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition"
                      >
                        #{articleTag}
                      </span>

                    ))}

                  </div>

                </div>

                <div className="mt-6 p-8 bg-gradient-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    <img
                      src={currentArticle.author.avatar}
                      alt={currentArticle.author.name}
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                    />

                    <div className="text-center sm:text-right flex-1">

                      <span className="text-xs text-orange-500 font-semibold">
                        كاتب المقال
                      </span>

                      <h3 className="text-xl font-bold text-white mt-1">
                        {currentArticle.author.name}
                      </h3>

                      <p className="text-neutral-500 text-sm mb-3">
                        {currentArticle.author.role}
                      </p>

                      <p className="text-neutral-400 text-sm leading-relaxed">
                        مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <aside className="order-1 lg:order-2">

                <div className="lg:sticky lg:top-24 space-y-6">

                  <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">

                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                        ☰
                      </div>

                      <h3 className="font-bold text-white">
                        محتويات المقال
                      </h3>

                    </div>

                    <nav className="space-y-2">

                      {sectionTitles.map((sectionTitle, sectionIndex) => (

                        <a
                          key={sectionIndex}
                          href={`#section-${sectionIndex}`}
                          className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition"
                        >

                          <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold">
                            {sectionIndex + 1}
                          </span>

                          <span className="text-sm">
                            {sectionTitle}
                          </span>

                        </a>

                      ))}

                    </nav>

                  </div>

                  <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">

                    <div className="grid grid-cols-2 gap-4">

                      <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">

                        <p className="text-orange-500 text-xl mb-2">
                          ◷
                        </p>

                        <p className="text-white font-bold text-sm">
                          {currentArticle.readTime}
                        </p>

                        <p className="text-neutral-500 text-xs">
                          وقت القراءة
                        </p>

                      </div>

                      <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">

                        <p className="text-orange-500 text-xl mb-2">
                          📅
                        </p>

                        <p className="text-white font-bold text-sm">
                          {currentArticle.date}
                        </p>

                        <p className="text-neutral-500 text-xs">
                          تاريخ النشر
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 text-center">

                    <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
                      ✉
                    </div>

                    <h3 className="font-bold text-white mb-2">
                      لا تفوّت جديدنا
                    </h3>

                    <p className="text-neutral-400 text-sm mb-4">
                      اشترك للحصول على أحدث المقالات
                    </p>

                    <Link
                      to="/blog"
                      className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
                    >
                      تصفح المزيد
                    </Link>

                  </div>

                </div>

              </aside>

            </div>

            <div className="mt-20 pt-12 border-t border-[#262626]">

              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    مقالات قد تعجبك
                  </h2>

                  <p className="text-neutral-500 text-sm mt-2">
                    استكشف المزيد من المحتوى المميز
                  </p>

                </div>

                <Link
                  to="/blog"
                  className="text-orange-500"
                >
                  عرض الكل ←
                </Link>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {suggestedArticles.map((suggestedArticle) => (

                  <div
                    key={suggestedArticle.id}
                    className="bg-[#111111] rounded-2xl overflow-hidden border border-[#262626]"
                  >

                    <div className="relative h-48">

                      <img
                        src={suggestedArticle.image}
                        alt={suggestedArticle.title}
                        className="w-full h-full object-cover"
                      />

                      <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 rounded-full text-xs">
                        {suggestedArticle.category}
                      </span>

                    </div>

                    <div className="p-5">

                      <h3 className="font-bold text-white mb-3">
                        {suggestedArticle.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-neutral-500">

                        <span className="flex items-center gap-2">

                          <img
                            src={suggestedArticle.author.avatar}
                            alt={suggestedArticle.author.name}
                            className="w-6 h-6 rounded-full"
                          />

                          {suggestedArticle.author.name}

                        </span>

                        <span>
                          {suggestedArticle.readTime}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </article>

      </main>

      <Footer />

    </>
  )
}

export default BlogDetailsPage