export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [3];

export const dictionary = {
		"/(dashboard)/dashboard": [~5,[2]],
		"/(dashboard)/dashboard/account": [6,[2]],
		"/(dashboard)/dashboard/categories": [7,[2,3]],
		"/(dashboard)/dashboard/categories/create": [8,[2,3]],
		"/(dashboard)/dashboard/categories/edit/[id]": [9,[2,3]],
		"/(dashboard)/dashboard/customers": [10,[2]],
		"/(dashboard)/dashboard/discounts": [11,[2]],
		"/(dashboard)/dashboard/finances": [12,[2]],
		"/(dashboard)/dashboard/insights": [13,[2]],
		"/(dashboard)/dashboard/orders": [14,[2]],
		"/(dashboard)/dashboard/products": [15,[2,4]],
		"/(dashboard)/dashboard/settings": [16,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';