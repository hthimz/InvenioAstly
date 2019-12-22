import React from 'react';
import {isNative} from '../helpers';
import defaultComponentMap from '../maps';
import Box from '../components/Box';
import withRoot from '../components/Root';
import {parseHtml} from '../parsers';

export function RenderTree({
  componentMap = defaultComponentMap,
  inspectNewChildren = c => c,
  theme = {},
  tree = `<div></div>`,
  ...props
}) {
  console.log('---------INSIDE RENDER TREE ---------------');
  const [newChildren, setNewChildren] = React.useState(null);

  React.useEffect(() => {
    function makeNewChildren(components) {
      return isNative
        ? React.createElement(Box, props, [components.props.children])
        : React.createElement(Box, props, [components]);
    }
    console.log('This is the render Tree',tree);
    console.log('These are the component Map', defaultComponentMap);
    parseHtml({components: componentMap, ...props}).process(
      tree,
      (err, file) => {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Set New Children',setNewChildren);
          console.log('make New children',makeNewChildren);
          console.log('ENd File passed in make New child which is pass in set new Child',file);
          setNewChildren(makeNewChildren(file.contents));
        }
      },
    );
  }, [tree]);
  console.log('Inspect New Children Inside Render Tree File', newChildren);

  return <React.Fragment>{inspectNewChildren(newChildren)}</React.Fragment>;
}

export default RenderTree;
