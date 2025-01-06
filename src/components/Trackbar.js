

const Trackbar = ({children, wid, hei}) => {

    return (
        <div
            className={`trackbar`}
            style={{ width: `${wid}px`, height: `${hei}px` }}
        >
            {children}
        </div>
    );
};

export default Trackbar;