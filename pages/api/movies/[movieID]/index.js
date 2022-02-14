import queryObj from '/utils/query';
const { query } = queryObj;

async function getMovieInfoByID(req, res) {
    const { movieID } = req.query;
    const data = await query(`
    select movies.id as id, movies.name as title, movies.rank as rating, movies.year
    from movies 
    where movies.rank is not null && movies.id = '${movieID}';`);

    console.log(data[0]);
    const movies = data[0];
    res.json(movies);
}

async function putMovieInfoByID(req, res) {
    const { title, year, rating, id } = req.body;
    try {
        await query(
            `
            update movies
            set name = '${title.replaceAll("'", "\\'").replaceAll('"', '\\"')}',
            year = ${year},
            \`rank\` = ${rating}
            where id = '${id}'; `
        );

        res.json({ msg: 'Data updated' });
    } catch (err) {
        res.status(500).json({ msg: 'Data not updated' });
    }
}

async function deleteMovieInfoByID(req, res) {
    const { id } = req.body;
    try {
        await query(`
            delete from movies
            where id = '${id}'; `);

        res.json({ msg: 'Data deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Data not deleted' });
    }
}

async function handler(req, res) {
    if (req.method === 'GET') {
        await getMovieInfoByID(req, res);
    } else if (req.method === 'PUT') {
        await putMovieInfoByID(req, res);
    } else if (req.method === 'DELETE') {
        await deleteMovieInfoByID(req, res);
    }
}

export default handler;
