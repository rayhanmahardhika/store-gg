import { Meta } from '@storybook/react';
import GameItem, { GameItemProps } from '../../../../components/molecules/GameItem';

export default {
  title: 'Components/Molecules/GameItem',
  component: GameItem,
} as Meta;

// default param nya harus args tidak bisa diganti dengan props
const Template = (args: GameItemProps) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Super Mechs',
  category: 'Mobile',
  thumbnail: '/img/Thumbnail-1.png',
};
