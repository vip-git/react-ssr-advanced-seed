// Library
const shell = require('shelljs');
const baseUnimodJson = require('../../unimod.json');
/***************************************************************************
 * ----------------------------------------------------------------------***
 *  version 0.1                                                        *****
 * ----------------------------------------------------------------------***
 * @description                                                        *****
 * --------------------------------------------------------------------*****
 * This is the first version or iteration at automating                *****
 * frontend apps from scratch.                                         *****
 * ----------------------------------------------------------------------***
 * Current Assumptions (later to support more) :                       *****
 * - You are going with React Stack                                    *****
 *   (React - Redux (Observable) - Material UI)                        *****
 * - Later it should be possible to generate complete generic solution *****
 *   like eg: React - Redux (optional / saga / etc) - AntDesign        *****
 ***************************************************************************
 * How does it work :                                                  *****
 ***************************************************************************
 * It starts from the root of every project :                            ***
 * eg:                                                                   ***
 *  ./unimod.json (Holds the original information to scaffold)           ***
 *  Generally 3 important things :                                       ***
 *  - Config                                                             ***
 *    - Web                                                              ***
 *    - Mobile                                                           ***
 *  - Routes (Web and Mobile)                                            ***
 *    - Chat (Example)                                                   ***
 *  - Containers                                                         ***
 *    - Chat                                                             ***
 *      - Web      (This will be then follow up to scaffold to more info)***
 *      - Mobile   (This will be then follow up to scaffold to more info)***
 ***************************************************************************/

console.log('unimod json is', baseUnimodJson);
