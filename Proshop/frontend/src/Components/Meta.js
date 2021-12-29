import React from 'react'
import {Helmet} from 'react-helmet';

const Meta = ({title, descreption, keywords}) => {
    return (
        
         <Helmet>
           <title>{title}</title>
           <meta name='descreption' content={descreption}/>
           <meta name='keywords' content={keywords}/>
         </Helmet>
        
    )
}
Meta.defaultProps = {
    title:'Welcome To AtomShop',
    descreption: 'We Sell best Electronics for cheap',
    keywords: 'electronics, cheap electronics'
}

export default Meta
