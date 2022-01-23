import query from '../../utils/query';

async function getAllMovieData(req, res) {
    const data = await query(`
    SELECT movies.id, movies.rank, movies.year, movies_genres.genre, directors.first_name, directors.last_name, actors.first_name, actors.last_name
    FROM movies
    JOIN movies_genres on movies_genres.movie_id = movies.id
    JOIN movies_directors on movies_directors.director_id = movies.id
    JOIN directors on directors.id = movies_directors.director_id
    JOIN roles on roles.movie_id = movies.id
    JOIN actors on roles.actor_id = actors.id
    LIMIT 100000`);

    // console.log(data[0]);
    res.json(data[0]);
}

export default getAllMovieData;
