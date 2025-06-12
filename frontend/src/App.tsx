import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlesList from "./ArticlesList";
import AllArticlesList from './AllArticlesList';
import Header from "./Header";
import CreatePost from "./CreatePost";

function App() {
  return (
    <Router>
      <div className="bg-zinc-50 min-h-screen flex flex-col items-center space-y-6 gap-7">
        <div className="w-full">
          <Header />
        </div>
        <div className="w-full flex justify-center p-10 gap-7">
          <Routes>
            <Route path="/" element={<ArticlesList />} />
            <Route path="/all/posts" element={<AllArticlesList />} />
            <Route path="/create/post" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;