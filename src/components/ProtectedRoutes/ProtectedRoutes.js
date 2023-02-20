import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = ({ key = '', path, exact, component: Component }) => {
    const token = localStorage.getItem('token')

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                token ? (
                    <Component
                        // eslint-disable-next-line react/prop-types
                        key={`${props.location.pathname}${props.location.search}`}
                        {...props}
                    />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    )
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    exact: PropTypes.bool.isRequired,
}
