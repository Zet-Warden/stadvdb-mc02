import query from '/utils/query';

async function getAllMovieData(req, res) {
    try {
        const data = await query(`
    select movies.id as id, movies.name as title, movies.rank as rating, movies.year
    from movies 
    where movies.rank is not null
    `);

        const movies = data[0];
        res.json(movies);
    } catch (err) {
        res.json({ msg: err });
    }
}

export default getAllMovieData;
