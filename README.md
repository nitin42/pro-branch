# pro-branch

> A small package that provides helpers to manage the control flow in React

# Install

```
npm install pro-branch
```

This also depends on `react` so make sure you already have installed it.

## Usage

**`createBranch`**

This function is quite similar to [Recompose's `branch`](https://github.com/acdlite/recompose/blob/master/docs/API.md#branch) helper. It takes an array of objects where each object has two
properties, `when` and `render`.

`when` accepts a function which, when evaluated to true renders the component that was specified. It gets passed the owner props. Here is an example -

```js
const React = require('react');
const ReactDOM = require('react-dom');
const { createBranch } = require('pro-branch');
const { FPS, Sports, Default } = require('./components');

const branched = createBranch([
  {
    when: (props) => props.type === 'FPS',
    render: FPS,
  },
  {
    when: (props) => props.type === 'Sports',
    render: Sports,
  },
])(Default)

const Game = (props) => branched(props)

ReactDOM.render(<Game type="FPS" />, document.getElementById('root'));

// outputs <FPS /> => <div>Call of Duty: World War II</div>
```

`createBranch` returns a function that takes the props to apply and creates a React element.

**`applyUpdate`**

This function is similar to `createBranch` but the only difference is that, the object has a `update` property instead of `render`. So in this case, if predicate is `true` then the update function is called. Here is an example

```js
const React = require('react');
const ReactDOM = require('react-dom');
const { applyUpdate } = require('pro-branch');

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '__DEFAULT__GAME__NAME__' }
  }

  componentDidMount() {
    this.update(this.props)
  }

  update = applyUpdate([
    {
      when: ({ type }) => type === 'FPS',
      update: (props) => this.setState({ data: 'Call of Duty: World War II' });
      }
    },
    {
      when: ({ type }) => type === 'Sports',
      update: (props) => this.setState({ data: 'FIFA 18' }),
    },
  ])(this.state)

  render() {
    return <div>{this.state.data}</div>
  }
}

ReactDOM.render(<Game type="FPS" />, document.getElementById('root'));
```

`applyUpdate` also returns a function that takes props or some other data, and then calls the update function which gets passed those prop values or the data.

I am using these two helpers in my current project and I think it organises the control flow structure in a better way rather than using `switch` or nested `if else`.

## API

### createBranch

`
createBranch(
  objects: Array
)(DefaultComponent: React$Element)(props)
`

### applyUpdate

`
applyUpdate(
  objects: Array
)(defaultState)(props)
`
