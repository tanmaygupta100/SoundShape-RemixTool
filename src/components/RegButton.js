/* Regular non-LED buttons: square, diagonal, and default circular.

onClick needs to be passed-in as an parameter to handle click logic from Main.jsx.
children is a parameter to display text/icons within parent container.
*/

const RegButton = ({shape, children, wid, hei, onClick}) =>
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
            onClick={onClick} // 1st is the common element. 2nd is my similarly named parameter.
        >
            {children}
        </button>
    );
};

export default RegButton;