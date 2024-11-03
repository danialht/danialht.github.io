import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import About from './About.tsx';
import Blog from './Blog.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;