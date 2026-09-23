import { Routes, Route } from 'react-router-dom'

import HomePage from './HomePage'
import BlogPage from './BlogPage'
import BlogDetailsPage from './BlogDetailsPage'
import NotFoundPage from './NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App