import { Meta } from '@storybook/react';
import TextField, { TextFieldProps } from '../../../../components/atoms/TextField';

export default {
  title: 'Components/Atoms/TextField',
  component: TextField,
} as Meta;

// default param nya harus args tidak bisa diganti dengan props
const Template = (args: TextFieldProps) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Nama Lengkap',
};
