import EditButton from '../icons/edit.svg';
import DeleteButton from '../icons/delete.svg';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function MovieTable({ movies }) {
    return (
        <table className="w-full h-full">
            <tr>
                <th>Picture</th>
                <th className="text-left">Movie Title</th>
                <th>Rating</th>
                <th>Year</th>
            </tr>
            {movies &&
                movies.map((movie, index) => (
                    <MovieRow
                        key={movie.id}
                        info={movie}
                        isEven={index % 2 === 0}
                    />
                ))}
        </table>
    );
}

function MovieRow({ info, isEven }) {
    const [image, setImage] = useState('');

    useEffect(() => {
        const safeTitle = encodeURI(info.title);
        console.log(safeTitle);
        fetch(`http://www.omdbapi.com/?apikey=f94a33eb&s=${safeTitle}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === 'False') {
                    return setImage('');
                }
                const imgURL = data?.Search[0]?.Poster || '';
                if (imgURL === 'N/A') {
                    return setImage('');
                }
                setImage(imgURL);
            });
    }, [info.title]);

    const className = 'px-4 text-lg cursor-pointer';
    return (
        <tr className={isEven ? `bg-blue-100 ${className}` : className}>
            <td className="w-[20%] text-center m-auto flex items-stretch h-full">
                <img src={image || '/favicon.svg'} alt="movie poster" />
            </td>
            <td className="w-[50%] text-left">{info.title}</td>
            <td className="w-[10%] text-center">{info.rating || 'N/A'}</td>
            <td className="w-[10%] text-center">{info.year}</td>
            <td>
                <div className="flex justify-end gap-2 pr-5">
                    <EditButton />
                    <DeleteButton />
                </div>
            </td>
        </tr>
    );
}

export default MovieTable;
