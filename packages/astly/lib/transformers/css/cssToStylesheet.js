'use strict';

import visit from 'unist-util-visit';
import postcss from 'postcss';
import transform from 'css-to-react-native';
import {isNative} from '../../helpers';
import variables from 'postcss-simple-vars';
import newTransform from "css-to-react-native-transform";
import { process } from "react-native-css-media-query-processor";

export {cssToStyleSheet, processCSSVariables};

function processCSSVariables(props) {
  return function transformer(tree, file, next) {
    // console.log('------------Transformer_____cssToStylesheets-----tree,',tree);
    // console.log('------------Transformer_____cssToStylesheets-----file',file);
    file.data.styles = {};
    let promises = [];
    visit(tree, {type: 'element', tagName: 'style'}, function(node) {
      // console.log("nodes are........", node);
      const {tagName} = node;
      let promise = postcss([variables])
        .process(node.children[0].value)
        .then(res => {
          // console.log("css post transformation is......", res.css);
          const root = postcss.parse(res.css);
          if (isNative) {
            
           
           
           
           
           
            let styleObject = newTransform(res.css, { parseMediaQueries: true });
            // console.log("Styled Transformed Object with Mediq Query", styleObject);
            const { Dimensions } = require("react-native");
            const win = Dimensions.get("window");
            const matchObject = {
              width: win.width,
              height: win.height,
              orientation: win.width > win.height ? "landscape" : "portrait",
              "aspect-ratio": win.width / win.height,
              type: "screen"
            };
 
            const processedCss = process(styleObject, matchObject);
            // console.log("processed final css is.....", processedCss, matchObject);

            // const map = handleCssParsing(root);
            // for (let key in map) {
            //   const conformedKey = conformKey(key);
            //   file.data.styles[conformedKey] = transform(map[key]);
            // }
            file.data.styles = processedCss;
            // console.log("transformed stlye previously was ......",file.data.styles )
          } else {
            node.children[0].value = res.css;
          }
        });
      promises.push(promise);
    });
    Promise.all(promises).then(() => next(null, tree, file));
  };
}

function cssToStyleSheet(props) {
  return transformer;

  function transformer(tree, file) {
    visit(tree, 'element', visitor);
    function visitor(node, index, parent) {
      const {
        tagName,
        properties: {style},
      } = node;

      if (isNative && node.properties.style !== undefined) {
        const root = postcss.parse(style);
        const map = handleCssParsing(root);
        const {style: cleanedStyles} = map;
        node.properties.style = transform(cleanedStyles);
      }
    }
  }
}

function conformKey(key) {
  return key.replace('.', '');
}

function handleCssParsing(root) {
  const map = {};
  parseCssNodes(root);
  return map;
  function parseCssNodes(node) {
    const {nodes: children} = node;
    if (children && children.length > 0) {
      children.map(parseCssNodes);
    }
    // console.log(JSON.stringify(node, null, 2));
    if (node.type === 'decl') {
      if (
        isNative &&
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'atrule'
      ) {
        return;
      }
      const key = getStyleKey(node);
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push([node.prop, node.value]);
    }
  }
}

function getStyleKey(node) {
  const {selector} = node.parent;
  return selector !== undefined ? selector : 'style';
}
