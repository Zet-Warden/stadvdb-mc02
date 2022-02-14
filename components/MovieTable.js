import { useEffect, useState } from 'react';
import SortButtonIcon from '../icons/sort.svg';
import MovieRow from './MovieRow';

function MovieTable({
    movies,
    handleTitleSort,
    handleRatingSort,
    handleYearSort,
    handleChangeData,
    handleDeleteData,
}) {
    return (
        <table className="w-full  max-h-min">
            <thead>
                <tr>
                    <th className="text-2xl">Picture</th>
                    <th className="text-2xl text-left">
                        <div className="flex gap-1">
                            Movie Title
                            <SortButton handleSort={handleTitleSort} />
                        </div>
                    </th>
                    <th className="text-2xl">
                        <div className="flex justify-center gap-1">
                            Rating
                            <SortButton handleSort={handleRatingSort} />
                        </div>
                    </th>
                    <th className="text-2xl">
                        <div className="flex justify-center gap-1">
                            Year
                            <SortButton handleSort={handleYearSort} />
                        </div>
                    </th>
                    <th className="sr-only">Edit and Delete Buttons</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index) => (
                    <MovieRow
                        key={movie.id}
                        info={movie}
                        isEven={index % 2 === 0}
                        handleChangeData={handleChangeData}
                        handleDeleteData={handleDeleteData}
                    />
                ))}
            </tbody>
        </table>
    );
}

function SortButton({ handleSort }) {
    const [isAscending, setIsAscending] = useState(true);

    const handleOnClick = () => {
        handleSort(!isAscending);
        setIsAscending((isAscending) => !isAscending);
    };

    return (
        <span
            className="flex items-center cursor-pointer align-baseline"
            onClick={handleOnClick}
        >
            <SortButtonIcon className={!isAscending ? 'rotate-180' : ''} />
        </span>
    );
}

export default MovieTable;
