import React from 'react';

const Star = (props) => {
  return (
    <div className="star">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.57393 193.48274">
        
        <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1"
                fill={(props.winner)? "#FFD700":"none"}
                stroke={(props.winner)? "none":"#231f20"}
                stroke-miterlimit="10"
                stroke-width={(props.winner)? "none":"3px"}
            >
            <polygon class="cls-1" points="160.72 185.499 102.368 155.795 44.818 187.024 55.037 122.349 7.553 77.266 72.22 66.999 100.423 7.908 130.171 66.237 195.085 74.799 148.803 121.116 160.72 185.499"/>
            </g>
        </g>
        </svg>
    </div>
  );
}


export default Star;