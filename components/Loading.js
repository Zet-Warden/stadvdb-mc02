import Spinner from './Spinner';

function Loading() {
    return (
        <div className="fixed inset-0 bg-[#50505040] flex justify-center items-center">
            <div>
                <Spinner />
            </div>
        </div>
    );
}

export default Loading;
