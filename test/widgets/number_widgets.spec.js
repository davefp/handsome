import {expect} from 'chai';
import NumberWidget from '../../widgets/number_widget';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('<NumberWidget />', () => {

  const shallowWrapper = shallow(<NumberWidget name="foo" title="bar" />);
  const mountWrapper = mount(<NumberWidget name="foo" title="bar" />);

  it('sets the title', () => {
    expect(shallowWrapper.find('h1').text()).to.equal("bar");
  });

  it('sets the width and height to default value', () => {
    expect(mountWrapper.prop('width')).to.equal(1);
    expect(mountWrapper.prop('height')).to.equal(1);
  });

  it('sets number to be default value', () => {
    expect(shallowWrapper.find('.number').text()).to.equal("0");
  });

  it('set a custom width & height', () => {
    const customWrapper = mount(<NumberWidget width="10" height="100" />);
    expect(customWrapper.prop('width')).to.equal("10");
    expect(customWrapper.prop('height')).to.equal("100");
  });
})
