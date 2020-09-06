// /* tslint:disable */
// // Library
// import _ from 'lodash';
// import React from 'react';
// import PropTypes from 'prop-types';
// import go from 'gojs';

// // Material UI
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// /* ignore coverage */
// function TabContainer(props) {
//   return (
//     <Typography component='div' style={{ backgroundColor: '#dae4e4', border: '1px solid #b9b9b9;', padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }
// /* ignore coverage */
// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// /* ignore coverage */
// export class StateMachineDoc extends React.Component<any, any> {
//   state = {
//     value: 0,
//     subValue: 0,
//     loadingState: false,
//   };
  
//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   handleSubChange = (event, subValue) => {
//     this.setState({loadingState: true}, () => {
//       this.setState({ subValue, loadingState: false }, () =>{
//         this.renderDiagram();
//       });
//     })
//   };

//   renderDiagram() {
//     const $ = go.GraphObject.make;
//     let myDiagram: any = {};
//     let myPalette: any = {};
//     myDiagram =
//       $(go.Diagram, 'myStateMachineDiagramDiv',  // must name or refer to the DIV HTML element
//         {
//           'grid': $(go.Panel, 'Grid',
//                   $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
//                   $(go.Shape, 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
//                   $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
//                   $(go.Shape, 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })
//                 ),
//           'draggingTool.dragsLink': true,
//           'draggingTool.isGridSnapEnabled': true,
//           'linkingTool.isUnconnectedLinkValid': true,
//           'linkingTool.portGravity': 20,
//           'relinkingTool.isUnconnectedLinkValid': true,
//           'relinkingTool.portGravity': 20,
//           'relinkingTool.fromHandleArchetype':
//             $(go.Shape, 'Diamond', { segmentIndex: 0, cursor: 'pointer', desiredSize: new go.Size(8, 8), fill: 'tomato', stroke: 'darkred' }),
//           'relinkingTool.toHandleArchetype':
//             $(go.Shape, 'Diamond', { segmentIndex: -1, cursor: 'pointer', desiredSize: new go.Size(8, 8), fill: 'darkred', stroke: 'tomato' }),
//           'linkReshapingTool.handleArchetype':
//             $(go.Shape, 'Diamond', { desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'deepskyblue' }),
//           'rotatingTool.handleAngle': 270,
//           'rotatingTool.handleDistance': 30,
//           'rotatingTool.snapAngleMultiple': 15,
//           'rotatingTool.snapAngleEpsilon': 15,
//           'undoManager.isEnabled': true
//         });

//     // when the document is modified, add a "*" to the title and enable the "Save" button
//     myDiagram.addDiagramListener('Modified', function(e) {
//       const button: any = document.getElementById('SaveButton');
//       if (button) button.disabled = !myDiagram.isModified;
//       const idx = document.title.indexOf('*');
//       if (myDiagram.isModified) {
//         if (idx < 0) document.title += '*';
//       }
//  else if (idx >= 0) document.title = document.title.substr(0, idx);
//     });

//     // Define a function for creating a "port" that is normally transparent.
//     // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
//     // and where the port is positioned on the node, and the boolean "output" and "input" arguments
//     // control whether the user can draw links from or to the port.
//     function makePort(name, spot, output, input) {
//       // the port is basically just a small transparent square
//       return $(go.Shape, 'Circle',
//                {
//                   fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
//                   stroke: null,
//                   desiredSize: new go.Size(7, 7),
//                   alignment: spot,  // align the port on the main Shape
//                   alignmentFocus: spot,  // just inside the Shape
//                   portId: name,  // declare this object to be a "port"
//                   fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
//                   fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
//                   cursor: 'pointer'  // show a different cursor to indicate potential link point
//                });
//     }

//     const nodeSelectionAdornmentTemplate =
//       $(go.Adornment, 'Auto',
//         $(go.Shape, { fill: null, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] }),
//         $(go.Placeholder)
//       );

//     const nodeResizeAdornmentTemplate =
//       $(go.Adornment, 'Spot',
//         { locationSpot: go.Spot.Right },
//         $(go.Placeholder),
//         $(go.Shape, { alignment: go.Spot.TopLeft, cursor: 'nw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { alignment: go.Spot.Top, cursor: 'n-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { alignment: go.Spot.TopRight, cursor: 'ne-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),

//         $(go.Shape, { alignment: go.Spot.Left, cursor: 'w-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { alignment: go.Spot.Right, cursor: 'e-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),

//         $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: 'se-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { alignment: go.Spot.Bottom, cursor: 's-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { alignment: go.Spot.BottomRight, cursor: 'sw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' })
//       );

//     const nodeRotateAdornmentTemplate =
//       $(go.Adornment,
//         { locationSpot: go.Spot.Center, locationObjectName: 'CIRCLE' },
//         $(go.Shape, 'Circle', { name: 'CIRCLE', cursor: 'pointer', desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'deepskyblue' }),
//         $(go.Shape, { geometryString: 'M3.5 7 L3.5 30', isGeometryPositioned: true, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] })
//       );

//     myDiagram.nodeTemplate =
//       $(go.Node, 'Spot',
//         { locationSpot: go.Spot.Center },
//         new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
//         { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
//         { resizable: true, resizeObjectName: 'PANEL', resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
//         { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
//         new go.Binding('angle').makeTwoWay(),
//         // the main object is a Panel that surrounds a TextBlock with a Shape
//         $(go.Panel, 'Auto',
//           { name: 'PANEL' },
//           new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
//           $(go.Shape, 'Rectangle',  // default figure
//             {
//               portId: '', // the default port: if no spot on link data, use closest side
//               fromLinkable: true, toLinkable: true, cursor: 'pointer',
//               fill: 'white',  // default color
//               strokeWidth: 2
//             },
//             new go.Binding('figure'),
//             new go.Binding('fill')),
//           $(go.TextBlock,
//             {
//               font: 'bold 10pt Helvetica, Arial, sans-serif',
//               margin: 8,
//               maxSize: new go.Size(160, NaN),
//               wrap: go.TextBlock.WrapFit,
//               editable: false
//             },
//             new go.Binding('text').makeTwoWay())
//         ),
//         // four small named ports, one on each side:
//         makePort('T', go.Spot.Top, false, true),
//         makePort('L', go.Spot.Left, true, true),
//         makePort('R', go.Spot.Right, true, true),
//         makePort('B', go.Spot.Bottom, true, false),
//         { // handle mouse enter/leave events to show/hide the ports
//           mouseEnter(e, node) {
//  showSmallPorts(node, true); 
// },
//           mouseLeave(e, node) {
//  showSmallPorts(node, false); 
// }
//         },
//       );

//     function showSmallPorts(node, show) {
//       node.ports.each(function(port) {
//         if (port.portId !== '') {  // don't change the default port, which is the big shape
//           port.fill = show ? 'rgba(0,0,0,.3)' : null;
//         }
//       });
//     }

//     const linkSelectionAdornmentTemplate =
//       $(go.Adornment, 'Link',
//         $(go.Shape,
//           // isPanelMain declares that this Shape shares the Link.geometry
//           { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 })  // use selection object's strokeWidth
//       );

//     myDiagram.linkTemplate =
//       $(go.Link,  // the whole link panel
//         { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
//         { relinkableFrom: true, relinkableTo: true, reshapable: true },
//         {
//           routing: go.Link.AvoidsNodes,
//           curve: go.Link.JumpOver,
//           corner: 5,
//           toShortLength: 4
//         },
//         new go.Binding('points').makeTwoWay(),
//         $(go.Shape,  // the link path shape
//           { isPanelMain: true, strokeWidth: 2 }),
//         $(go.Shape,  // the arrowhead
//           { toArrow: 'Standard', stroke: null }),
//         $(go.Panel, 'Auto',
//           new go.Binding('visible', 'isSelected').ofObject(),
//           $(go.Shape, 'RoundedRectangle',  // the link shape
//             { fill: '#F8F8F8', stroke: null }),
//           $(go.TextBlock,
//             {
//               textAlign: 'center',
//               font: '10pt helvetica, arial, sans-serif',
//               stroke: '#919191',
//               margin: 2,
//               minSize: new go.Size(10, NaN),
//               editable: true
//             },
//             new go.Binding('text').makeTwoWay())
//         )
//       );
//     const { containers } =  this.props.docs;  
//     const { value, subValue } = this.state;
//     const docName: any = (subValue === 0) ? _.keys(containers[value].reduxActions())[0] : subValue;
//     const diagramName = containers[value].docs[docName].template;
//     const docVariables = containers[value].docs[docName].vars;
//     fetch(`/static/assets/redux-templates/${diagramName}.json`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((reduxDiagramJson) => {
//       // console.log('diagram is', reduxDiagramJson);
//       // console.log('doc engine response', this.props.docs);
//       let ruleCounter = 0;
//       let valText = '';
//     _.map(reduxDiagramJson.nodeDataArray, (val) => {
//       if (val.text === 'Actions') {
//         val.text = docName.replace('dispatch', 'dispatch ');
//       }
//       _.map(docVariables, (docVal, key) => {
//         if (val.text === `Effect ${ key}`) {
//           val.text = docVal.effect;
//         }
//         if (val.text === `Reducer ${ key}`) {
//           val.text = docVal.reducer;
//         }
//         if (val.text === `API ${ key}`) {
//           val.text = docVal.api;
//         }
//         if (val.text === `State ${ key}`) {
//           val.text = docVal.state;
//         }
//         if (val.text === `Rule ${ key}`) {
//           if (valText !== `Rule ${ key}`) {
//             ruleCounter = 0;
//           }
//           val.text = docVal.rules[ruleCounter];
//           valText = `Rule ${ key}`;
//           ruleCounter++;
//         }
//       })
//       // console.log('docVariables', docVariables);
//     });
//     // console.log('redux diagram json', reduxDiagramJson);
//     myDiagram.model = go.Model.fromJson(reduxDiagramJson);
//     const pos = myDiagram.model.modelData.position;
//     if (pos) myDiagram.initialPosition = go.Point.parse(pos);

//     // initialize the Palette that is on the left side of the page
//     myPalette =
//       $(go.Palette, 'myPaletteDiv',  // must name or refer to the DIV HTML element
//         {
//           maxSelectionCount: 1,
//           nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
//           linkTemplate: // simplify the link template, just in this Palette
//             $(go.Link,
//               { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
//                 // to line up the Link in the same manner we have to pretend the Link has the same location spot
//                 locationSpot: go.Spot.Center,
//                 selectionAdornmentTemplate:
//                   $(go.Adornment, 'Link',
//                     { locationSpot: go.Spot.Center },
//                     $(go.Shape,
//                       { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 }),
//                     $(go.Shape,  // the arrowhead
//                       { toArrow: 'Standard', stroke: null })
//                   )
//               },
//               {
//                 routing: go.Link.AvoidsNodes,
//                 curve: go.Link.JumpOver,
//                 corner: 5,
//                 toShortLength: 4
//               },
//               new go.Binding('points'),
//               $(go.Shape,  // the link path shape
//                 { isPanelMain: true, strokeWidth: 2 }),
//               $(go.Shape,  // the arrowhead
//                 { toArrow: 'Standard', stroke: null })
//             ),
//           model: new go.GraphLinksModel([  // specify the contents of the Palette
//             { text: 'Start', figure: 'Circle', fill: '#00AD5F' },
//             { text: 'Step' },
//             { text: 'DB', figure: 'Database', fill: 'lightgray' },
//             { text: '???', figure: 'Diamond', fill: 'lightskyblue' },
//             { text: 'End', figure: 'Circle', fill: '#CE0620' },
//             { text: 'Comment', figure: 'RoundedRectangle', fill: 'lightyellow' }
//           ], [
//             // the Palette also has a disconnected Link, which the user can drag-and-drop
//             { points: new go.List(/* go.Point */).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
//           ])
//         });
//     });
//   };

//   componentDidMount() {
//     this.renderDiagram();
//   }

//   renderReduxContainer = () => {
//     const { containers } = this.props.docs;
//     const { subValue, value, loadingState } = this.state;
//     return (loadingState) ? [] : (
//         <React.Fragment>
//               <Tabs
//                   value={(subValue === 0) ? _.keys(containers[value].reduxActions())[0] : subValue}
//                   onChange={this.handleSubChange}
//                   variant='fullWidth'
//                   scrollButtons='on'
//                   indicatorColor='primary'
//                   textColor='primary'
//                   centered
//               >
//                 { 
//                   _.keys(containers[value].reduxActions()).map((val) => {
//                     return (<Tab label={val.replace('dispatch', 'Action: ')} value={val} />)
//                   })
//                 }
//               </Tabs>
//                 <div
// id='myPaletteDiv'
// style={{
//                   display: 'none'
//                 }}
//                 />
//                 <div
// id='myStateMachineDiagramDiv'
//                       style={{
//                           width: '100%', 
//                           height: 850, 
//                           backgroundColor: '#DAE4E4'
//                       }}
//                 />
//         </React.Fragment>
//     )
//   };

//   render () {
//       const { containers } = this.props.docs;
//       const { value } = this.state;
//       return (
//         <React.Fragment>
//           <Tabs
//               value={value}
//               onChange={this.handleChange}
//               variant='fullWidth'
//               scrollButtons='on'
//               indicatorColor='primary'
//               textColor='primary'
//               centered
//           >
//             { 
//               containers.map((val) => {
//                 return (<Tab label={`${val.modelName.replace('Model', '')} Container`} />)
//               })
//             }
//           </Tabs>
//           {<TabContainer> 
// {' '}
// { this.renderReduxContainer() }
// {' '}
//            </TabContainer>}
//         </React.Fragment>
//       );
//   }
// }
