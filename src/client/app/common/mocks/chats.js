const date = Date.now();

export default [{
  id: 1,
  message: 'Hey.',
  type: 'received',
  date: new Date(date - (1000 * 60 * 60 * 10)),
}, {
  id: 2,
  message: 'How are the wife and kids Taylor?',
  type: 'received',
  date: new Date(date - (1000 * 60 * 60 * 6)),
}, {
  id: 3,
  message: 'Pretty good Samuel.',
  type: 'sent',
  date: new Date(date - (1000 * 60 * 60 * 3)),
}, {
  id: 4,
  message: 'Cras mattis consectetur purus sit amet fermentum.',
  type: 'received',
  date: new Date(date - (1000 * 60 * 60 * 2)),
}, {
  id: 5,
  message: 'Goodnight.',
  type: 'sent',
  date: new Date(date - (1000 * 60 * 60)),
}, {
  id: 6,
  message: 'Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
  type: 'received',
  date,
}];
