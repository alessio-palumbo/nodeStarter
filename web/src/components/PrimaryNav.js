import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function PrimaryNav({
  signedIn,
  onSignOut
}) {
  return (
    <nav>
      <ul className='nav navbar sticky-top'>
        <li><Link to='/' className='btn btn-dark'>Home</Link></li>
        {signedIn ? (
          <Fragment>
            <li><Link to='/signin' className='btn btn-dark' onClick={onSignOut}>SignOut</Link></li>
          </Fragment>
        ) : (
            <Fragment>
              <li><Link to='/signin' className='btn btn-dark'>SignIn</Link></li>
            </Fragment>
          )
        }
      </ul>
    </nav>
  )
}

export default PrimaryNav