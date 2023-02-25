const interfaces = Symbol("interfaces");

let __implements = (this && this.__implements) || function(a) {
	Object.defineProperty(a.prototype, interfaces, { value: [] });
	for (let i = 1; i < arguments.length; i++) {
		if (!arguments[i]) continue;
		a.prototype[interfaces].push(arguments[i]);
		for (let j in arguments[i]) (arguments[i][j] !== null && arguments[i][j] !== undefined) ? a.prototype[j] = arguments[i][j] :
		Object.defineProperty(a.prototype, j, {
			configurable: true,
			get() { throw new Error('Member "' + j + '" of "' + a.name + '" is not implemented') },
			set(value) { Object.defineProperty(a.prototype, j, { get() { return value }})}
		})
	}
};

function __instanceOf(L, R) {
	let O = R.prototype;
	L = L.__proto__;
	while (L) {
		if (O === null) return false;
		if (L === O) return true;
		L = L.__proto__;
	}
	return false;
};

function __interfaceOf(O, I) {
	if (!O[interfaces]) return false;
	let result = O[interfaces].indexOf(I) != -1;
	if (!result && O[interfaces].length > 0)
	for (let i in O[interfaces]) if (__interfaceOf(O[instances][i], I)) return true;
	return result;
};

let Interface = (function() {
	function Interface(_super, fields) {
		if (_super) {
			if (_super instanceof Interface) Object.defineProperty(this, interfaces, { value: [_super] });
			for (let i in _super) this[i] = _super[i];
			if (fields) for (let i in fields) this[i] = fields[i];
		}
		Object.defineProperty(this, Symbol.hasInstance, {
			value(i) { return i && (__instanceOf(i, this) || __interfaceOf(i, this))}
		});
		return this;
	};
	Object.defineProperty(Interface, Symbol.hasInstance, {
		value(i) { return i && !!i[interfaces]}
	});
	return Interface;
}());
