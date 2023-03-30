import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreationPage from "./Pages/CreationPage";
import Entries from "./Pages/Entries";
import "./styles/App.css";

function App() {

	const [post, setPost] = useState({
    title: "",
    body: "",
    date: Date.now(),
    avatar:
      '#',
		comments: []
  });


 return (
	<BrowserRouter>
		<Routes>
			<Route path="/main" element = {<Entries />}/>
			<Route path="/create" element = {<CreationPage post={post} setPost={setPost}/>}/>
			<Route path="/*" element={<Navigate to="/main" replace />} />
		</Routes>
	</BrowserRouter>
	)
 }
export default App;
