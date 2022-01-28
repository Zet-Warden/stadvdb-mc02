import Image from 'next/image';
import EditButton from '../icons/edit.svg';
import DeleteButton from '../icons/delete.svg';

function MovieRow({ info, isEven, handleClick }) {
    const className = 'px-4 text-xl cursor-pointer hover:bg-gray-300';

    return (
        <tr
            className={isEven ? `bg-blue-100 ${className}` : className}
            onClick={handleClick}
        >
            <td className="w-[20%] text-center">
                <div className="flex justify-center align-bottom">
                    <Image
                        src={`https://api.lorem.space/image/movie?w=300&h=440&x=${info.title}`}
                        alt="movie poster"
                        width={150 * 0.5}
                        height={220 * 0.5}
                        quality={1}
                    />
                </div>
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

export default MovieRow;
