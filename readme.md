### 目的

就是模仿 react-rough

看看别人写代码的逻辑

React bindings for Rough.js

### Usage

#### Render a Rectangle

```js
import { Rectangle } from 'react-rough'

const options = {
	data: [10, 10, 200, 200], // x, y, width, height
	fill: 'red',
	fillWeight: 3,
}

render(<Rectangle width={220} height={220} options={options} />)
```

### render shapes on one canvas element

```js
import { ReactRough, Rectangle, Circle } from 'react-rough'

reader(
	<ReactRough width={500} height={500}>
		<Rectangle
			options={{
				data: [10, 10, 200, 200], // x, y, width, height
				fill: 'red',
				fillWeight: 3,
			}}
		/>
		<Circle
			options={{
				data: [80, 120, 50], // centerX, centerY, radius
				fill: 'blue',
			}}
		/>
	</ReactRough>
)

// 其实我觉得reactrought 取得很low
```

### onRender hook

```js
const increseWidth = (rect) => {
	if (rect.width < 200) {
		rect.width = rect.width + 10
		setTimeout(() => increaseWidth(rect), 100)
	}
}

const options = {
	data: [10, 10, 20, 100],
	fill: 'red',
	hachureGap: 8,
}

render(
	<Rectangle
		width={220}
		height={220}
		options={options}
		onRender={increaseWidth}
	/>
)
```

## License

MIT
