import Box from '../components/Box';
import Flex from '../components/Flex';
import Table from '../components/Table';
import Text from '../components/Text';
import Script from '../components/Script';
import TableHeader from '../components/TableHeader';
import TableRow from '../components/TableRow';
import TableBody from '../components/TableBody';
import Button from '../components/Button';
import {withProps} from './withProps';
import Media from '../components/Media';

export default {
  div: Box,
  p: withProps(Text, {variant: 'body'}),
  span: withProps(Text, {variant: 'body'}),
  h1: withProps(Text, {variant: 'h1', as: 'h1'}),
  h2: withProps(Text, {variant: 'h2', as: 'h2'}),
  h3: withProps(Text, {variant: 'h3', as: 'h3'}),
  h4: withProps(Text, {variant: 'h4', as: 'h4'}),
  h5: withProps(Text, {variant: 'h5', as: 'h5'}),
  em: withProps(Text, {variant: 'body', modifier: 'italic'}),
  u: withProps(Text, {variant: 'body', modifier: 'underlined'}),
  sup: withProps(Text, {variant: 'superscript'}),
  sub: withProps(Text, {variant: 'subscript'}),
  strong: withProps(Text, {variant: 'body', modifier: 'bold'}),
  b: withProps(Text, {variant: 'body', modifier: 'bold'}),
  strike: withProps(Text, {variant: 'body', modifier: 'strike'}),
  head: Box,
  body: Box,
  html: Box,
  row: withProps(Flex, {variant: 'row'}),
  col: withProps(Flex, {variant: 'col'}),
  table: withProps(Table, {}),
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  td: Table.Cell,
  th: TableRow,
  button: withProps(Button, {}),
  a: withProps(Text, {}),
  img: Media,
  script: Script,
  root: Box,
  section: Box,
};
