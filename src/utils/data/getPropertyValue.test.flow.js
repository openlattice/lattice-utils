/*
 * @flow
 */

/* eslint-disable no-unused-vars */

import getPropertyValue from './getPropertyValue';

const ID = 'ol.id';
const entity :any = {
  'ol.id': ['hello', 'world']
};

const value01 = getPropertyValue(entity, [ID, 0]);
const value02 :string = getPropertyValue(entity, [ID, 0]);
const value03 :string = getPropertyValue<string, _>(entity, [ID, 0]);
const value04 :string = getPropertyValue<string, string>(entity, [ID, 0]);
const value05 :string = getPropertyValue<string, _>(entity, [ID, 0], '');
const value06 :string = getPropertyValue<string, string>(entity, [ID, 0], '');
const value07 :string | boolean = getPropertyValue<string, _>(entity, [ID, 0], false);
const value08 :string | boolean = getPropertyValue<string, boolean>(entity, [ID, 0], false);
const value09 :string | number = getPropertyValue<string, _>(entity, [ID, 0], 0);
const value10 :string | number = getPropertyValue<string, number>(entity, [ID, 0], 0);

// $FlowExpectedError
const value11 = getPropertyValue<string, boolean>(entity, [ID, 0], '');
// $FlowExpectedError
const value12 = getPropertyValue<string, number>(entity, [ID, 0], '');

// $FlowExpectedError
const value13 = getPropertyValue<string, number>(entity, [ID, 0], false);
// $FlowExpectedError
const value14 = getPropertyValue<string, string>(entity, [ID, 0], false);

// $FlowExpectedError
const value15 = getPropertyValue<string, boolean>(entity, [ID, 0], 0);
// $FlowExpectedError
const value16 = getPropertyValue<string, string>(entity, [ID, 0], 0);

const value17 = getPropertyValue(entity, ID);
const value18 :string[] = getPropertyValue(entity, ID);
const value19 :string[] = getPropertyValue<string, _>(entity, ID);
const value20 :string[] | string = getPropertyValue<string, string>(entity, ID);
const value21 :string[] | string = getPropertyValue<string, _>(entity, ID, '');
const value22 :string[] | string = getPropertyValue<string, string>(entity, ID, '');
const value23 :string[] | boolean = getPropertyValue<string, _>(entity, ID, false);
const value24 :string[] | boolean = getPropertyValue<string, boolean>(entity, ID, false);
const value25 :string[] | number = getPropertyValue<string, _>(entity, ID, 0);
const value26 :string[] | number = getPropertyValue<string, number>(entity, ID, 0);

// $FlowExpectedError
const value27 = getPropertyValue<string, boolean>(entity, ID, '');
// $FlowExpectedError
const value28 = getPropertyValue<string, number>(entity, ID, '');

// $FlowExpectedError
const value29 = getPropertyValue<string, number>(entity, ID, false);
// $FlowExpectedError
const value30 = getPropertyValue<string, string>(entity, ID, false);

// $FlowExpectedError
const value31 = getPropertyValue<string, boolean>(entity, ID, 0);
// $FlowExpectedError
const value32 = getPropertyValue<string, string>(entity, ID, 0);
