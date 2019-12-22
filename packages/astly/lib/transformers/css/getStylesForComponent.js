import visit from 'unist-util-visit';
import {isNative} from '../../helpers';

export {getStylesForComponents};

function getStylesForComponents(props) {
  return transformer;

  function transformer(tree, file) {
    // console.log('------------Transformer_____getStylesForComponents-----tree',tree);
    // console.log('------------Transformer_____getStylesForComponents-----file',file);

    const {styles} = file.data;
    visit(tree, 'element', visitor);
    function visitor(node, index, parent) {
      const {
        tagName,
        properties: {src, srcSet, className, style},
      } = node;

      if (className) {
        let cStyles = {};
        className.forEach(c => {
          const classStyles = styles[c];
          cStyles = {...cStyles, ...classStyles};
        });
        node.properties.style = {...style, ...cStyles};
      }
    }
  }
}
