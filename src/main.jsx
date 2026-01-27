import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import CreatePost from './pages/CreatePost.jsx'
import ViewPosts from './pages/ViewPosts.jsx'
import DetailedView from './pages/DetailedView.jsx'
import EditPost from './pages/EditPost.jsx'
import ProfileView from './pages/Profile.jsx'
import Account from './components/Account.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/view" element={<ViewPosts />} />
        <Route path="/view/:id" element={<DetailedView />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profile/edit" element={<Account />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
