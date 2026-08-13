import { useState } from 'react'
import './App.css'

const initialForm = {
  email: '',
  username: '',
  password: '',
  confirmedPassword: '',
}

function LogoPlaceholder() {
  return (
    <div className="brand__logo" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <rect x="2" y="2" width="60" height="60" rx="14" fill="currentColor" opacity="0.14" />
        <path
          d="M20 18h24v5.5H27.2V29h14.3v5.2H27.2V40.5H44V46H20V18z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')

  const isSignup = mode === 'signup'

  function handleModeChange(nextMode) {
    setMode(nextMode)
    setMessage('')
    setForm(initialForm)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (isSignup && form.password !== form.confirmedPassword) {
      setMessage('Passwords do not match.')
      return
    }
    setMessage(
      isSignup
        ? 'Account details ready. Connect this form to your auth API next.'
        : 'Credentials ready. Connect this form to your auth API next.',
    )
  }

  return (
    <main className="auth">
      <section className="auth__panel" aria-labelledby="elite-heading">
        <header className="brand">
          <LogoPlaceholder />
          <h1 id="elite-heading" className="brand__title">
            Elite
          </h1>
          <p className="brand__tagline">
            {isSignup ? 'Create your account to get started.' : 'Welcome back. Sign in to continue.'}
          </p>
        </header>

        <div className="mode-toggle" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={!isSignup ? 'mode-toggle__btn is-active' : 'mode-toggle__btn'}
            onClick={() => handleModeChange('login')}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={isSignup ? 'mode-toggle__btn is-active' : 'mode-toggle__btn'}
            onClick={() => handleModeChange('signup')}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" key={mode} onSubmit={handleSubmit}>
          {isSignup && (
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
          )}

          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
              placeholder="your username"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
              placeholder="••••••••"
            />
          </label>

          {isSignup && (
            <label className="field">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmedPassword"
                value={form.confirmedPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </label>
          )}

          <button type="submit" className="submit">
            {isSignup ? 'Create account' : 'Log in'}
          </button>

          {message && <p className="auth-form__message">{message}</p>}
        </form>
      </section>
    </main>
  )
}

export default App
