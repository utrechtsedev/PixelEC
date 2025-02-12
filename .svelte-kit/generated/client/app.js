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
	() => import('./nodes/14')
];

export const server_loads = [3];

export const dictionary = {
		"/(dashboard)/dashboard": [~4,[2]],
		"/(dashboard)/dashboard/account": [5,[2]],
		"/(dashboard)/dashboard/categories": [6,[2,3]],
		"/(dashboard)/dashboard/categories/edit": [7,[2,3]],
		"/(dashboard)/dashboard/customers": [8,[2]],
		"/(dashboard)/dashboard/discounts": [9,[2]],
		"/(dashboard)/dashboard/finances": [10,[2]],
		"/(dashboard)/dashboard/insights": [11,[2]],
		"/(dashboard)/dashboard/orders": [12,[2]],
		"/(dashboard)/dashboard/products": [13,[2]],
		"/(dashboard)/dashboard/settings": [14,[2]]
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