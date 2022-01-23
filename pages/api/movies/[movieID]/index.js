import query from '/utils/query';

async function getMovieInfoByID(req, res) {
    const { movieID } = req.query;
    const data = await query(`
    select movies.id as id, movies.name as title, movies.rank as rating, movies.year
    from movies 
    where movies.rank is not null
    limit 200;
    where movies.id = ${movieID};`);

    const movies = data[0];
    res.json(movies);
}

export default getMovieInfoByID;
