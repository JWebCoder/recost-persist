function persister (target = 'recost-persister') {
  return {
    after: (state = {}) => {
      window.localStorage.setItem(target, JSON.stringify(state))
    },
  }
}

function reloadPersistedState (target = 'recost-persister', initial = {}) {
  return {
    ...initial,
    ...(JSON.parse(window.localStorage.getItem(target)) || {}),
  }
}

export {
  reloadPersistedState,
  persister,
}
