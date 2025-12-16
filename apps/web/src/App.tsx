import { Route, Routes } from "react-router-dom"

import { AppLayout } from "./layout/AppLayout"
import { ArticleList } from "./pages/ArticleList"
import { DashboardPage } from "./pages/DashboardPage"
import { SettingsPage } from "./pages/SettingsPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
