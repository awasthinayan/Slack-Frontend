export const buildDirectConversationId = (workspaceId, userA, userB) => {
  return [String(workspaceId), String(userA), String(userB)].sort().join(':');
};
