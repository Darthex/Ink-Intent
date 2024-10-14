type Entity = [] | object;

export type IndexableObject = {
	[key: string]: any;
};

export function isEmpty(entity: Entity) {
	if (Array.isArray(entity)) {
		return !(entity.length > 0);
	}
	if (typeof entity === 'object') {
		return !(Object.keys(entity).length > 0);
	}
}

export function omit(object: IndexableObject, paths: string[]) {
	const mutableObject = { ...object };
	paths.forEach((key) => delete mutableObject[key]);
	return mutableObject;
}

export function shallowEqual(obj1: IndexableObject, obj2: IndexableObject) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
