import React,{useEffect} from 'react'
import './shop.data'

import {Route} from 'react-router-dom'



import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'

import CollectionPageContainer  from '../collection/collection.container';



import {connect} from 'react-redux'

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";



const ShopPage =({fetchCollectionsStart,match})=>{


useEffect(()=>{
  fetchCollectionsStart()
},[])

    return (
      <div className="shop-page">
    
     <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />

    </div>

    )


}






const matchDispatchToProps=dispatch=>({
  fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})


export default connect(null,matchDispatchToProps)(ShopPage)
