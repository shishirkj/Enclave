
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../Loading.jsx/Loading';


const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const { status, isAuthenticated } = useSelector((state) => state.login);
 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');

    }

  }, [isAuthenticated,navigate]);

  return (
    <>
      {status === 'loading' ? (
        <Loading /> // Render Loading component if status is loading
      ) : (
        ( 
          <div>
            <Component />
          </div>
        )
      )}
    </>
  );
      }

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
