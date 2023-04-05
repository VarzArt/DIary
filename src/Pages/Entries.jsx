import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import FilterForm from "../components/FilterForm";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import MyButton from "../components/UI/button/MyButton";
import addBtn from "../assets/images/add.svg";
import { Link } from "react-router-dom";

function Entries({ allPosts, setAllPosts, ...props }) {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
    dateBot: new Date(0).toDateString(),
    dateTop: new Date(2639997412690).toDateString(),
  });

  const getPages = (response) => {
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  };
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    if (!filter.sort && !filter.query) {
      const response = await PostService.getAll(limit, page);
      getPages(response);
    } else {
      const response = await PostService.getFilterAndSort(
        limit,
        page,
        filter.sort,
        filter.query,
        Date.parse(filter.dateBot),
        Date.parse(filter.dateTop)
      );
      getPages(response);
    }
  });

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, filter, allPosts, props.post]);

  const onDeletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post));
    setAllPosts(allPosts.filter((p) => p.id !== post));
    if (allPosts.length % limit === 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="App">
      <div>
        <FilterForm setPage={setPage} filter={filter} setFilter={setFilter} />
      </div>
      <div className="creation__btn">
        <Link to="/create">
          <MyButton
            src={addBtn}
            style={{
              fontSize: "2rem",
              margin: "2rem",
              backdropFilter: "blur(1rem)",
            }}
          >
            Create new entry!
          </MyButton>
        </Link>
      </div>
      {postError && <h1>Error ${postError}</h1>}
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          onDeletePost={onDeletePost}
          posts={posts}
          title="List of entries"
          setPost={props.setPost}
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Entries;
