import { Component } from 'react'

export default class Delay extends Component{
  static defaultProps = {
    period: 0
  }

  state = {
    value: this.props.initial
  }

  refresh(props){
    let {value, period} = props;
    this.timeout = setTimeout(() => this.setState({
      value
    }), period);
  }

  componentDidMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(next){
    this.refresh(next);
  }

  componentWillUnmount(){
    clearTimeout(this.timeout);
  }

  render(){
    // function-as-children
    return this.props.children(this.state.value);
  }
}
