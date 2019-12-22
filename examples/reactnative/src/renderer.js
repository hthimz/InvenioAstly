import React from 'react';
import {Flex, RenderHtml} from '@fabulas/astly';
import {useQuery} from '@apollo/react-hooks';
import {RenderTree} from '@fabulas/astly';
import {query} from './apollo';
import {RichText} from 'prismic-dom';

function RenderScreen({node, theme}) {
  const {title, description, content, _meta} = node;
  const body = RichText.asHtml(content);

  return (
    <Flex key={_meta.uid}>
      <RenderHtml html={RichText.asHtml(title)} theme={theme} />
      <RenderHtml html={RichText.asHtml(description)} theme={theme} />
      <RenderHtml html={body} theme={theme} />
    </Flex>
  );
}

function ScreenRenderer(props) {
  // const {loading, error, data} = useQuery(query, {
  //   pollInterval: 250,
  // });
  // if (!data) {
  //   return null;
  // }
  // return data
  //   ? data.allPages.edges.map(({node}) => (
  //       <RenderScreen key={node._meta.uid} node={node} {...props} />
  //     ))
  //   : null;


return <RenderTree tree ={`
  <style>
    .test-homepage{
   color:blue;
   }
   @media (min-width: 450px) {
        .test-homepage{
        color:red;
      }
     }
   </style>
   <div>
   <span class="test-homepage" style="color: blue;">
   this is a module X change with media Q in place Desktop should be color blue and mobile color red
   </span>
   <span style="color: orange;">This content should reflect as orange</span>
   </div>
  `} 
  
  />


}

export default ScreenRenderer;
