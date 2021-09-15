import { Meta } from '@storybook/react';
import StepItem, { StepItemProps } from '../../../../components/molecules/StepItem';

export default {
  title: 'Components/Molecules/StepItem',
  component: StepItem,
} as Meta;

// default param nya harus args tidak bisa diganti dengan props
const Template = (args: StepItemProps) => <StepItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Super Mechs',
  icon: 'trans-step-1',
  desc1: 'Mobile',
  desc2: 'Mobile',
};
