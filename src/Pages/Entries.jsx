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
import moment from "moment/moment";

function Entries({ allPosts, setAllPosts, ...props }) {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
    dateBot: moment()
      .subtract(3, "years")
      .add(1, "day")
      .utc()
      .local()
      .format("YYYY-MM-DD"),
    dateTop: moment().add(1, "day").utc().local().format("YYYY-MM-DD"),
  });

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getFilterAndSort(
      limit,
      page,
      filter.sort,
      filter.query,
      Number(moment(filter.dateBot).format("x")),
      Number(moment(filter.dateTop).format("x"))
    );
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
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
        <Link to="/create" style={{ margin: "2rem" }}>
          <MyButton
            src={addBtn}
            style={{
              fontSize: "2rem",
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
          allComments={props.allComments}
          setAllComments={props.setAllComments}
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Entries;
