

const RegButton = ({shape, children}) =>
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
            className={`
                circle-button
                ${getRegButtonClass()}
            `}
        >
            {children}
        </button>
    );
};

export default RegButton;