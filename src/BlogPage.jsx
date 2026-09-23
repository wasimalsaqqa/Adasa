import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from './Nav'
import Footer from './Footer'
import postsData from './data/posts.json'

function BlogPage() {

  // Data and configuration
  const allArticles = postsData.posts

  const categoryOptions = [
    'جميع المقالات',
    'إضاءة',
    'بورتريه',
    'مناظر طبيعية',
    'تقنيات',
    'معدات'
  ]

  const articlesPerPage = 6

  // Page state
  const [keyword, setKeyword] = useState('')
  const [layoutType, setLayoutType] = useState('grid')
  const [pageNumber, setPageNumber] = useState(1)

  const [urlParams, setUrlParams] = useSearchParams()

  // Current category from the URL
  const selectedCategory =
    urlParams.get('category') || 'جميع المقالات'

  // Filtering
  const filteredArticles = allArticles.filter((article) => {

    const matchesKeyword =
      article.title.includes(keyword) ||
      article.excerpt.includes(keyword)

    const belongsToCategory =
      selectedCategory === 'جميع المقالات' ||
      article.category === selectedCategory

    return matchesKeyword && belongsToCategory
  })

  // Pagination
  const totalPageCount = Math.ceil(
    filteredArticles.length / articlesPerPage
  )

  const firstArticleIndex =
    (pageNumber - 1) * articlesPerPage

  const currentArticles = filteredArticles.slice(
    firstArticleIndex,
    firstArticleIndex + articlesPerPage
  )

  // Event handlers
  function updateSearchKeyword(event) {
    setKeyword(event.target.value)
    setPageNumber(1)
  }

  function chooseCategory(categoryOption) {

    setPageNumber(1)

    if (categoryOption === 'جميع المقالات') {

      setUrlParams({})

    } else {

      setUrlParams({
        category: categoryOption
      })

    }
  }

  function resetCategoryFilter() {
    setUrlParams({})
    setPageNumber(1)
  }

  return (
    <>
      <Navbar />

      <main
        dir="rtl"
        className="pt-20 min-h-screen bg-[#0a0a0a] text-white"
      >

        <section className="relative py-20 overflow-hidden">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(38,38,38,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(38,38,38,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 bg-orange-500/10 rounded-full mb-6">

              <span className="text-orange-500">
                ▣
              </span>

              <span className="text-sm text-neutral-300">
                مدونتنا
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">

              استكشف{' '}

              <span className="text-orange-500">
                مقالاتنا
              </span>

            </h1>

            <p className="text-xl text-neutral-400">
              اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
            </p>

          </div>

        </section>

        <section className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">

          <div className="max-w-7xl mx-auto px-4 py-4">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              <div className="relative w-full md:w-80">

                <input
                  type="text"
                  value={keyword}
                  onChange={updateSearchKeyword}
                  placeholder="ابحث في المقالات..."
                  className="w-full px-5 py-3 pr-5 pl-12 bg-[#161616] border border-[#262626] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

              </div>

              <div className="flex flex-wrap justify-center gap-2">

                {categoryOptions.map((categoryOption) => (

                  <button
                    key={categoryOption}
                    onClick={() => chooseCategory(categoryOption)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === categoryOption
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30'
                    }`}
                  >
                    {categoryOption}
                  </button>

                ))}

              </div>

            </div>

          </div>

        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <p className="text-neutral-400">

                عرض{' '}

                <span className="font-bold text-white">
                  {filteredArticles.length}
                </span>

                {' '}مقالات

                {selectedCategory !== 'جميع المقالات' && (
                  <>
                    {' '}في{' '}

                    <span className="text-orange-500 font-bold">
                      {selectedCategory}
                    </span>
                  </>
                )}

              </p>

            </div>

            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">

              <button
                onClick={() => setLayoutType('grid')}
                className={`p-2 rounded-lg ${
                  layoutType === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-400'
                }`}
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>

              </button>

              <button
                onClick={() => setLayoutType('list')}
                className={`p-2 rounded-lg ${
                  layoutType === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-400'
                }`}
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

              </button>

            </div>

          </div>

          {selectedCategory !== 'جميع المقالات' && (

            <div className="mb-8">

              <button
                onClick={resetCategoryFilter}
                className="text-neutral-500 hover:text-orange-500 text-sm transition"
              >
                ✕ مسح الفلتر
              </button>

            </div>

          )}

          {currentArticles.length === 0 && (

            <div className="text-center py-20">

              <h2 className="text-2xl font-bold mb-3">
                لا توجد نتائج
              </h2>

              <p className="text-neutral-500">
                جرب البحث بكلمة أخرى
              </p>

            </div>

          )}

          <div
            className={
              layoutType === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >

            {currentArticles.map((article) => (

              <article
                key={article.id}
                className={`group bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 ${
                  layoutType === 'list'
                    ? 'md:flex'
                    : ''
                }`}
              >

                <div
                  className={`relative overflow-hidden ${
                    layoutType === 'list'
                      ? 'md:w-[350px] h-64 md:h-auto'
                      : 'h-52'
                  }`}
                >

                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute top-4 right-4">

                    <span className="px-3 py-1 bg-[#0a0a0a]/80 text-white text-xs font-semibold rounded-full border border-[#333333]">
                      {article.category}
                    </span>

                  </div>

                </div>

                <div className="p-6 flex-1">

                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">

                    <span>
                      ◷ {article.readTime}
                    </span>

                    <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>

                    <span>
                      {article.date}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-neutral-400 mb-5 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#262626]">

                    <div className="flex items-center gap-3">

                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                      />

                      <div>

                        <p className="text-sm font-medium text-white">
                          {article.author.name}
                        </p>

                        <p className="text-xs text-neutral-500">
                          {article.author.role}
                        </p>

                      </div>

                    </div>

                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">

                      <span className="text-orange-500">
                        ←
                      </span>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

          {totalPageCount > 1 && (

            <>

              <div className="flex justify-center items-center gap-2 mt-12">

                <button
                  disabled={pageNumber === 1}
                  onClick={() =>
                    setPageNumber(pageNumber - 1)
                  }
                  className={`p-3 rounded-xl border border-[#262626] ${
                    pageNumber === 1
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'bg-[#161616] text-white hover:border-orange-500'
                  }`}
                >
                  →
                </button>

                <div className="flex items-center gap-1">

                  {Array.from(
                    { length: totalPageCount },
                    (_, index) => index + 1
                  ).map((buttonPage) => (

                    <button
                      key={buttonPage}
                      onClick={() => setPageNumber(buttonPage)}
                      className={`min-w-[44px] h-11 rounded-xl text-sm font-medium ${
                        pageNumber === buttonPage
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                          : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500'
                      }`}
                    >
                      {buttonPage}
                    </button>

                  ))}

                </div>

                <button
                  disabled={pageNumber === totalPageCount}
                  onClick={() =>
                    setPageNumber(pageNumber + 1)
                  }
                  className={`p-3 rounded-xl border border-[#262626] ${
                    pageNumber === totalPageCount
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'bg-[#161616] text-white hover:border-orange-500'
                  }`}
                >
                  ←
                </button>

              </div>

              <p className="text-center text-neutral-500 mt-4 text-sm">

                صفحة {pageNumber} من {totalPageCount}

              </p>

            </>

          )}

        </section>

      </main>

      <Footer />
    </>
  )
}

export default BlogPage