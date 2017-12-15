import React from 'react'

function SignUpForm({
  onSignUp
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        const email = elements.email.value
        const password = elements.password.value

        onSignUp({ firstName, lastName, email, password })
      }}
    >
      <label className='mb-2'>
        {'First name: '}
        <input
          className='form-control'
          type='text'
          name='firstName'
        />
      </label>
      <label className='mb-2'>
        {'Last name: '}
        <input
          className='form-control'
          type='text'
          name='lastName'
        />
      </label>
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
      <button
        className='btn btn-primary'
      >
        Sign up
            </button>
    </form>
  )
}

export default SignUpForm