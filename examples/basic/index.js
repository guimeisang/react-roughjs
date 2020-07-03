import React from 'react'
import ReactDOM from 'react-dom'
import ReactRough, { Circle, Ellipse, Line } from '../../src'

const App = () => (
	<div>
		<ReactRough width="500" height="200">
			<Circle points={[80, 120, 50]} roughness="2.8" fill="blue" />
			<Ellipse points={[300, 100, 150, 80]} />
			<Line points={[80, 120, 300, 100]} />
		</ReactRough>
		<Circle width="500" height="200" points={[80, 120, 50]} fill="red" />
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
