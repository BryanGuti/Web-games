const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣️',
  'I': '🎁',
  'Heart': '❤️',
  'Player': '🐵',
  'Collision': '💥',
  'Lost': '💀',
  'Win': '🏆️',
};

const maps = [];

maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);

maps.push(`
  O-----XXXX
  XX-XX-XXXX
  XX-XX-XXXX
  XX-XX-----
  XX-XXXXXX-
  XX----XXX-
  XXXXX-XXX-
  XXXXX-X---
  XXXXXXXIXX
  XXXXXXXXXX
`);

maps.push(`
  I-XXXXXXXX
  X-XXXXXXXX
  X-------XX
  XXXXXXX-XX
  X-------XX
  XXXXXXX-XX
  X-------XX
  X-XXXXXXXX
  X------OXX
  XXXXXXXXXX
`);

maps.push(`
  O-----XXXX
  XXXXX-----
  XX----XXX-
  XX-XXXX---
  XX-----XX-
  XXXXXX-XX-
  XX-----XX-
  XX-XXXXXX-
  XX-----I-X
  XXXXXXXXXX
`);

maps.push(`
  --------XX
  XXXXX-X-XX
  XX----XIXX
  XX-XXXXX--
  XX-X-XXXX-
  XX-X-XXXX-
  XX-X-XXXX-
  XX-X-XXXX-
  XX-----O--
  XXXXXXXXXX
`);

maps.push(`
  XX-----XXX
  XX-XXX-XXX
  XX---XO--X
  XXXX-XXX--
  XXXX-XXXX-
  XXXX---XX-
  XXXXXX-XX-
  XX-----XX-
  XX-XXXXXX-
  XXIX------
`);

maps.push(`
  X---------
  --X-XXXXX-
  -XX-XXXXX-
  -XX-XXX---
  -XX-XXX-X-
  -X--XXXXX-
  -X-XXX-IX-
  -X-----XX-
  -XXXXXXXX-
  --O-------
`);

const newMaps = maps.map(map => {
  return map
    .trim()
    .replace(/ /g, '')
    .split('\n');
});
