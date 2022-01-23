import query from '/utils/query';

async function getDirectorsByMovieID(req, res) {
    const { movieID } = req.query;
    const data = await query(`
    select directors.first_name, directors.last_name
    from directors
    join movies_directors on directors.id = movies_directors.director_id
    join movies on movies_directors.movie_id = movies.id
    where movies.id = ${movieID};`);

    const directors = data[0];
    res.json(directors);
}

export default getDirectorsByMovieID;
