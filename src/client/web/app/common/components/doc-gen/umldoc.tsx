// /* tslint:disable */
// // Library
// import _ from 'lodash';
// import React from 'react';
// import PropTypes from 'prop-types';
// import go from 'gojs';
// /* ignore coverage */
// export class UmlDocGen extends React.Component<any, any> {
//   componentDidMount() {
//     let $ = go.GraphObject.make;
//     let myDiagram: any = {};
//     myDiagram =
//       $(go.Diagram, 'myDiagramDiv',
//         {
//           'undoManager.isEnabled': true,
//           "layout": $(go.TreeLayout,
//                     { // this only lays out in trees nodes connected by "generalization" links
//                       angle: 90,
//                       path: go.TreeLayout.PathSource,  // links go from child to parent
//                       setsPortSpot: false,  // keep Spot.AllSides for link connection spot
//                       setsChildPortSpot: false,  // keep Spot.AllSides
//                       // nodes not connected by "generalization" links are laid out horizontally
//                       arrangement: go.TreeLayout.ArrangementHorizontal
//                     })
//         });

//     // show visibility or access as a single character at the beginning of each property or method
//     function convertVisibility(v) {
//       switch (v) {
//         case 'public': return '+';
//         case 'private': return '-';
//         case 'protected': return '#';
//         case 'package': return '~';
//         default: return v;
//       }
//     }

//     // the item template for properties
//     let propertyTemplate =
//       $(go.Panel, 'Horizontal',
//         // property visibility/access
//         $(go.TextBlock,
//           { isMultiline: false, editable: false, width: 12 },
//           new go.Binding('text', 'visibility', convertVisibility)),
//         // property name, underlined if scope=="class" to indicate static property
//         $(go.TextBlock,
//           { isMultiline: false, editable: true },
//           new go.Binding('text', 'name').makeTwoWay(),
//           new go.Binding('isUnderline', 'scope', function(s) {
//  return s[0] === 'c' 
// })),
//         // property type, if known
//         $(go.TextBlock, '',
//           new go.Binding('text', 'type', function(t) {
//  return (t ? ': ' : ''); 
// })),
//         $(go.TextBlock,
//           { isMultiline: false, editable: true },
//           new go.Binding('text', 'type').makeTwoWay()),
//         // property default value, if any
//         $(go.TextBlock,
//           { isMultiline: false, editable: false },
//           new go.Binding('text', 'default', function(s) {
//  return s ? ' = ' + s : ''; 
// }))
//       );

//     // the item template for methods
//     let methodTemplate =
//       $(go.Panel, 'Horizontal',
//         // method visibility/access
//         $(go.TextBlock,
//           { isMultiline: false, editable: false, width: 12 },
//           new go.Binding('text', 'visibility', convertVisibility)),
//         // method name, underlined if scope=="class" to indicate static method
//         $(go.TextBlock,
//           { isMultiline: false, editable: true },
//           new go.Binding('text', 'name').makeTwoWay(),
//           new go.Binding('isUnderline', 'scope', function(s) {
//  return s[0] === 'c' 
// })),
//         // method parameters
//         $(go.TextBlock, '()',
//           // this does not permit adding/editing/removing of parameters via inplace edits
//           new go.Binding('text', 'parameters', function(parr) {
//               let s = '(';
//               for (let i = 0; i < parr.length; i++) {
//                 let param = parr[i];
//                 if (i > 0) s += ', ';
//                 s += `${param.name  }: ${  param.type}`;
//               }
//               return `${s  })`;
//           })),
//         // method return type, if any
//         $(go.TextBlock, '',
//           new go.Binding('text', 'type', function(t) {
//  return (t ? ': ' : ''); 
// })),
//         $(go.TextBlock,
//           { isMultiline: false, editable: true },
//           new go.Binding('text', 'type').makeTwoWay())
//       );

//     // this simple template does not have any buttons to permit adding or
//     // removing properties or methods, but it could!
//     myDiagram.nodeTemplate =
//       $(go.Node, 'Auto',
//         {
//           locationSpot: go.Spot.Center,
//           fromSpot: go.Spot.AllSides,
//           toSpot: go.Spot.AllSides
//         },
//         $(go.Shape, { fill: 'lightyellow' }),
//         $(go.Panel, 'Table',
//           { defaultRowSeparatorStroke: 'black' },
//           // header
//           $(go.TextBlock,
//             {
//               row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
//               font: 'bold 12pt sans-serif',
//               isMultiline: false, editable: true
//             },
//             new go.Binding('text', 'name').makeTwoWay()),
            
//             // Attributes
//             $(go.TextBlock,
//                 {
//                     row: 1, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                     font: 'italic bold 10pt sans-serif',
//                     isMultiline: false, editable: true
//                 },'Attributes'), 
//             // properties
//             $(go.TextBlock, 'Attributes',
//                 { row: 2, font: 'italic 10pt sans-serif' },
//                 new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('PROPERTIES')),
//             $(go.Panel, 'Vertical', { name: 'PROPERTIES' },
//                 new go.Binding('itemArray', 'attributes'),
//                 {
//                 row: 2, margin: 3, stretch: go.GraphObject.Fill,
//                 defaultAlignment: go.Spot.Left, background: 'lightyellow',
//                 itemTemplate: propertyTemplate
//                 }
//             ),
//             $('PanelExpanderButton', 'PROPERTIES',
//                 { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
//                 new go.Binding('visible', 'attributes', function(arr) {
//  return arr.length > 0; 
// })),

//             // Libraries
//           $(go.TextBlock,
//             {
//                 row: 3, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'Libraries'), 
//           // properties
//           $(go.TextBlock, 'Libraries',
//             { row: 4, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('PROPERTIES')),
//           $(go.Panel, 'Vertical', { name: 'PROPERTIES' },
//             new go.Binding('itemArray', 'libraries'),
//             {
//               row: 4, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: propertyTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'PROPERTIES',
//             { row: 4, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'libraries', function(arr) {
//  return arr.length > 0; 
// })),
        
//           // Components
//           $(go.TextBlock,
//             {
//                 row: 5, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'Components'),  
//           // methods
//           $(go.TextBlock, 'Components',
//             { row: 6, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'components'),
//             {
//               row: 6, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 6, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'components', function(arr) {
//  return arr.length > 0; 
// })),

//             // Services
//             $(go.TextBlock,
//                 {
//                     row: 7, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                     font: 'italic bold 10pt sans-serif',
//                     isMultiline: false, editable: true
//                 },'Services'),  
//             // methods
//             $(go.TextBlock, 'Services',
//                 { row: 8, font: 'italic 10pt sans-serif' },
//                 new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//             $(go.Panel, 'Vertical', { name: 'METHODS' },
//                 new go.Binding('itemArray', 'services'),
//                 {
//                 row: 8, margin: 3, stretch: go.GraphObject.Fill,
//                 defaultAlignment: go.Spot.Left, background: 'lightyellow',
//                 itemTemplate: methodTemplate
//                 }
//             ),
//             $('PanelExpanderButton', 'METHODS',
//                 { row: 8, column: 1, alignment: go.Spot.TopRight, visible: false },
//                 new go.Binding('visible', 'services', function(arr) {
//  return arr.length > 0; 
// }))  ,

//           // Rules
//           $(go.TextBlock,
//             {
//                 row: 9, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'Rules'),  
//           // methods
//           $(go.TextBlock, 'Rules',
//             { row: 10, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'rules'),
//             {
//               row: 10, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 10, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'rules', function(arr) {
//  return arr.length > 0; 
// })),

//             // i18n Keys
//           $(go.TextBlock,
//             {
//                 row: 11, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'i18nKeys'),  
//           // methods
//           $(go.TextBlock, 'i18nKeys',
//             { row: 12, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'i18nKeys'),
//             {
//               row: 12, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 12, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'i18nKeys', function(arr) {
//  return arr.length > 0; 
// })),
            
//             // Actions
//           $(go.TextBlock,
//             {
//                 row: 13, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'actions'),  
//           // methods
//           $(go.TextBlock, 'Actions',
//             { row: 14, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'actions'),
//             {
//               row: 14, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 14, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'actions', function(arr) {
//  return arr.length > 0; 
// })),

//              // Effects
//           $(go.TextBlock,
//             {
//                 row: 15, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'effects'),  
//           // methods
//           $(go.TextBlock, 'Effects',
//             { row: 16, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'effects'),
//             {
//               row: 16, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 16, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'effects', function(arr) {
//  return arr.length > 0; 
// })),

//         // Reducer
//           $(go.TextBlock,
//             {
//                 row: 17, columnSpan: 2, margin: 3, alignment: go.Spot.LeftCenter,
//                 font: 'italic bold 10pt sans-serif',
//                 isMultiline: false, editable: true
//             },'reducer'),  
//           // methods
//           $(go.TextBlock, 'Reducer',
//             { row: 18, font: 'italic 10pt sans-serif' },
//             new go.Binding('visible', 'visible', function(v) {
//  return !v; 
// }).ofObject('METHODS')),
//           $(go.Panel, 'Vertical', { name: 'METHODS' },
//             new go.Binding('itemArray', 'reducer'),
//             {
//               row: 18, margin: 3, stretch: go.GraphObject.Fill,
//               defaultAlignment: go.Spot.Left, background: 'lightyellow',
//               itemTemplate: methodTemplate
//             }
//           ),
//           $('PanelExpanderButton', 'METHODS',
//             { row: 18, column: 1, alignment: go.Spot.TopRight, visible: false },
//             new go.Binding('visible', 'reducer', function(arr) {
//  return arr.length > 0; 
// })),
//         )
//       );

//     function convertIsTreeLink(r) {
//       return r === 'generalization';
//     }

//     function convertFromArrow(r) {
//       switch (r) {
//         case 'generalization': return '';
//         default: return '';
//       }
//     }

//     function convertToArrow(r) {
//       switch (r) {
//         case 'generalization': return 'Triangle';
//         case 'aggregation': return 'StretchedDiamond';
//         default: return '';
//       }
//     }

//     myDiagram.linkTemplate =
//       $(go.Link,
//         { routing: go.Link.Orthogonal },
//         new go.Binding('isLayoutPositioned', 'relationship', convertIsTreeLink),
//         $(go.Shape),
//         $(go.Shape, { scale: 1.3, fill: 'white' },
//           new go.Binding('fromArrow', 'relationship', convertFromArrow)),
//         $(go.Shape, { scale: 1.3, fill: 'white' },
//           new go.Binding('toArrow', 'relationship', convertToArrow))
//       );

//     // console.log('doc engine response', this.props.docs);
    
//     // setup a few example class nodes and relationships
//     let nodedata: any = [
//       {
//         key: 1,
//         name: this.props.docs.rootModel.modelName,
//         libraries: [],
//         components: []
//       }
//     ];
    
//     let linkdata = [];

//     _.each(this.props.docs.rootModel.libraries, (val, key) => {
//         nodedata[0].libraries.push({
//             name: key, 
//             type: 'Function', 
//             visibility: 'public'
//         });
//     });

//     _.each(this.props.docs.rootModel.uiFrameworkComponents, (val, key) => {
//         nodedata[0].components.push({
//             name: key, 
//             type: (key === 'withStyles') ? 'HOC' : 'Component', 
//             visibility: 'public'
//         });
//     });

//     _.each(this.props.docs.containers, (val, key) => {
//       nodedata.push({
//           key: key + 2,
//           name: val.modelName,
//           libraries: [],
//           components: [],
//           services: [],
//           rules: [],
//           i18nkeys: [],
//           actions: [],
//           effects: [],
//           reducer: [],
//           attributes: []
//       });
//       const newKey = key + 1;
//       _.keys(val.attributes).forEach((value) => {
//         nodedata[newKey].attributes.push({
//           name: value, 
//           type: val.attributes[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.libraries).forEach((value) => {
//         nodedata[newKey].libraries.push({
//           name: value, 
//           type: val.libraries[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.components).forEach((value) => {
//         nodedata[newKey].components.push({
//           name: value, 
//           type: val.components[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.services).forEach((value) => {
//         nodedata[newKey].services.push({
//           name: value, 
//           type: val.services[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.rules).forEach((value) => {
//         nodedata[newKey].rules.push({
//           name: value, 
//           type: val.rules[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.i18nkeys).forEach((value) => {
//         nodedata[newKey].i18nkeys.push({
//           name: value, 
//           type: val.i18nkeys[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.actions).forEach((value) => {
//         nodedata[newKey].actions.push({
//           name: value, 
//           type: val.actions[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.effects).forEach((value) => {
//         nodedata[newKey].effects.push({
//           name: value, 
//           type: val.effects[value].type, 
//           visibility: 'public'
//         });
//       });
//       _.keys(val.reducer).forEach((value) => {
//         nodedata[newKey].reducer.push({
//           name: value, 
//           type: val.reducer[value].type, 
//           visibility: 'public'
//         });
//       });
//       linkdata.push({
//         from: key + 2, 
//         to: 1, 
//         relationship: 'generalization' 
//       })
//     });

//     myDiagram.model = $(go.GraphLinksModel,
//       {
//         copiesArrays: true,
//         copiesArrayObjects: true,
//         nodeDataArray: nodedata,
//         linkDataArray: linkdata
//       });
//   };

//   render () {
//       return (
//         <React.Fragment>
//             <div
// id='myDiagramDiv'
//                 style={{
//                     width: '100%', 
//                     height: 850, 
//                     backgroundColor: '#DAE4E4'
//                 }}
//             >
//             </div>
//         </React.Fragment>
//       );
//   }
// }
