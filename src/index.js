import React from 'react'
import Proptypes from 'prop-types'
import rough from 'roughjs/bundled/rough.cjs.js'

const RoughContext = React.createContext()
const CanvasRef = React.createRef()

const __VALID_KEYS__ = [
	'bowing',
	'dataString',
	'fill',
	'fillStyle',
	'fillWeight',
	'hachureAngle',
	'hachureGap',
	'height',
	'width',
	'roughness',
	'stroke',
	'strokeWidth',
]

export const RoughConsumer = ({ type, dataString, points, ...data }) => (
	<RoughContext.Consumer>
		{(contextValue) => {
			if (typeof contextValue === 'undefined') {
				throw new Error('ReactRough Component not found!')
			}

			const dataArray = Object.keys(data)

			// 判断是不是属于这个类型范围
			for (let i = 0, len = dataArray.length; i < len; i++) {
				if (!__VALID_KEYS__.includes(dataArray[i])) {
					throw new Error(
						`Invalid key "${dataArray[i]}" assigned to "${type} component"`
					)
				}
			}

			// contextValue.rc 代表的是rought的实例; 这个就是提供者组件中的value属性
			if (contextValue.rc) {
				if (type === 'path') {
					if (typeof points !== 'undefined') {
						throw new Error(
							'You need a dataString property for path, not points'
						)
					}

					contextValue.rc[type](dataString, data)
				} else {
					contextValue.rc[type](...points, data)
				}
				return null
			}

			return null
		}}
	</RoughContext.Consumer>
)

class ReactRough extends React.Component {
	static Arc = (props) => {
		return <RoughConsumer type="arc" {...props} />
	}

	static Circle = (props) => {
		return <RoughConsumer type="circle" {...props} />
	}

	static Curve = (props) => {
		return <RoughConsumer type="curve" {...props} />
	}

	static Ellipse = (props) => {
		return <RoughConsumer type="ellipse" {...props} />
	}

	static Line = (props) => {
		return <RoughConsumer type="line" {...props} />
	}

	static Path = (props) => {
		return <RoughConsumer type="path" {...props} />
	}

	static Polygon = (props) => {
		return <RoughConsumer type="polygon" {...props} />
	}

	static Rectangle = (props) => {
		return <RoughConsumer type="rectangle" {...props} />
	}

	state = {
		rcValid: false,
	}

	// 其实还是不太理解这一点，为什么判断rcValid
	shouldComponentUpdate(_, prevState) {
		if (prevState.rcValid === this.state.rcValid) {
			return false
		}

		return true
	}

	componentDidMount() {
		const rc = rough.canvas(CanvasRef.current)
		this.rc = rc

		if (!this.state.rcValid) {
			this.setState({ rcValid: true })
		}
	}

	render() {
		const { width, height } = this.props

		return (
			<RoughContext.Provider value={{ rc: this.rc }}>
				<canvas width={width} height={height} ref={CanvasRef}>
					{this.props.children}
				</canvas>
			</RoughContext.Provider>
		)
	}
}

ReactRough.defaultProps = {
	width: 500,
	height: 500,
}

ReactRough.propTypes = {
	bowing: Proptypes.number,
	dataString: Proptypes.string,
	fill: Proptypes.string,
	fillStyle: Proptypes.string,
	fillWeight: Proptypes.number,
	hachureAngle: Proptypes.number,
	hachureGap: Proptypes.number,
	height: Proptypes.number,
	width: Proptypes.number,
	points: Proptypes.arrayOf(Number),
	roughness: Proptypes.number,
	stroke: Proptypes.string,
	strokeWidth: Proptypes.number,
}

export default ReactRough
