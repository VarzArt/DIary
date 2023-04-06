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
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        setAllPosts(response.data);
      } catch (error) {
        console.log("Error receiving diary entries", JSON.parse(error), error);
      }
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const responseComments = await PostService.getAllComments();
        setAllComments(responseComments.data);
      } catch (error) {
        console.log("Error receiving diary comments", JSON.parse(error), error);
      }
    };
    fetchAllComments();
  }, [allPosts]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/main"
          element={
            <Entries
              allPosts={allPosts}
              setAllPosts={setAllPosts}
              setPost={setPost}
              post={post}
              allComments={allComments}
              setAllComments={setAllComments}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreationPage
              allPosts={allPosts}
              setAllPosts={setAllPosts}
              post={post}
              setPost={setPost}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
