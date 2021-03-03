export const follow = (user) => {
  return {
    type: 'follow',
    user
  }
}

export const unfollow = (user, index) => {
  return {
    type: 'unfollow',
    user,
    index
  }
}