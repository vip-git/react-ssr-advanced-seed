import React from 'react';

import Avatar from '@material-ui/core/Avatar';

const face1 = require('@omega-core/assets/images/face1.jpg');
const face2 = require('@omega-core/assets/images/face2.jpg');
const face3 = require('@omega-core/assets/images/face3.jpg');
const face4 = require('@omega-core/assets/images/face4.jpg');
const face5 = require('@omega-core/assets/images/face5.jpg');
const face6 = require('@omega-core/assets/images/face6.jpg');
const face7 = require('@omega-core/assets/images/face7.jpg');

export default [{
  id: 1,
  name: 'Bobby Sullivan',
  status: 'Mollis Nullam',
  avatar: <Avatar alt='' src={face3} />,
}, {
  id: 2,
  name: 'Bryan Morgan',
  status: 'Risus Justo',
  avatar: <Avatar alt='' src={face4} />,
}, {
  id: 3,
  name: 'Phillip Caroll',
  status: 'Mollis Nibh',
  avatar: <Avatar alt='' src={face5} />,
}, {
  id: 4,
  name: 'Brandon Boyd',
  status: 'Dolor Mattis',
  avatar: <Avatar alt='' src={face6} />,
}, {
  id: 5,
  name: 'Laura Mason',
  status: 'Commodo Amet',
  avatar: <Avatar alt='' src={face7} />,
}, {
  id: 6,
  name: 'Barbara Chapman',
  status: 'Tellus Sollicitudin',
  avatar: <Avatar alt='' src={face2} />,
}, {
  id: 7,
  name: 'Doris Baker',
  status: 'Nibh Adipiscing',
  avatar: <Avatar alt='' src={face1} />,
},
];
