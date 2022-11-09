const filterByStatus = (chatStatus, filterStatus) =>
  filterStatus === 'all' ? true : chatStatus === filterStatus;

export const applyFilters = (conversation, filters) => {
  const { inboxId, conversationStatus } = filters;
  const { status: chatStatus, inbox_id: chatInboxId } = conversation;
  let shouldFilter = filterByStatus(chatStatus, conversationStatus);
  if (inboxId) {
    const filterByInbox = Number(inboxId) === chatInboxId;
    shouldFilter = shouldFilter && filterByInbox;
  }

  return shouldFilter;
};

export function getUnreadCount(conversation) {
  const unReadMessages = conversation.messages.filter(
    chatMessage =>
      chatMessage.created_at * 1000 > conversation.agent_last_seen_at * 1000 &&
      chatMessage.message_type === 0 &&
      chatMessage.private !== true,
  );
  const unReadCount = unReadMessages.length;
  return unReadCount > 9 ? '9+' : unReadCount;
}

export const getInboxName = ({ inboxes, inboxId }) => {
  const inbox = inboxes.find(item => item.id === inboxId);
  return inbox ? inbox : {};
};

export function findLastMessage({ messages }) {
  let [lastMessage] = messages.slice(-1);

  if (lastMessage) {
    const { content, created_at, attachments, message_type, private: isPrivate } = lastMessage;
    return {
      content,
      created_at,
      attachments,
      message_type,
      isPrivate,
    };
  }
  return {
    content: '',
    created_at: '',
    attachments: [],
    message_type: '',
    isPrivate: false,
  };
}
