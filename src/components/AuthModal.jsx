import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function AuthModal({ isOpen, mode = 'login', onClose, onSwitchMode, onLoginSuccess }) {
  const { login, register } = useAuth();
  const { showToast } = useToast();

  const [roleMode, setRoleMode] = useState('user'); // 'user' | 'admin'
  const [errorMsg, setErrorMsg] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const res = login({
      email: loginEmail,
      password: loginPassword,
      roleMode,
    });

    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    showToast(res.message);
    setLoginPassword('');
    onLoginSuccess && onLoginSuccess(res.user);
    onClose();
  };

  const handleSignupSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const res = register({
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      confirmPassword: signupConfirmPassword,
    });

    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    showToast('🎉 Account created — please log in');
    // Pre-fill email for login
    setLoginEmail(signupEmail);
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    onSwitchMode('login');
  };

  return (
    <>
      <div className="overlay active" onClick={onClose} />
      {mode === 'login' ? (
        <div className="modal auth-modal open" id="loginModal" data-lenis-prevent>
          <div className="modal-header">
            <h3>Login</h3>
            <button className="close-btn" id="closeLogin" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            {/* Role Switch */}
            <div className="auth-role-switch">
              <button
                type="button"
                className={`role-switch-btn ${roleMode === 'user' ? 'active' : ''}`}
                id="roleSwitchUser"
                onClick={() => {
                  setRoleMode('user');
                  setErrorMsg('');
                }}
              >
                User
              </button>
              <button
                type="button"
                className={`role-switch-btn ${roleMode === 'admin' ? 'active' : ''}`}
                id="roleSwitchAdmin"
                onClick={() => {
                  setRoleMode('admin');
                  setErrorMsg('');
                }}
              >
                Admin
              </button>
            </div>

            <p className={`auth-error ${errorMsg ? 'show' : ''}`} id="loginError">
              {errorMsg}
            </p>

            <form onSubmit={handleLoginSubmit}>
              <div className="auth-form">
                <input
                  type="email"
                  id="loginEmail"
                  placeholder={
                    roleMode === 'admin' ? 'Admin Email (e.g. admin@klufresh.com)' : 'Email'
                  }
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary full-width" id="loginSubmitBtn">
                {roleMode === 'admin' ? 'Sign In as Admin' : 'Sign In as User'}
              </button>
            </form>

            {roleMode === 'user' && (
              <p className="auth-switch" id="loginSignupSwitch">
                New to KLU Fresh?{' '}
                <a
                  href="#signup"
                  id="switchToSignup"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMsg('');
                    onSwitchMode('signup');
                  }}
                >
                  Create customer account
                </a>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="modal auth-modal open" id="signupModal" data-lenis-prevent>
          <div className="modal-header">
            <h3>Create Account</h3>
            <button className="close-btn" id="closeSignup" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <p className={`auth-error ${errorMsg ? 'show' : ''}`} id="signupError">
              {errorMsg}
            </p>

            <form onSubmit={handleSignupSubmit}>
              <div className="auth-form">
                <input
                  type="text"
                  id="signupName"
                  placeholder="Full Name"
                  autoComplete="name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
                <input
                  type="text"
                  id="signupEmail"
                  placeholder="Email"
                  autoComplete="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                  type="password"
                  id="signupPassword"
                  placeholder="Password (min. 6 characters)"
                  autoComplete="new-password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <input
                  type="password"
                  id="signupConfirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary full-width" id="signupSubmitBtn">
                Create Account
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <a
                href="#login"
                id="switchToLogin"
                onClick={(e) => {
                  e.preventDefault();
                  setErrorMsg('');
                  onSwitchMode('login');
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
