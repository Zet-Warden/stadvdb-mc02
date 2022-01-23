import CloseButton from '../icons/x.svg';

function Modal({ children, removeModal }) {
    return (
        // modal container
        <div
            className="absolute top-[3.5rem] inset-0 bg-[#50505040]"
            onClick={removeModal}
        >
            {/* modal backdrop */}
            <div className="h-full flex justify-center items-center">
                <div
                    className="relative w-5/6 h-3/6 max-w-3xl border-2 border-white bg-white rounded-2xl flex items-center p-10"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <CloseButton
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={removeModal}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
