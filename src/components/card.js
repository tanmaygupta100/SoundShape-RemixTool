// Custom Card:

/* Arguments: {}
'children' is needed to pass content to this component when used.
'className' needed to behave as flex container.
*/

const Card = ({children, className}) => {
    return (
        <div className= {`
            bg-cusBg
            border-2 border-cusBrdr
            w-[400px] h-[400px]
            shadow-cusShadow rounded-xl
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