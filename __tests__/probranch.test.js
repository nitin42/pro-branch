const React = require('react')
const ReactTestRenderer = require('react-test-renderer')

const {
  applyUpdate,
  Branch
} = require('../index')

// Dummy components

const FPS = (props) => <div>Call of Duty: World War II</div>

const Sports = (props) => <div>FIFA 18</div>

// Renderless component
const Default = () => null

const branched = Branch([
  {
    when: ({ type }) => type === 'FPS',
    render: FPS,
  },
  {
    when: ({ type }) => type === 'Sports',
    render: Sports,
  },
])(Default)

const GameStateless = props => branched(props)

class GameStateful extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: '__DEFAULT__' }
  }

  componentDidMount() {
    this.update(this.props)
  }

  update = applyUpdate([
    {
      when: ({ type }) => type === 'FPS',
      update: (props) => {
        console.log(props);
        this.setState({ data: 'Call of Duty: World War II' });
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

describe('Splitz', () => {
  it('Branch function returns a new component when predicate is true', () => {
    const App = ReactTestRenderer.create(<GameStateless type="FPS" />)

    const tree = App.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Branch function returns default component when predicate is false', () => {
    const App = ReactTestRenderer.create(<GameStateless />)

    const tree = App.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('applyUpdates calls setState when predicate is true', () => {
    const App = ReactTestRenderer.create(<GameStateful type="FPS" />)

    const tree = App.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('applyUpdates returns default state when the predicate is false', () => {
    const App = ReactTestRenderer.create(<GameStateful />)

    const tree = App.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
