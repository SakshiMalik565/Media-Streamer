import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Watch from "./pages/Watch.jsx";
import Upload from "./pages/Upload.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";

function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/watch/:id" element={<Watch/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/watch-history" element={<WatchHistory/>}/>
      </Routes>
    </Layout>
  )
}
export default App;