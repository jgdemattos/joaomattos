import React, { Component } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const transformer = new Transformer();
const initValue = `# markmap

- beautiful
- easy
- interactive
`;

export default class MarkmapClass extends Component {
  state = {
    value: initValue,
  }

  svg
  mm

  bindSvg = el => {
    this.svg = el
  }

  componentDidMount() {
    this.mm = Markmap.create(this.svg)
    this.updateSvg()
    this.handleChange(this.props.markdown)
  }

  handleChange = markdown => {
    this.setState({ value: markdown }, this.updateSvg)
  }

  updateSvg = () => {
    const { root } = transformer.transform(this.state.value)
    this.mm.setData(root)
    this.mm.fit()
  }

  render() {
    const { value } = this.state
    
    return (
      <React.Fragment>
        <svg
          className="flex-1 leading-none markmap mm-xtyk2m-1"
          style={{width: '100%', height: '300px'}}
          ref={this.bindSvg}
        />
      </React.Fragment>
    )
  }
}
