
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../Loading.jsx/Loading';
import { useState } from 'react';
const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { status, isAuthenticated } = useSelector((state) => state.login);
  const [isLoaded, setIsLoaded] = useState(false); // New state to track loading

  useEffect(() => {
    if (!isLoaded) {
      return; // Don't redirect until the initial load is complete
    }

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoaded]);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoaded(true); // Set isLoaded to true once authentication status is resolved
    }
  }, [status]);

  return (
    <>
      {status === 'loading' && <Loading />}
      {isAuthenticated && (
        <div>
          <Component />
        </div>
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
