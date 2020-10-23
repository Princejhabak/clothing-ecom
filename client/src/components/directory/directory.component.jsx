import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss' 

import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'

import { render } from 'react-dom'
import {selectDirectorySection} from '../../redux/directory/directory.selector'


const directory=({section})=> (
          
    <div className='directory-menu'>
        {section.map(({id,...otherProps})=>(
            <MenuItem key={id} {...otherProps}/>
        ))}
    </div>

    
    
    )
    




const mapStateToProps = createStructuredSelector({
  section :selectDirectorySection
}
)




export default connect(mapStateToProps)(directory)