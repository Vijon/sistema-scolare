interface Point {
    x: number;
    y: number;
}

export function isEqual( obj1: Object, obj2: Object ) {
    return Object.entries(obj1).toString() === Object.entries(obj2).toString();
}

export function angleBetweenPoints( p1: Point, p2: Point ) {
    // angle in radians
    var radians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    // angle in degrees
    var degrees = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

    return { radians, degrees };
}

export function distanceBetweenPoints( p1: Point, p2: Point ) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt( a*a + b*b );
}

export function classNames(...args: (string | null)[]) {
    return args.filter(a => a !== null).join(' ');
};

export function shuffleArray(o: any[]): any {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i + ''), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}