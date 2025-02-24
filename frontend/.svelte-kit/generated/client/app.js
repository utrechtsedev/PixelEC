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
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [3];

export const dictionary = {
		"/(home)": [18,[5]],
		"/(dashboard)/dashboard": [~6,[2]],
		"/(dashboard)/dashboard/account": [7,[2]],
		"/(dashboard)/dashboard/categories": [8,[2,3]],
		"/(dashboard)/dashboard/categories/create": [9,[2,3]],
		"/(dashboard)/dashboard/categories/edit/[id]": [10,[2,3]],
		"/(dashboard)/dashboard/customers": [11,[2]],
		"/(dashboard)/dashboard/discounts": [12,[2]],
		"/(dashboard)/dashboard/finances": [13,[2]],
		"/(dashboard)/dashboard/insights": [14,[2]],
		"/(dashboard)/dashboard/orders": [15,[2]],
		"/(dashboard)/dashboard/products": [16,[2,4]],
		"/(dashboard)/dashboard/settings": [17,[2]],
		"/(home)/products": [19,[5]]
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