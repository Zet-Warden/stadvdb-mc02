import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useDirectors(movieID) {
    const { data, error } = useSWR(`/api/movies/${movieID}/directors`, fetcher);

    return {
        directors: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useDirectors;
