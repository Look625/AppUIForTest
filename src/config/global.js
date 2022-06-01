// 本地化存储
export const setLocalStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

// 本地化获取
export const getLocalStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

// 本地化删除
export const removeLocalStore = name => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

export const mdFormat = date => {
  if (!date) return;
  let d = new Date(date);
  let y = d.getFullYear();
  let m = d.getMonth() + 1;
  let _d = d.getDate();
  m = m >= 10 ? m : '0' + m;
  _d = _d >= 10 ? _d : '0' + _d;
  return `${m}月${_d}日`
}

export const ymdFormat = date => {
  if (!date) return;
  let d = new Date(date);
  let y = d.getFullYear();
  let m = d.getMonth() + 1;
  let _d = d.getDate();
  m = m >= 10 ? m : '0' + m;
  _d = _d >= 10 ? _d : '0' + _d;
  return `${y}年${m}月${_d}日`
}
