import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { GET_ALL_MOVIES } from '../Query/queryMovies';
const Movies = () => {
  const { data, loading, error } = useQuery(GET_ALL_MOVIES);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setMovieData(data.movies);
    }
  }, [data, loading]);


  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Director</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movieData.map((movie, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {movie.name}
              </TableCell>
              <TableCell align="right">{movie.genre}</TableCell>
              <TableCell align="right">
                {movie.directors ? movie.directors.name : 'Not Available'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Movies;
