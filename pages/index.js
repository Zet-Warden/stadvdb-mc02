import NavBar from '../src/components/NavBar';
import PaginatedMovieTable from '../src/components/PaginatedMovieTable';
import Modal from '../src/components/Modal';

export default function Home() {
    return (
        <>
            <header className="relative z-10">
                <NavBar />
            </header>
            <main className="flex justify-center min-h-[calc(100vh-3.5rem)]">
                <section className="container bg-white flex flex-col p-10">
                    <h1 className="text-5xl font-black text-center py-5">
                        IMDb Movies
                    </h1>
                    <PaginatedMovieTable moviesPerPage={10} />
                </section>
            </main>
        </>
    );
}
