// Custom Card:

/* Arguments: {}
'children' is needed to pass content to this component when used.
'className' needed to behave as flex container.
*/

const Card = ({children, className}) => {
    return (
        <div className= {`
            bg-blue-500
            border border-red-500
            w-[400px] h-[400px]
            shadow-xl rounded-md"
            ${className}
        `}>
            {children}
        </div>
    );
};

export default Card;

/* flex:
items-center: vertical centering
justify-center: horizontal centering
*/