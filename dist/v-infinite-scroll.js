/**
* @vue/shared v3.4.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Qt(e, t) {
  const n = new Set(e.split(","));
  return (r) => n.has(r);
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const q = () => {
}, Xt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), R = Object.assign, Zt = Object.prototype.hasOwnProperty, E = (e, t) => Zt.call(e, t), _ = Array.isArray, Y = (e) => Oe(e) === "[object Map]", kt = (e) => Oe(e) === "[object Set]", b = (e) => typeof e == "function", V = (e) => typeof e == "string", ie = (e) => typeof e == "symbol", v = (e) => e !== null && typeof e == "object", en = (e) => (v(e) || b(e)) && b(e.then) && b(e.catch), tn = Object.prototype.toString, Oe = (e) => tn.call(e), mt = (e) => Oe(e).slice(8, -1), nn = (e) => Oe(e) === "[object Object]", He = (e) => V(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, sn = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Z = (e, t) => !Object.is(e, t), on = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
};
let et;
const Et = () => et || (et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ke(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = V(r) ? un(r) : Ke(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (V(e) || v(e))
    return e;
}
const cn = /;(?![^(]*\))/g, ln = /:([^]+)/, an = /\/\*[^]*?\*\//g;
function un(e) {
  const t = {};
  return e.replace(an, "").split(cn).forEach((n) => {
    if (n) {
      const r = n.split(ln);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ze(e) {
  let t = "";
  if (V(e))
    t = e;
  else if (_(e))
    for (let n = 0; n < e.length; n++) {
      const r = ze(e[n]);
      r && (t += r + " ");
    }
  else if (v(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.4.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function se(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let fn;
function pn(e, t = fn) {
  t && t.active && t.effects.push(e);
}
let te;
class dn {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, pn(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, ve();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (hn(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Se();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = H, n = te;
    try {
      return H = !0, te = this, this._runnings++, tt(this), this.fn();
    } finally {
      nt(this), this._runnings--, te = n, H = t;
    }
  }
  stop() {
    this.active && (tt(this), nt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function hn(e) {
  return e.value;
}
function tt(e) {
  e._trackId++, e._depsLength = 0;
}
function nt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      wt(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function wt(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let H = !0, Pe = 0;
const bt = [];
function ve() {
  bt.push(H), H = !1;
}
function Se() {
  const e = bt.pop();
  H = e === void 0 ? !0 : e;
}
function We() {
  Pe++;
}
function Ue() {
  for (Pe--; !Pe && Te.length; )
    Te.shift()();
}
function _n(e, t, n) {
  var r;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && wt(s, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((r = e.onTrack) == null || r.call(e, R({ effect: e }, n)));
  }
}
const Te = [];
function gn(e, t, n) {
  var r;
  We();
  for (const s of e.keys()) {
    let o;
    s._dirtyLevel < t && (o ?? (o = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = t), s._shouldSchedule && (o ?? (o = e.get(s) === s._trackId)) && (process.env.NODE_ENV !== "production" && ((r = s.onTrigger) == null || r.call(s, R({ effect: s }, n))), s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && Te.push(s.scheduler)));
  }
  Ue();
}
const mn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, $e = /* @__PURE__ */ new WeakMap(), K = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function N(e, t, n) {
  if (H && te) {
    let r = $e.get(e);
    r || $e.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = mn(() => r.delete(n))), _n(
      te,
      s,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function M(e, t, n, r, s, o) {
  const i = $e.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && _(e)) {
    const a = Number(r);
    i.forEach((u, d) => {
      (d === "length" || !ie(d) && d >= a) && c.push(u);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        _(e) ? He(n) && c.push(i.get("length")) : (c.push(i.get(K)), Y(e) && c.push(i.get(Me)));
        break;
      case "delete":
        _(e) || (c.push(i.get(K)), Y(e) && c.push(i.get(Me)));
        break;
      case "set":
        Y(e) && c.push(i.get(K));
        break;
    }
  We();
  for (const a of c)
    a && gn(
      a,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: r,
        oldValue: s,
        oldTarget: o
      } : void 0
    );
  Ue();
}
const En = /* @__PURE__ */ Qt("__proto__,__v_isRef,__isVue"), Nt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ie)
), rt = /* @__PURE__ */ wn();
function wn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        N(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ve(), We();
      const r = p(this)[t].apply(this, n);
      return Ue(), Se(), r;
    };
  }), e;
}
function bn(e) {
  ie(e) || (e = String(e));
  const t = p(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class Ot {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? Vt : xt : o ? Tn : yt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = _(t);
    if (!s) {
      if (i && E(rt, n))
        return Reflect.get(rt, n, r);
      if (n === "hasOwnProperty")
        return bn;
    }
    const c = Reflect.get(t, n, r);
    return (ie(n) ? Nt.has(n) : En(n)) || (s || N(t, "get", n), o) ? c : y(c) ? i && He(n) ? c : c.value : v(c) ? s ? It(c) : Rt(c) : c;
  }
}
class Nn extends Ot {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const a = k(o);
      if (!Q(r) && !k(r) && (o = p(o), r = p(r)), !_(t) && y(o) && !y(r))
        return a ? !1 : (o.value = r, !0);
    }
    const i = _(t) && He(n) ? Number(n) < t.length : E(t, n), c = Reflect.set(t, n, r, s);
    return t === p(s) && (i ? Z(r, o) && M(t, "set", n, r, o) : M(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = E(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && M(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ie(n) || !Nt.has(n)) && N(t, "has", n), r;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      _(t) ? "length" : K
    ), Reflect.ownKeys(t);
  }
}
class vt extends Ot {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && se(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && se(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const On = /* @__PURE__ */ new Nn(), vn = /* @__PURE__ */ new vt(), Sn = /* @__PURE__ */ new vt(!0), Je = (e) => e, ye = (e) => Reflect.getPrototypeOf(e);
function le(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (Z(t, o) && N(s, "get", t), N(s, "get", o));
  const { has: i } = ye(s), c = r ? Je : n ? Be : Ye;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function ae(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (Z(e, s) && N(r, "has", e), N(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ue(e, t = !1) {
  return e = e.__v_raw, !t && N(p(e), "iterate", K), Reflect.get(e, "size", e);
}
function st(e) {
  e = p(e);
  const t = p(this);
  return ye(t).has.call(t, e) || (t.add(e), M(t, "add", e, e)), this;
}
function ot(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: s } = ye(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && St(n, r, e) : (e = p(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? Z(t, i) && M(n, "set", e, t, i) : M(n, "add", e, t), this;
}
function it(e) {
  const t = p(this), { has: n, get: r } = ye(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && St(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && M(t, "delete", e, void 0, o), i;
}
function ct() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Y(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && M(e, "clear", void 0, void 0, n), r;
}
function fe(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? Je : e ? Be : Ye;
    return !e && N(c, "iterate", K), i.forEach((u, d) => r.call(s, a(u), a(d), o));
  };
}
function pe(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = Y(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = s[e](...r), d = n ? Je : t ? Be : Ye;
    return !t && N(
      o,
      "iterate",
      a ? Me : K
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function P(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      se(
        `${sn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function yn() {
  const e = {
    get(o) {
      return le(this, o);
    },
    get size() {
      return ue(this);
    },
    has: ae,
    add: st,
    set: ot,
    delete: it,
    clear: ct,
    forEach: fe(!1, !1)
  }, t = {
    get(o) {
      return le(this, o, !1, !0);
    },
    get size() {
      return ue(this);
    },
    has: ae,
    add: st,
    set: ot,
    delete: it,
    clear: ct,
    forEach: fe(!1, !0)
  }, n = {
    get(o) {
      return le(this, o, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return ae.call(this, o, !0);
    },
    add: P("add"),
    set: P("set"),
    delete: P("delete"),
    clear: P("clear"),
    forEach: fe(!0, !1)
  }, r = {
    get(o) {
      return le(this, o, !0, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return ae.call(this, o, !0);
    },
    add: P("add"),
    set: P("set"),
    delete: P("delete"),
    clear: P("clear"),
    forEach: fe(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = pe(o, !1, !1), n[o] = pe(o, !0, !1), t[o] = pe(o, !1, !0), r[o] = pe(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  xn,
  Vn,
  Rn,
  In
] = /* @__PURE__ */ yn();
function qe(e, t) {
  const n = t ? e ? In : Rn : e ? Vn : xn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    E(n, s) && s in r ? n : r,
    s,
    o
  );
}
const Cn = {
  get: /* @__PURE__ */ qe(!1, !1)
}, Dn = {
  get: /* @__PURE__ */ qe(!0, !1)
}, Pn = {
  get: /* @__PURE__ */ qe(!0, !0)
};
function St(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = mt(e);
    se(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const yt = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap();
function $n(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Mn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $n(mt(e));
}
function Rt(e) {
  return k(e) ? e : Ge(
    e,
    !1,
    On,
    Cn,
    yt
  );
}
function It(e) {
  return Ge(
    e,
    !0,
    vn,
    Dn,
    xt
  );
}
function de(e) {
  return Ge(
    e,
    !0,
    Sn,
    Pn,
    Vt
  );
}
function Ge(e, t, n, r, s) {
  if (!v(e))
    return process.env.NODE_ENV !== "production" && se(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = Mn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function B(e) {
  return k(e) ? B(e.__v_raw) : !!(e && e.__v_isReactive);
}
function k(e) {
  return !!(e && e.__v_isReadonly);
}
function Q(e) {
  return !!(e && e.__v_isShallow);
}
function Fe(e) {
  return e ? !!e.__v_raw : !1;
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Fn(e) {
  return Object.isExtensible(e) && on(e, "__v_skip", !0), e;
}
const Ye = (e) => v(e) ? Rt(e) : e, Be = (e) => v(e) ? It(e) : e;
function y(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ct(e) {
  return y(e) ? e.value : e;
}
const An = {
  get: (e, t, n) => Ct(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return y(s) && !y(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function jn(e) {
  return B(e) ? e : new Proxy(e, An);
}
/**
* @vue/runtime-core v3.4.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const z = [];
function Ln(e) {
  z.push(e);
}
function Hn() {
  z.pop();
}
function g(e, ...t) {
  ve();
  const n = z.length ? z[z.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = Kn();
  if (r)
    W(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Gt(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...zn(s)), console.warn(...o);
  }
  Se();
}
function Kn() {
  let e = z[z.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function zn(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Wn(n));
  }), t;
}
function Wn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Gt(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...Un(e.props), o] : [s + o];
}
function Un(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Dt(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Dt(e, t, n) {
  return V(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : y(t) ? (t = Dt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : b(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Pt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function W(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    Qe(s, t, n);
  }
}
function ge(e, t, n, r) {
  if (b(e)) {
    const s = W(e, t, n, r);
    return s && en(s) && s.catch((o) => {
      Qe(o, t, n);
    }), s;
  }
  if (_(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(ge(e[o], t, n, r));
    return s;
  } else process.env.NODE_ENV !== "production" && g(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Qe(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Pt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      ve(), W(
        a,
        null,
        10,
        [e, i, c]
      ), Se();
      return;
    }
  }
  Jn(e, n, s, r);
}
function Jn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Pt[t];
    if (n && Ln(n), g(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Hn(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ee = !1, Ae = !1;
const x = [];
let $ = 0;
const X = [];
let T = null, j = 0;
const Tt = /* @__PURE__ */ Promise.resolve();
let Xe = null;
const qn = 100;
function Gn(e) {
  const t = Xe || Tt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yn(e) {
  let t = $ + 1, n = x.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = x[r], o = oe(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Ze(e) {
  (!x.length || !x.includes(
    e,
    Ee && e.allowRecurse ? $ + 1 : $
  )) && (e.id == null ? x.push(e) : x.splice(Yn(e.id), 0, e), $t());
}
function $t() {
  !Ee && !Ae && (Ae = !0, Xe = Tt.then(Ft));
}
function Mt(e) {
  _(e) ? X.push(...e) : (!T || !T.includes(
    e,
    e.allowRecurse ? j + 1 : j
  )) && X.push(e), $t();
}
function Bn(e) {
  if (X.length) {
    const t = [...new Set(X)].sort(
      (n, r) => oe(n) - oe(r)
    );
    if (X.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), j = 0; j < T.length; j++) {
      const n = T[j];
      process.env.NODE_ENV !== "production" && At(e, n) || n.active !== !1 && n();
    }
    T = null, j = 0;
  }
}
const oe = (e) => e.id == null ? 1 / 0 : e.id, Qn = (e, t) => {
  const n = oe(e) - oe(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function Ft(e) {
  Ae = !1, Ee = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), x.sort(Qn);
  const t = process.env.NODE_ENV !== "production" ? (n) => At(e, n) : q;
  try {
    for ($ = 0; $ < x.length; $++) {
      const n = x[$];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        W(n, null, 14);
      }
    }
  } finally {
    $ = 0, x.length = 0, Bn(e), Ee = !1, Xe = null, (x.length || X.length) && Ft(e);
  }
}
function At(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > qn) {
      const r = t.ownerInstance, s = r && qt(r.type);
      return Qe(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const U = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Et().__VUE_HMR_RUNTIME__ = {
  createRecord: Ce(Xn),
  rerender: Ce(Zn),
  reload: Ce(kn)
});
const we = /* @__PURE__ */ new Map();
function Xn(e, t) {
  return we.has(e) ? !1 : (we.set(e, {
    initialDef: ne(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ne(e) {
  return Yt(e) ? e.__vccOpts : e;
}
function Zn(e, t) {
  const n = we.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ne(r.type).render = t), r.renderCache = [], r.effect.dirty = !0, r.update();
  }));
}
function kn(e, t) {
  const n = we.get(e);
  if (!n) return;
  t = ne(t), lt(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = ne(s.type);
    U.has(o) || (o !== n.initialDef && lt(o, t), U.add(o)), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (U.add(o), s.ceReload(t.styles), U.delete(o)) : s.parent ? (s.parent.effect.dirty = !0, Ze(() => {
      s.parent.update(), U.delete(o);
    })) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Mt(() => {
    for (const s of r)
      U.delete(
        ne(s.type)
      );
  });
}
function lt(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ce(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let J, he = [];
function jt(e, t) {
  var n, r;
  J = e, J ? (J.enabled = !0, he.forEach(({ event: s, args: o }) => J.emit(s, ...o)), he = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    jt(o, t);
  }), setTimeout(() => {
    J || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, he = []);
  }, 3e3)) : he = [];
}
let D = null, er = null;
const tr = Symbol.for("v-ndc"), nr = (e) => e.__isSuspense;
function rr(e, t) {
  t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : Mt(e);
}
const je = (e) => e ? Rr(e) ? Ir(e) : je(e.parent) : null, re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? de(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? de(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? de(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? de(e.refs) : e.refs,
    $parent: (e) => je(e.parent),
    $root: (e) => je(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ir(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ze(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Gn.bind(e.proxy)),
    $watch: (e) => _r.bind(e)
  })
), sr = (e) => e === "_" || e === "$", De = (e, t) => e !== C && !e.__isScriptSetup && E(e, t), or = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (De(r, t))
          return i[t] = 1, r[t];
        if (s !== C && E(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && E(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && E(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = re[t];
    let l, f;
    if (d)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && E(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, E(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && D && (!V(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== C && sr(t[0]) && E(s, t) ? g(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === D && g(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return De(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && E(s, t) ? (g(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== C && E(r, t) ? (r[t] = n, !0) : E(e.props, t) ? (process.env.NODE_ENV !== "production" && g(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && g(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== C && E(e, i) || De(t, i) || (c = o[0]) && E(c, i) || E(r, i) || E(re, i) || E(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (or.ownKeys = (e) => (g(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function at(e) {
  return _(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ir(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (u) => be(a, u, i, !0)
  ), be(a, t, i)), v(t) && o.set(t, a), a;
}
function be(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && be(e, o, n, !0), s && s.forEach(
    (i) => be(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && g(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = cr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const cr = {
  data: ut,
  props: pt,
  emits: pt,
  // objects
  methods: ee,
  computed: ee,
  // lifecycle
  beforeCreate: O,
  created: O,
  beforeMount: O,
  mounted: O,
  beforeUpdate: O,
  updated: O,
  beforeDestroy: O,
  beforeUnmount: O,
  destroyed: O,
  unmounted: O,
  activated: O,
  deactivated: O,
  errorCaptured: O,
  serverPrefetch: O,
  // assets
  components: ee,
  directives: ee,
  // watch
  watch: ar,
  // provide / inject
  provide: ut,
  inject: lr
};
function ut(e, t) {
  return t ? e ? function() {
    return R(
      b(e) ? e.call(this, this) : e,
      b(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function lr(e, t) {
  return ee(ft(e), ft(t));
}
function ft(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function O(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ee(e, t) {
  return e ? R(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function pt(e, t) {
  return e ? _(e) && _(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : R(
    /* @__PURE__ */ Object.create(null),
    at(e),
    at(t ?? {})
  ) : t;
}
function ar(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = O(e[r], t[r]);
  return n;
}
let dt = null;
function ur(e, t, n = !1) {
  const r = xe || D;
  if (r || dt) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : dt._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && b(t) ? t.call(r && r.proxy) : t;
    process.env.NODE_ENV !== "production" && g(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && g("inject() can only be used inside setup() or functional components.");
}
const fr = {}, Lt = (e) => Object.getPrototypeOf(e) === fr, ht = rr, pr = Symbol.for("v-scx"), dr = () => {
  {
    const e = ur(pr);
    return e || process.env.NODE_ENV !== "production" && g(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, _e = {};
function hr(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: o,
  onTrack: i,
  onTrigger: c
} = C) {
  if (t && o) {
    const h = t;
    t = (...Ie) => {
      h(...Ie), Re();
    };
  }
  process.env.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && g(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && g(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && g(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && g(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (h) => {
    g(
      "Invalid watch source: ",
      h,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = xe, d = (h) => r === !0 ? h : (
    // for deep: false, only traverse root-level properties
    L(h, r === !1 ? 1 : void 0)
  );
  let l, f = !1, m = !1;
  if (y(e) ? (l = () => e.value, f = Q(e)) : B(e) ? (l = () => d(e), f = !0) : _(e) ? (m = !0, f = e.some((h) => B(h) || Q(h)), l = () => e.map((h) => {
    if (y(h))
      return h.value;
    if (B(h))
      return d(h);
    if (b(h))
      return W(h, u, 2);
    process.env.NODE_ENV !== "production" && a(h);
  })) : b(e) ? t ? l = () => W(e, u, 2) : l = () => (w && w(), ge(
    e,
    u,
    3,
    [I]
  )) : (l = q, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const h = l;
    l = () => L(h());
  }
  let w, I = (h) => {
    w = S.onStop = () => {
      W(h, u, 4), w = S.onStop = void 0;
    };
  }, Ve;
  if (Jt)
    if (I = q, t ? n && ge(t, u, 3, [
      l(),
      m ? [] : void 0,
      I
    ]) : l(), s === "sync") {
      const h = dr();
      Ve = h.__watcherHandles || (h.__watcherHandles = []);
    } else
      return q;
  let F = m ? new Array(e.length).fill(_e) : _e;
  const A = () => {
    if (!(!S.active || !S.dirty))
      if (t) {
        const h = S.run();
        (r || f || (m ? h.some((Ie, Bt) => Z(Ie, F[Bt])) : Z(h, F))) && (w && w(), ge(t, u, 3, [
          h,
          // pass undefined as the old value when it's changed for the first time
          F === _e ? void 0 : m && F[0] === _e ? [] : F,
          I
        ]), F = h);
      } else
        S.run();
  };
  A.allowRecurse = !!t;
  let ce;
  s === "sync" ? ce = A : s === "post" ? ce = () => ht(A, u && u.suspense) : (A.pre = !0, u && (A.id = u.uid), ce = () => Ze(A));
  const S = new dn(l, q, ce), Re = () => {
    S.stop();
  };
  return process.env.NODE_ENV !== "production" && (S.onTrack = i, S.onTrigger = c), t ? n ? A() : F = S.run() : s === "post" ? ht(
    S.run.bind(S),
    u && u.suspense
  ) : S.run(), Ve && Ve.push(Re), Re;
}
function _r(e, t, n) {
  const r = this.proxy, s = V(e) ? e.includes(".") ? gr(r, e) : () => r[e] : e.bind(r, r);
  let o;
  b(t) ? o = t : (o = t.handler, n = t);
  const i = Vr(this), c = hr(s, o.bind(r), n);
  return i(), c;
}
function gr(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function L(e, t = 1 / 0, n) {
  if (t <= 0 || !v(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, y(e))
    L(e.value, t, n);
  else if (_(e))
    for (let r = 0; r < e.length; r++)
      L(e[r], t, n);
  else if (kt(e) || Y(e))
    e.forEach((r) => {
      L(r, t, n);
    });
  else if (nn(e)) {
    for (const r in e)
      L(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && L(e[r], t, n);
  }
  return e;
}
function Ht(e, t) {
  e.shapeFlag & 6 && e.component ? Ht(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
const mr = (e) => e.__isTeleport, Kt = Symbol.for("v-fgt"), Er = Symbol.for("v-txt"), wr = Symbol.for("v-cmt");
let G = null;
function br(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Nr = (...e) => Wt(
  ...e
), zt = ({ key: e }) => e ?? null, me = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? V(e) || y(e) || b(e) ? { i: D, r: e, k: t, f: !!n } : e : null);
function Or(e, t = null, n = null, r = 0, s = null, o = e === Kt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zt(t),
    ref: t && me(t),
    scopeId: er,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: D
  };
  return c ? (ke(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= V(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && g("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  G && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && G.push(a), a;
}
const vr = process.env.NODE_ENV !== "production" ? Nr : Wt;
function Wt(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === tr) && (process.env.NODE_ENV !== "production" && !e && g(`Invalid vnode type when creating vnode: ${e}.`), e = wr), br(e)) {
    const c = Ne(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ke(c, n), !o && G && (c.shapeFlag & 6 ? G[G.indexOf(e)] = c : G.push(c)), c.patchFlag = -2, c;
  }
  if (Yt(e) && (e = e.__vccOpts), t) {
    t = Sr(t);
    let { class: c, style: a } = t;
    c && !V(c) && (t.class = ze(c)), v(a) && (Fe(a) && !_(a) && (a = R({}, a)), t.style = Ke(a));
  }
  const i = V(e) ? 1 : nr(e) ? 128 : mr(e) ? 64 : v(e) ? 4 : b(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Fe(e) && (e = p(e), g(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Or(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function Sr(e) {
  return e ? Fe(e) || Lt(e) ? R({}, e) : e : null;
}
function Ne(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: c, transition: a } = e, u = t ? xr(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && zt(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? _(o) ? o.concat(me(t)) : [o, me(t)] : me(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && _(c) ? c.map(Ut) : c,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Kt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ne(e.ssContent),
    ssFallback: e.ssFallback && Ne(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Ht(
    d,
    a.clone(d)
  ), d;
}
function Ut(e) {
  const t = Ne(e);
  return _(e.children) && (t.children = e.children.map(Ut)), t;
}
function yr(e = " ", t = 0) {
  return vr(Er, null, e, t);
}
function ke(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (_(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ke(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Lt(t) ? t._ctx = D : s === 3 && D && (D.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else b(t) ? (t = { default: t, _ctx: D }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [yr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = ze([t.class, r.class]));
      else if (s === "style")
        t.style = Ke([t.style, r.style]);
      else if (Xt(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(_(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
let xe = null, Le;
{
  const e = Et(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  Le = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => xe = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Jt = n
  );
}
const Vr = (e) => {
  const t = xe;
  return Le(e), e.scope.on(), () => {
    e.scope.off(), Le(t);
  };
};
function Rr(e) {
  return e.vnode.shapeFlag & 4;
}
let Jt = !1;
process.env.NODE_ENV;
function Ir(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jn(Fn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in re)
        return re[n](e);
    },
    has(t, n) {
      return n in t || n in re;
    }
  })) : e.proxy;
}
const Cr = /(?:^|[-_])(\w)/g, Dr = (e) => e.replace(Cr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function qt(e, t = !0) {
  return b(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gt(e, t, n = !1) {
  let r = qt(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? Dr(r) : n ? "App" : "Anonymous";
}
function Yt(e) {
  return b(e) && "__vccOpts" in e;
}
function Pr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    header(l) {
      return v(l) ? l.__isVue ? ["div", e, "VueInstance"] : y(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : B(l) ? [
        "div",
        {},
        ["span", e, Q(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${k(l) ? " (readonly)" : ""}`
      ] : k(l) ? [
        "div",
        {},
        ["span", e, Q(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", p(l.props))), l.setupState !== C && f.push(i("setup", l.setupState)), l.data !== C && f.push(i("data", p(l.data)));
    const m = a(l, "computed");
    m && f.push(i("computed", m));
    const w = a(l, "inject");
    return w && f.push(i("injected", w)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = R({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          c(f[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : v(l) ? ["object", { object: f ? p(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const m = l.type;
    if (b(m))
      return;
    const w = {};
    for (const I in l.ctx)
      u(m, I, f) && (w[I] = l.ctx[I]);
    return w;
  }
  function u(l, f, m) {
    const w = l[m];
    if (_(w) && w.includes(f) || v(w) && f in w || l.extends && u(l.extends, f, m) || l.mixins && l.mixins.some((I) => u(I, f, m)))
      return !0;
  }
  function d(l) {
    return Q(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.4.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Tr() {
  Pr();
}
process.env.NODE_ENV !== "production" && Tr();
function _t(e) {
  return typeof e == "function" ? e() : Ct(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const gt = () => {
};
function $r(e, t) {
  function n(...r) {
    return new Promise((s, o) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(s).catch(o);
    });
  }
  return n;
}
function Mr(e, t = {}) {
  let n, r, s = gt;
  const o = (c) => {
    clearTimeout(c), s(), s = gt;
  };
  return (c) => {
    const a = _t(e), u = _t(t.maxWait);
    return n && o(n), a <= 0 || u !== void 0 && u <= 0 ? (r && (o(r), r = null), Promise.resolve(c())) : new Promise((d, l) => {
      s = t.rejectOnCancel ? l : d, u && !r && (r = setTimeout(() => {
        n && o(n), r = null, d(c());
      }, u)), n = setTimeout(() => {
        r && o(r), r = null, d(c());
      }, a);
    });
  };
}
function Fr(e, t = 200, n = {}) {
  return $r(
    Mr(t, n),
    e
  );
}
function Ar(e) {
  const t = document.createElement("span");
  return t.id = "trigger", e.appendChild(t), t;
}
const jr = {
  mounted(e, t) {
    const n = t.value;
    if (e.children.length > 1)
      throw "vInfineScroll: Expected single child element";
    const r = Ar(e), s = Fr((c) => {
      c.forEach((a) => {
        a.isIntersecting && n.onComplete();
      });
    }, n.wait || 200), o = {
      root: e,
      rootMargin: "0px",
      threshold: 0.5
    };
    new IntersectionObserver(s, o).observe(r);
  }
}, Lr = {
  install(e) {
    e.directive("v-infinite-scroll", jr);
  }
};
export {
  Lr as useInfiniteScroll,
  jr as vInfiniteScroll
};
