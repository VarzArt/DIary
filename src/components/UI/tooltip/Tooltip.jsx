import React from 'react';
import '../../../styles/App.css'
import yes from '../../../assets/images/yes.svg'

const Tooltip = (props) => {

	const rootClass = props.visible ? 'tooltip active' : 'tooltip'

	return (
		<div className={rootClass}>
			<div className='tooltip__content'>
				<img src={yes} alt="" className='tooltip__img'/>
			{props.children}
			</div>
		</div>
	);
}

export default Tooltip;
