import React from 'react'
import {connect} from 'react-redux'
import './collections-overview.styles.scss'
import{createStructuredSelector} from 'reselect'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selector'
import PreviewCollection from '../preview-collection/preview-collection.component'
const CollectionOverview = ({collections})=>(
    <div className="collections-overview">
        {
            collections.map(({id,...otherProps})=>(
            <PreviewCollection key={id} {...otherProps}></PreviewCollection>
        ))}
    </div>
)
const mapStateToProps=(state)=>createStructuredSelector({
    collections:selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview)