import query from '/utils/query';

async function getGenresByMovieID(req, res) {
    const { movieID } = req.query;
    const data = await query(`
    select movies_genres.genre
    from movies_genres
    join movies on movies_genres.movie_id = movies.id
    where movies.id = ${movieID};`);

    const genres = data[0];
    res.json(genres);
}

export default getGenresByMovieID;
