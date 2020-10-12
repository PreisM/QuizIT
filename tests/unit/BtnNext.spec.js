import { mount } from '@vue/test-utils'
import {BtnNext, index} from '@/components/atoms/BtnNext'


describe('BtnNext', () => {
  it('check next', () => {
    const wrapper = mount(BtnNext, {
      propsData: { index }
    })
    
    expect(wrapper.vm.index).toEqual(0)
    wrapper.find('b-button').trigger('click')
    expect(wrapper.vm.index).toEqual(1)
  
    wrapper.vm.$emit('next')
    expect(wrapper.emitted().next).toBeTruthy()

  })
})