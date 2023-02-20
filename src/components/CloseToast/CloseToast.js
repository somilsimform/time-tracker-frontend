import React, { memo } from 'react'

const CloseToast = memo(() => (
    <div className="CloseToast">
        <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                x1="1.35355"
                y1="0.646447"
                x2="16.3536"
                y2="15.6464"
                stroke="white"
            />
            <line
                y1="-0.5"
                x2="21.2132"
                y2="-0.5"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 1)"
                stroke="white"
            />
        </svg>
    </div>
))
CloseToast.propTypes = {}

CloseToast.defaultProps = {}

export default CloseToast
