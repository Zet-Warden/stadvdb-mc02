import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useMovies() {
    const { data, error } = useSWR('/api/movies', fetcher);

    return {
        movies: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useMovies;
