import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        const email = elements.email.value
        const password = elements.password.value

        onSignIn({ email, password })
      }}
    >
      <label className='mb-2'>
        {'Email: '}
        <input
          className='form-control'
          type='email'
          name='email'
        />
      </label>
      <label className='mb-2'>
        {'Password: '}
        <input
          className='form-control'
          type='password'
          name='password'
        />
      </label>
      <br />
      <button className='btn btn-primary'>Sign in</button>
    </form>
  )
}

export default SignInForm