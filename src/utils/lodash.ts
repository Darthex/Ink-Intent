type Entity = [] | object;

export function isEmpty(entity: Entity) {
	if (Array.isArray(entity)) {
		return !(entity.length > 0);
	}
	if (typeof entity === 'object') {
		return !(Object.keys(entity).length > 0);
	}
}

export function omit(object: object, paths: string[]) {
	const mutableObject = { ...object };
	paths.forEach((key) => delete mutableObject[key]);
	return mutableObject;
}
