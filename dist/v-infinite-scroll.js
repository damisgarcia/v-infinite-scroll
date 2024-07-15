import { unref as d } from "vue";
function a(e) {
  return typeof e == "function" ? e() : d(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const f = () => {
};
function h(e, n) {
  function r(...t) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => n.apply(this, t), { fn: n, thisArg: this, args: t })).then(i).catch(o);
    });
  }
  return r;
}
function g(e, n = {}) {
  let r, t, i = f;
  const o = (c) => {
    clearTimeout(c), i(), i = f;
  };
  return (c) => {
    const l = a(e), s = a(n.maxWait);
    return r && o(r), l <= 0 || s !== void 0 && s <= 0 ? (t && (o(t), t = null), Promise.resolve(c())) : new Promise((u, p) => {
      i = n.rejectOnCancel ? p : u, s && !t && (t = setTimeout(() => {
        r && o(r), t = null, u(c());
      }, s)), r = setTimeout(() => {
        t && o(t), t = null, u(c());
      }, l);
    });
  };
}
function b(e, n = 200, r = {}) {
  return h(
    g(n, r),
    e
  );
}
function v(e) {
  const n = document.createElement("span");
  return n.id = "trigger", e.appendChild(n), n;
}
const T = {
  mounted(e, n) {
    const r = n.value;
    if (e.children.length > 1)
      throw "vInfineScroll: Expected single child element";
    const t = v(e), i = b((c) => {
      c.forEach((l) => {
        l.isIntersecting && r.onComplete();
      });
    }, r.wait || 200), o = {
      root: e,
      rootMargin: "0px",
      threshold: 0.5
    };
    new IntersectionObserver(i, o).observe(t);
  }
}, x = {
  install(e) {
    e.directive("v-infinite-scroll", T);
  }
};
export {
  x as useInfiniteScroll,
  T as vInfiniteScroll
};
