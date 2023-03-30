import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PostService from "./API/PostService";
import CreationPage from "./Pages/CreationPage";
import Entries from "./Pages/Entries";
import "./styles/App.css";

function App() {
  const [post, setPost] = useState({
    title: "",
    body: "",
    date: Date.now(),
    avatar: "#",
    comments: [],
  });

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        setAllPosts(response.data);
      } catch (error) {
        console.log("Ошибка получения комментариев", JSON.parse(error), error);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Entries allPosts = {allPosts} setAllPosts = {setAllPosts}/>} />
        <Route
          path="/create"
          element={<CreationPage allPosts = {allPosts} setAllPosts = {setAllPosts} post={post} setPost={setPost} />}
        />
        <Route path="/*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
