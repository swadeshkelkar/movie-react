import { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

const Apifetch = () => {
  const apikey = process.env.REACT_APP_API_KEY;
  const apiUrl = (page) =>
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apikey}&page=${page}`;
  const [page, setPage] = useState(1);
  const [isloading, setLoading] = useState(false);
  const [movieslist, setMovieslist] = useState([]);
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  // let maxlimit;
  const loadPrevContent = () => {
    setLoading(true);
    setPage(page - 1);
  };
  const loadNextContent = () => {
    setLoading(true);
    setPage(page + 1);
  };
  useEffect(() => {
    const getMovies = async () => {
      const result = await fetch(apiUrl(page));
      const data = await result.json();
      // console.log(data);
      // maxlimit = data.total_pages;
      setMovieslist(data.results);
      setLoading(false);
    };
    getMovies();
  }, [page]);

  return (
    <div>
      {isloading && <LinearProgress />}
      <p> Pagination React App with Movie API, We are on {page} Page.</p>
      {page > 1 && (
        <Button variant="contained" color="primary" onClick={loadPrevContent}>
          Previous Page
        </Button>
      )}
      {page < 500 && (
        <Button
          variant="contained"
          color="primary"
          onClick={loadNextContent}
          style={{ marginLeft: "20px" }}
        >
          Next Page
        </Button>
      )}
      <div className="flex">
        {movieslist.length !== 0 &&
          movieslist.map((el, index) => {
            return (
              <div className="card" key={index}>
                <p>{el.title}</p>
                <img
                  alt={el.title}
                  id="movieposter"
                  src={IMGPATH + el.poster_path}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Apifetch;
