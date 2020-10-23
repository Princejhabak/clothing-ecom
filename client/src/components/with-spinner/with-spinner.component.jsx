import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styles.jsx'
import React from 'react'
const WithSpinner = WrappedComponent =>{
    const Spinner=({isLoading,...otherProps})=>{
    return isLoading?(
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ):(
        <WrappedComponent {...otherProps}/>
    )
}
    return Spinner
}

export default WithSpinner

// import React from 'react';

// import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// const WithSpinner = WrappedComponent => {
//   const Spinner = ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//       <SpinnerOverlay>
//         <SpinnerContainer />
//       </SpinnerOverlay>
//     ) : (
//       <WrappedComponent {...otherProps} />
//     );
//   };
//   return Spinner;
// };

// export default WithSpinner;