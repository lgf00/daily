import React from 'react'

function Daily(props) {
    const { date, rating, selected, slorder, scorder, firstLoad, zeroth, anim} = props
    const def = ["#FAF9F6","#ff6962","#fc7751","#f68642","#ec9536","#dfa32f","#cfb130","#bebd38","#a9c948","#92d35d","#77dd76"]
    
    
    return (
        <div
         className={firstLoad ? "day dayslide" : zeroth && anim ? "day dayscale" : "day op"}
         style={{backgroundColor: def[rating], "--slorder": slorder, "--scorder": scorder}}
         title={date + ", " + rating}
        >
            {selected ? <div className="selected"></div> : ''}
        </div>
    )
}

export default Daily