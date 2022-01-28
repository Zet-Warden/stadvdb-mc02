import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useMovies from '../hooks/useMovies';
import MovieTable from './MovieTable';
import PreviousButton from '../icons/previous.svg';
import Spinner from './Spinner';

function PaginatedMovieTable({ moviesPerPage }) {
    const { movies: moviesData, isLoading } = useMovies();
    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setMovies(moviesData);
        }
    }, [moviesData, isLoading]);

    useEffect(() => {
        const endOffset = itemOffset + moviesPerPage;
        setCurrentMovies(movies.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(movies.length / moviesPerPage));
    }, [movies, itemOffset, moviesPerPage]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner />
            </div>
        );
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * moviesPerPage) % movies.length;
        setItemOffset(newOffset);
    };

    const createMovieComparator = (isAscending, field) => {
        const order = isAscending ? 1 : -1;

        return (a, b) => {
            //sorts by string
            if (typeof a[field] === 'string') {
                var first = a[field].toLowerCase().trim();
                var second = b[field].toLowerCase().trim();

                if (first < second) {
                    return -1 * order;
                } else if (second < first) {
                    return 1 * order;
                }
                return 0;
            }
            //sorts by number
            else {
                var first = a[field];
                var second = b[field];
            }
            return (first - second) * order;
        };
    };

    const createSortFunction = (field) => {
        return (isAscending) => {
            const moviesCopy = [...movies];
            console.log(moviesCopy);
            moviesCopy.sort(createMovieComparator(isAscending, field));
            console.log(moviesCopy);
            setMovies(moviesCopy);
        };
    };

    const sortByTitle = createSortFunction('title');
    const sortByRating = createSortFunction('rating');
    const sortByYear = createSortFunction('year');

    return (
        <>
            <MovieTable
                movies={currentMovies}
                handleTitleSort={sortByTitle}
                handleRatingSort={sortByRating}
                handleYearSort={sortByYear}
            />
            <ReactPaginate
                breakLabel={'...'}
                marginPagesDisplayed={0}
                nextLabel={
                    <PreviousButton className="w-8 aspect-square absolute left-2 top-1/2 -translate-y-1/2 rotate-180" />
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={
                    <PreviousButton className="w-8 aspect-square absolute right-2 top-1/2 -translate-y-1/2" />
                }
                className="flex justify-center"
                activeClassName="bg-blue-300"
                pageClassName="relative w-12 aspect-square text-center border border-solid border-gray-400"
                pageLinkClassName="flex justify-center items-center w-full h-full"
                nextClassName="p-3 relative"
                previousClassName="p-3 relative "
                disabledClassName="brightness-75"
                disabledLinkClassName="cursor-default"
                breakClassName="w-12 aspect-square text-center border border-solid border-gray-400"
                breakLinkClassName="flex justify-center items-center w-full h-full"
            />
        </>
    );
}

export default PaginatedMovieTable;
