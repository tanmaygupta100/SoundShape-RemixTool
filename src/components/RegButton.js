

const RegButton = ({shape, children, wid, hei}) =>
{
    const getRegButtonClass = () => {
        switch (shape) {
            case 'sqr':
                return 'square-button';
            case 'dia':
                return 'diamond-button';
            default:
                return 'circle-button';
        }
    };

    return (
        <button
            className={`circle-button ${getRegButtonClass()}`}
            style={{ width: `${wid}px`, height: `${hei}px` }}
        >
            {children}
        </button>
    );
};

export default RegButton;